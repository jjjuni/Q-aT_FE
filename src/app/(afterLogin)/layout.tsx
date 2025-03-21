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
      <div className={`flex`}>
        <Sidebar />
        <div className={`${isSidebarOpen ? `sm:pl-[250px] lg:pl-[300px]` : ``} w-full transition-custom @container`}>
          <Header />
          {children}
        </div>
      </div>
      <div className={`z-[9999]`}>
      <AlertModal/>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
