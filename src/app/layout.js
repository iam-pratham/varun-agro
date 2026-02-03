import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: "Varun Agro Processing Foods Pvt. Ltd.",
  description: "Leading Indian food processing company specialising in manufacturing, supplying, and exporting high-quality food products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
