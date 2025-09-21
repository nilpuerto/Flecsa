import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AppShell from "./pages/AppShell";
import Upload from "./pages/Upload";
import Process from "./pages/Process";
import DocResult from "./pages/DocResult";
import Inbox from "./pages/Inbox";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import DocumentDetail from "./components/DocumentDetail";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppShell />}>
            <Route path="upload" element={<Upload />} />
            <Route path="process" element={<Process />} />
            <Route path="document/:id" element={<DocumentDetail />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
