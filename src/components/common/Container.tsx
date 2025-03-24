import { ReactNode } from "react";

const Container = ({ children, className } : { children:ReactNode, className?:string }) => {
  return(
    <div className={`
      w-full 
      min-h-[calc(100vh-60px)] 
      @2xl:min-h-[calc(100vh-80px)]
      ${className}`}>
      {children}
    </div>
  )
}

export default Container;