import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import LaunchModal from '@/components/modal';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ApolloWrapper>
          <LaunchModal />
          {children}
          </ApolloWrapper>
      </body>
    </html>
  );
}
