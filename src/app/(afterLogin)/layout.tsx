import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import "@/styles/globals.css";

export default function InSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={`flex`}>
        <Sidebar/>
        <div className={`w-full`}>
          <Header/>
          {children}
        </div>
      </div>
  );
}
