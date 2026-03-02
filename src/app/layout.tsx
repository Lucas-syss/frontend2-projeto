import type { Metadata } from "next";
import { Anton, Space_Mono } from "next/font/google";
import Preloader from "@/components/ui/Preloader";
import { Providers } from "@/components/Providers";
import "./globals.css";

const anton = Anton({ 
    weight: "400", 
    subsets: ["latin"], 
    variable: "--font-anton" 
});

const spaceMono = Space_Mono({ 
    weight: ["400", "700"], 
    subsets: ["latin"], 
    variable: "--font-space-mono" 
});

export const metadata: Metadata = {
    title: "StoneSaints™",
    description: "High-End Grunge Clothing Shop",
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
