import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import WhatsAppLive from "@/components/whatsapLive";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <WhatsAppLive />
        <Footer />
      </div>
    </>
  );
};

export default CommonLayout;
