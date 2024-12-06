import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function WalletLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
