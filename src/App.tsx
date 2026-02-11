import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Parties from "./pages/Parties";
import Items from "./pages/Items";
import SaleInvoices from "./pages/SaleInvoices";
import Estimates from "./pages/Estimates";
import ProformaInvoice from "./pages/ProformaInvoice";
import PaymentIn from "./pages/PaymentIn";
import PaymentOut from "./pages/PaymentOut";
import SaleOrder from "./pages/SaleOrder";
import DeliveryChallan from "./pages/DeliveryChallan";
import PurchaseEstimate from "./pages/PurchaseEstimate";
import PurchaseReturn from "./pages/PurchaseReturn";
import PurchaseOrder from "./pages/PurchaseOrder";
import PurchaseBills from "./pages/PurchaseBills";
import Expenses from "./pages/Expenses";
import BankAccounts from "./pages/BankAccounts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/parties" element={<Parties />} />
          <Route path="/items" element={<Items />} />
          <Route path="/sale-invoices" element={<SaleInvoices />} />
          <Route path="/estimates" element={<Estimates />} />
          <Route path="/proforma" element={<ProformaInvoice />} />
          <Route path="/payment-in" element={<PaymentIn />} />
          <Route path="/payment-out" element={<PaymentOut />} />
          <Route path="/sale-order" element={<SaleOrder />} />
          <Route path="/delivery-challan" element={<DeliveryChallan />} />
          <Route path="/purchase-estimate" element={<PurchaseEstimate />} />
          <Route path="/purchase-return" element={<PurchaseReturn />} />
          <Route path="/purchase-order" element={<PurchaseOrder />} />
          <Route path="/payment-out" element={<PaymentOut />} />
          <Route path="/purchase-bills" element={<PurchaseBills />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/bank-accounts" element={<BankAccounts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
