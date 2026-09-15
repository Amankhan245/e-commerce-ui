import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/products error:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      price,
      category,
      image,
      description,
    } = body;

    if (!name || !price || !category || !image) {
      return NextResponse.json(
        {
          message:
            "Name, price, category and image are required",
        },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      price: Number(price),
      category,
      image,
      description: description || "",
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/products error:", error);

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}