import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ChatPanel from "./components/ChatPanel";
import ChatTrigger from "./components/ChatTrigger";
import { ChatProvider } from "./context/ChatContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ChatProvider>
      <div className="flex min-h-screen flex-col bg-ink text-paper">
        <ScrollToTop />
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <div className="fixed bottom-5 right-5 z-50">
          <ChatTrigger />
        </div>
        <ChatPanel />
      </div>
    </ChatProvider>
  );
}
