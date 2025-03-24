'use client'

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import AlertModal from "@/components/portal/AlertModal";
import useSidebarStore from "@/store/useSidebarStore";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function InSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {
    isSidebarOpen,
  } = useSidebarStore();

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`flex h-full`}>
        <div className={`
          ${isSidebarOpen ? `md:pl-[250px]` : ``}
          w-full h-full transition-custom @container`}>
          <Sidebar />
          <div className={`${isSidebarOpen ? `@2xl:md:pl-[50px]` : ``} w-full h-screen transition-custom`}>
            <Header />
            {children}
          </div>
        </div>
      </div>
      <div className={`z-[9999]`}>
        <AlertModal />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
