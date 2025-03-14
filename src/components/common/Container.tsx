import { ReactNode } from "react";

const Container = ({ children, className } : { children:ReactNode, className?:string }) => {
  return(
    <div className={`w-full h-[calc(100%-80px)] ${className}`}>
      {children}
    </div>
  )
}

export default Container;