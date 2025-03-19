'use client'

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode;
  selector?: string;
};

const Portal = ({ children, selector = "#portal-root" }: PortalProps) => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null;

  const element = typeof window !== "undefined" && document.querySelector(selector);

  if (!element) return null;
  
  return createPortal(children, element);
};

export default Portal;
