import localFont from "next/font/local";
import "./globals.css";
import Header from "@/Layouts/Header/Header";
import AuthWrapper from "@/Layouts/AuthWrapper/AuthWrapper";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Assignment",
    description: "Assignment",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthWrapper>
            <Header/>
            {children}
        </AuthWrapper>

        </body>
        </html>
    );
}
