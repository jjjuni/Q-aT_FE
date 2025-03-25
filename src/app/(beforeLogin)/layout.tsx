import "@/styles/globals.css";

export default function BeforeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={`fixed h-[100px] w-screen border-b border-gray-500`}>
      </div>
      {children}
    </div>
  );
}
