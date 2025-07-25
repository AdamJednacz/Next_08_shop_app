import type { Metadata } from "next";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";
import Header from "@/components/design components/header/Header";
import '@ant-design/v5-patch-for-react-19';
import {getSessionUser} from "@/lib/session";
import UserContextProvider, {UserContext} from "@/context/userContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await getSessionUser();
  return (
      <html lang="en">
      <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />


      </head>
      <body>
      <UserContextProvider user={user}>
          <LayoutWrapper  >{children}</LayoutWrapper>
      </UserContextProvider>
      </body>
      </html>
  );
}
