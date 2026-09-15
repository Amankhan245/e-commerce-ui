import { cookies } from "next/headers";
import { verifyToken, AuthUser } from "@/lib/auth";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function requireAdmin(): Promise<AuthUser | null> {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}