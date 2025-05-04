import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import NProgressWrapper from "@/lib/nprogress.wrapper";
import { TrackContextProvider } from "@/lib/tracks.wrapper";
import { ToastProvider } from "@/utils/toast";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextTopLoader color="#EB4926" height={2} showSpinner={false} />
          <NProgressWrapper>
            <NextAuthWrapper>
              <ToastProvider>
                <TrackContextProvider>{children}</TrackContextProvider>
              </ToastProvider>
            </NextAuthWrapper>
          </NProgressWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
