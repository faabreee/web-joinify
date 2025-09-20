import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";
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
              <main>{children}</main>
            </UserProvider>
            <Toaster position="top-right"/>
          </ThemeProvider>
        </body>
      </html>
    );
  }
  