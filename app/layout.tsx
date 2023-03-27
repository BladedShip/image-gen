import "@/styles/globals.css";

import { Poppins } from "next/font/google";

import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ClientProvider from "@/components/ClientProvider";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Image-Gen",
  description: "DALL-E 2, but made by me and crappier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientProvider>
          <Header />
          <PromptInput />
          {children}
        </ClientProvider>
        <Footer/>
      </body>
    </html>
  );
}
