// src/app/layout.js
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "./globals.css";

export const metadata = {
  title: "Badsha Bangles",
  description: "Your bangle store description here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Fixed Header Component */}
        <Header />

        {/* Main Content - Adding padding to account for fixed header and footer */}
        <main className="flex-grow mt-14 ">{children}</main>

        {/* Fixed Footer Component */}
        <Footer />
      </body>
    </html>
  );
}
