
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export function createToken(user: AuthUser) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env.local");
  }

  return jwt.sign(user, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): AuthUser | null {
  if (!JWT_SECRET) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return null;
    }

    return {
      id: String(decoded.id),
      name: String(decoded.name),
      email: String(decoded.email),
      role: decoded.role === "admin" ? "admin" : "user",
    };
  } catch {
    return null;
  }
}

