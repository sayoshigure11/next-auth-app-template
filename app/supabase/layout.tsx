import { SessionProvider } from "next-auth/react";
import React from "react";

export default function RouteLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div>
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}