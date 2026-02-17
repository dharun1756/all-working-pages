import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface SaleInvoice {
  id: string;
  invoice_number: string;
  party_id?: string;
  invoice_date: string;
  due_date?: string;
  subtotal: number;
  tax_amount: number;
  discount: number;
  total_amount: number;
  paid_amount: number;
  balance_due: number;
  payment_type: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  parties?: { name: string };
}

import { mockSaleInvoices } from "@/data/mockData";

export function useSaleInvoices() {
  return useQuery({
    queryKey: ["sale_invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sale_invoices")
        .select("*, parties(name)")
        .order("invoice_date", { ascending: false });
      if (error) throw error;
      return (data?.length ? data : mockSaleInvoices) as SaleInvoice[];
    },
  });
}

export function useSaleInvoiceTotals() {
  return useQuery({
    queryKey: ["sale_invoice_totals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sale_invoices")
        .select("total_amount, paid_amount, balance_due");
      if (error) throw error;

      const sourceData = data?.length ? data : mockSaleInvoices;
      const totals = (sourceData || []).reduce(
        (acc, inv) => ({
          total: acc.total + Number(inv.total_amount || 0),
          received: acc.received + Number(inv.paid_amount || 0),
          balance: acc.balance + Number(inv.balance_due || 0),
        }),
        { total: 0, received: 0, balance: 0 }
      );
      return totals;
    },
  });
}

export function useAddSaleInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invoice: { invoice_number: string; party_id?: string; invoice_date?: string; due_date?: string; subtotal?: number; tax_amount?: number; discount?: number; total_amount?: number; paid_amount?: number; balance_due?: number; payment_type?: string; status?: string; notes?: string }) => {
      const { data, error } = await supabase
        .from("sale_invoices")
        .insert(invoice)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale_invoices"] });
      queryClient.invalidateQueries({ queryKey: ["sale_invoice_totals"] });
      toast({ title: "Invoice created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating invoice", description: error.message, variant: "destructive" });
    },
  });
}
