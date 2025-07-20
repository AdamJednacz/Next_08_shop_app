"use client";
import "../app/globals.css"
import '@ant-design/v5-patch-for-react-19';
import { usePathname } from "next/navigation";
import Header from "@/components/design components/header/Header";


export default function LayoutWrapper({ children }: { children: React.ReactNode },) {
    const pathname = usePathname();

    const isAdmin = pathname.startsWith("/admin");


    return (
        <>
            {!isAdmin && <Header  />}
            {children}
        </>
    );
}
