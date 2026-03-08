import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/lib/auth";
import { db } from "@/server/db";
import { categories } from "@/server/db/schema";
import { categorySchema, categoryQuerySchema } from "@/server/schema/category";
import { desc, like, and, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const result = categoryQuerySchema.safeParse(searchParams);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { search, page = "1", limit = "10" } = result.data;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    if (search) {
      conditions.push(like(categories.name, `%${search}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalCount] = await Promise.all([
      db
        .select({
          id: categories.id,
          name: categories.name,
          description: categories.description,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
          productCount: sql<number>`COUNT(DISTINCT products.id)::int`,
        })
        .from(categories)
        .leftJoin(categories, undefined)
        .where(whereClause)
        .orderBy(desc(categories.createdAt))
        .limit(limitNum)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(categories)
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
    console.error("Error fetching categories:", error);
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
    const result = categorySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid category data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const newCategory = await db
      .insert(categories)
      .values(result.data)
      .returning();

    return NextResponse.json(newCategory[0], { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
