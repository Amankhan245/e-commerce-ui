import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/authorization";

export async function GET() {
  const user = await requireAdmin();

  if (!user) {
    return NextResponse.json(
      { message: "Access denied. Admin only." },
      { status: 403 }
    );
  }

  return NextResponse.json(
    {
      message: "Admin access granted",
      user,
    },
    { status: 200 }
  );
}