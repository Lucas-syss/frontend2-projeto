import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Archive from "./pages/Archive";
import GlobalNoise from "./components/ui/GlobalNoise";
import Preloader from "./components/ui/Preloader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthPortal from "./pages/AuthPortal";
import Vault from "./pages/Vault";

const queryClient = new QueryClient();

const App = () => (
  <>
    <Preloader />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GlobalNoise />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/auth" element={<AuthPortal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </>
);

export default App;
