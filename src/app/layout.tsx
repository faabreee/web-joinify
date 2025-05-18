import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";

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
            <main>{children}</main>
            <Toaster position="top-right"/>
          </ThemeProvider>
        </body>
      </html>
    );
  }
  