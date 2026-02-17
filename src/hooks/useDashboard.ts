import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import { mockSaleInvoices, mockPurchaseBills } from "@/data/mockData";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard_stats"],
    queryFn: async () => {
      // Get receivable (from sale invoices)
      const { data: saleInvoices } = await supabase
        .from("sale_invoices")
        .select("balance_due, party_id")
        .gt("balance_due", 0);

      const saleData = saleInvoices?.length ? saleInvoices : mockSaleInvoices.filter(i => (i.balance_due ?? 0) > 0);
      const receivable = (saleData || []).reduce((acc, inv) => acc + Number(inv.balance_due || 0), 0);
      const receivableParties = new Set((saleData || []).map((inv) => inv.party_id)).size;

      // Get payable (from purchase bills)
      const { data: purchaseBills } = await supabase
        .from("purchase_bills")
        .select("balance_due, party_id")
        .gt("balance_due", 0);

      const purchaseData = purchaseBills?.length ? purchaseBills : mockPurchaseBills.filter(b => (b.balance_due ?? 0) > 0);
      const payable = (purchaseData || []).reduce((acc, bill) => acc + Number(bill.balance_due || 0), 0);
      const payableParties = new Set((purchaseData || []).map((bill) => bill.party_id)).size;

      // Get total sales this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: monthSales } = await supabase
        .from("sale_invoices")
        .select("total_amount, invoice_date")
        .gte("invoice_date", startOfMonth.toISOString().split("T")[0]);

      const salesData = monthSales?.length ? monthSales : mockSaleInvoices.filter(i => i.invoice_date >= startOfMonth.toISOString().split("T")[0]);
      const totalSales = (salesData || []).reduce((acc, inv) => acc + Number(inv.total_amount || 0), 0);

      return {
        receivable,
        receivableParties,
        payable,
        payableParties,
        totalSales,
      };
    },
  });
}
