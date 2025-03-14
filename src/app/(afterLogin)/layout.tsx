import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex`}>
        <Sidebar/>
        <div className={`w-full`}>
          <Header/>
          {children}
        </div>
      </body>
    </html>
  );
}
