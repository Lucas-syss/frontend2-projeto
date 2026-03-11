import type { Metadata, Viewport } from "next";
import { Anton, Space_Mono } from "next/font/google";
import Preloader from "@/components/ui/Preloader";
import { Providers } from "@/components/Providers";
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
    title: "StoneSaints™ — High-End Grunge Apparel",
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
            </head>
            <body className="antialiased selection:bg-white selection:text-black">
                <Preloader />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
