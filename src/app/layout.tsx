import { Navbar } from "@/components/custom/navbar";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/utils/UserProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>
              <Navbar />
              <main>{children}</main>
            </UserProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    );
  }
  