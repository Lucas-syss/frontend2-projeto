import type { Metadata } from "next";
import Preloader from "@/components/ui/Preloader";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
    title: "StoneSaints",
    description: "Web Application",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </head>
            <body>
                <Preloader />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
