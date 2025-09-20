import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/components/WalletProvider";
import Index from "./pages/Index";
import DashboardPage from "./pages/Dashboard";
import MyVesting from "./pages/MyVesting";
import Analytics from "./pages/Analytics";
import CreateSchedule from "./pages/CreateSchedule";
import ImportSchedule from "./pages/ImportSchedule";
import ExportReport from "./pages/ExportReport";
import NotFound from "./pages/NotFound";

const App = () => (
  <WalletProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vesting" element={<MyVesting />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/create-schedule" element={<CreateSchedule />} />
          <Route path="/import-schedule" element={<ImportSchedule />} />
          <Route path="/export-report" element={<ExportReport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </WalletProvider>
);

export default App;
