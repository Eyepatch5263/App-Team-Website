import "./globals.css"; 
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

export const metadata = {
  title: "App Team",
  description: "Converted from MERN to Next.js",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
          <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
