import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "AmanMart | Everyday shopping, made easy",
  description: "Shop quality fashion, electronics, home essentials and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <CartProvider>
          <Navbar />
          <div className="flex min-h-[calc(100vh-73px)] flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
