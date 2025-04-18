import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SportsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar isNavLinksHidden={false}/>

      <main className="flex-grow">{children}</main>

    </div>
  );
}
