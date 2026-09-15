import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/authorization";

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { message: "Access denied. Admin only." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const { name, price, category, image, description } = body;

    if (!name || !price || !category || !image || !description) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.create({
      name,
      price,
      category,
      image,
      description,
    });

    return NextResponse.json(
      {
        message: "Product added successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add Product Error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// GET ALL PRODUCTS - ADMIN ONLY
export async function GET() {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { message: "Access denied. Admin only." },
        { status: 403 }
      );
    }

    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get Admin Products Error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}