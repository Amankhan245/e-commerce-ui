import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get Product Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const product = await Product.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Product updated successfully",
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Product Error:", error);

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Product Error:", error);

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}