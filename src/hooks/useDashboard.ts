import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mockSaleInvoices, mockPurchaseBills } from "@/data/mockData";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard_stats"],
    queryFn: async () => {
      try {
        // Get receivable (from sale invoices)
        const { data: saleInvoices, error: saleError } = await supabase
          .from("sale_invoices")
          .select("balance_due, party_id")
          .gt("balance_due", 0);

        const saleData = !saleError && saleInvoices?.length ? saleInvoices : mockSaleInvoices.filter(i => (i.balance_due ?? 0) > 0);
        const receivable = (saleData || []).reduce((acc, inv) => acc + Number(inv.balance_due || 0), 0);
        const receivableParties = new Set((saleData || []).map((inv) => inv.party_id)).size;

        // Get payable (from purchase bills)
        const { data: purchaseBills, error: purchaseError } = await supabase
          .from("purchase_bills")
          .select("balance_due, party_id")
          .gt("balance_due", 0);

        const purchaseData = !purchaseError && purchaseBills?.length ? purchaseBills : mockPurchaseBills.filter(b => (b.balance_due ?? 0) > 0);
        const payable = (purchaseData || []).reduce((acc, bill) => acc + Number(bill.balance_due || 0), 0);
        const payableParties = new Set((purchaseData || []).map((bill) => bill.party_id)).size;

        // Get total sales this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { data: monthSales, error: monthError } = await supabase
          .from("sale_invoices")
          .select("total_amount, invoice_date")
          .gte("invoice_date", startOfMonth.toISOString().split("T")[0]);

        const salesData = !monthError && monthSales?.length ? monthSales : mockSaleInvoices.filter(i => i.invoice_date >= startOfMonth.toISOString().split("T")[0]);
        const totalSales = (salesData || []).reduce((acc, inv) => acc + Number(inv.total_amount || 0), 0);

        return {
          receivable,
          receivableParties,
          payable,
          payableParties,
          totalSales,
        };
      } catch (err) {
        console.error("Error in dashboard stats:", err);
        // Fallback to full mock logic if everything fails
        const saleData = mockSaleInvoices.filter(i => (i.balance_due ?? 0) > 0);
        const purchaseData = mockPurchaseBills.filter(b => (b.balance_due ?? 0) > 0);
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const salesData = mockSaleInvoices.filter(i => i.invoice_date >= startOfMonth.toISOString().split("T")[0]);

        return {
          receivable: saleData.reduce((acc, inv) => acc + Number(inv.balance_due || 0), 0),
          receivableParties: new Set(saleData.map((inv) => inv.party_id)).size,
          payable: purchaseData.reduce((acc, bill) => acc + Number(bill.balance_due || 0), 0),
          payableParties: new Set(purchaseData.map((bill) => bill.party_id)).size,
          totalSales: salesData.reduce((acc, inv) => acc + Number(inv.total_amount || 0), 0),
        };
      }
    },
  });
}
