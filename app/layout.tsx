import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme.provider";
import { UserProvider } from "@/context/userProfilectx";
import { AuthWrapper } from "../app/AuthWrapper";
import { Providers } from "./Providers";

const DmSans = DM_Sans({
  subsets: ["latin-ext"],
  variable: "--dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Drello",
  description: "AI blog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${DmSans.className} antialiased`}>
        <AuthWrapper>
          <Providers>
            <UserProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
                disableTransitionOnChange
              >
                <Toaster />
                {children}
              </ThemeProvider>
            </UserProvider>
          </Providers>
        </AuthWrapper>
      </body>
    </html>
  );
}
