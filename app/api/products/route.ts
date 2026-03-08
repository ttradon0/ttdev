import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/lib/auth";
import { db } from "@/server/db";
import { products, categories } from "@/server/db/schema";
import { productSchema, productQuerySchema } from "@/server/schema/product";
import { eq, like, and, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const result = productQuerySchema.safeParse(searchParams);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { search, categoryId, isActive, page = "1", limit = "10" } = result.data;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    if (search) {
      conditions.push(like(products.name, `%${search}%`));
    }
    if (categoryId) {
      conditions.push(eq(products.categoryId, categoryId));
    }
    if (isActive !== undefined) {
      conditions.push(eq(products.isActive, isActive ? "true" : "false"));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalCount] = await Promise.all([
      db
        .select({
          id: products.id,
          name: products.name,
          description: products.description,
          price: products.price,
          stock: products.stock,
          barcode: products.barcode,
          categoryId: products.categoryId,
          categoryName: categories.name,
          image: products.image,
          isActive: products.isActive,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(whereClause)
        .orderBy(desc(products.createdAt))
        .limit(limitNum)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(products)
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
    console.error("Error fetching products:", error);
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

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid product data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const newProduct = await db
      .insert(products)
      .values({
        ...result.data,
        price: result.data.price.toString(),
        stock: result.data.stock ? parseInt(result.data.stock) : 0,
        isActive: result.data.isActive ? "true" : "false",
      })
      .returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
