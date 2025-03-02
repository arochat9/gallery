import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import {
  ClerkProvider,
  // SignInButton,
  // SignUpButton,
  // SignedIn,
  // SignedOut,
  // UserButton,
} from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Generated by arochat",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// function TopNav() {
//   return (
//     <nav className="flex w-full items-center justify-between border-b bg-blue-500 p-4 text-xl font-semibold">
//       <div>Gallery</div>

//       <div>Sign In</div>
//     </nav>
//   );
// }

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex flex-col gap-4">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
