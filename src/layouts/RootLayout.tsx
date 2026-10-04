import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import { Toaster } from 'sonner';

export const RootLayout = () => {
    return (
        <>
            <Toaster dir='rtl' richColors position="top-center" />
            <Header />
            <main className="py-4 md:py-10">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}