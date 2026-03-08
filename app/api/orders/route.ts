import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/lib/auth";
import { db } from "@/server/db";
import { orders, orderItems, products } from "@/server/db/schema";
import { orderSchema, orderQuerySchema } from "@/server/schema/order";
import { eq, and, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const result = orderQuerySchema.safeParse(searchParams);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { status, userId, page = "1", limit = "10" } = result.data;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    if (status) {
      conditions.push(eq(orders.status, status));
    }
    if (userId) {
      conditions.push(eq(orders.userId, userId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalCount] = await Promise.all([
      db
        .select({
          id: orders.id,
          userId: orders.userId,
          totalAmount: orders.totalAmount,
          status: orders.status,
          paymentMethod: orders.paymentMethod,
          customerName: orders.customerName,
          customerPhone: orders.customerPhone,
          notes: orders.notes,
          createdAt: orders.createdAt,
          updatedAt: orders.updatedAt,
          itemCount: sql<number>`COUNT(${orderItems.productId})::int`,
        })
        .from(orders)
        .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
        .where(whereClause)
        .groupBy(
          orders.id,
          orders.userId,
          orders.totalAmount,
          orders.status,
          orders.paymentMethod,
          orders.customerName,
          orders.customerPhone,
          orders.notes,
          orders.createdAt,
          orders.updatedAt
        )
        .orderBy(desc(orders.createdAt))
        .limit(limitNum)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(orders)
        .where(whereClause),
    ]);

    return NextResponse.json({
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: Number((totalCount[0] as { count: number }).count),
        totalPages: Math.ceil(
          Number((totalCount[0] as { count: number }).count) / limitNum
        ),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid order data", details: result.error.error.flatten() },
        { status: 400 }
      );
    }

    const { items, paymentMethod, customerName, customerPhone, notes } =
      result.data;

    // Calculate total and verify stock
    let totalAmount = 0;
    for (const item of items) {
      const product = await db.query.products.findFirst({
        where: eq(products.id, item.productId),
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < parseInt(item.quantity)) {
        return NextResponse.json(
          {
            error: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
          },
          { status: 400 }
        );
      }

      totalAmount += parseFloat(product.price) * parseInt(item.quantity);
    }

    // Create order with items
    const newOrder = await db.transaction(async (tx) => {
      const [createdOrder] = await tx
        .insert(orders)
        .values({
          userId: session.user.id!,
          totalAmount: totalAmount.toFixed(2),
          paymentMethod,
          customerName,
          customerPhone,
          notes,
        })
        .returning();

      for (const item of items) {
        const product = await tx.query.products.findFirst({
          where: eq(products.id, item.productId),
        });

        await tx.insert(orderItems).values({
          orderId: createdOrder.id,
          productId: item.productId,
          quantity: parseInt(item.quantity),
          price: product!.price,
        });

        // Update stock
        await tx
          .update(products)
          .set({
            stock: product!.stock - parseInt(item.quantity),
          })
          .where(eq(products.id, item.productId));
      }

      return createdOrder;
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
