"use client";
import { useEffect, useState } from "react";
import { InitialPageLoadingSkeleton } from "./InitialPageLoadingSkeleton";

interface IProps {
  children: React.ReactNode;
}

export default function Home({ children }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;0,6..12,900;0,6..12,1000;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700;1,6..12,800;1,6..12,900;1,6..12,1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {isLoading ? <InitialPageLoadingSkeleton>{children}</InitialPageLoadingSkeleton> : children}
      </body>
    </html>
  );
}
