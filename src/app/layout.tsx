import type { Metadata, Viewport } from "next";
import { Anton, Space_Mono } from "next/font/google";
import Preloader from "@/components/ui/Preloader";
import { Providers } from "@/components/Providers";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const anton = Anton({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-anton",
    display: "swap",
});

const spaceMono = Space_Mono({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-space-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "StoneSaints™",
    description: "StoneSaints™ — Limited drops of premium grunge streetwear. Shop hoodies, tees, jackets and accessories.",
    keywords: ["streetwear", "grunge", "fashion", "limited edition", "premium apparel"],
    openGraph: {
        title: "StoneSaints™",
        description: "Limited drops of premium grunge streetwear.",
        type: "website",
        siteName: "StoneSaints™",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${anton.variable} ${spaceMono.variable}`}>
            <head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <script defer src="https://cloud.umami.is/script.js" data-website-id="90663f1a-7ce0-457e-8784-23d9b77f9ab3"></script>
            </head>
            <body className="antialiased selection:bg-white selection:text-black">
                <Preloader />
                <Providers>
                    {children}
                </Providers>
                <SpeedInsights />
            </body>
        </html>
    );
}
