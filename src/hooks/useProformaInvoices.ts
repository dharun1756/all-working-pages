import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useProformaInvoices() {
  return useQuery({
    queryKey: ["proforma-invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("proforma_invoices")
        .select(`*, parties(name)`)
        .order("invoice_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAddProformaInvoice() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (invoice: {
      invoice_number: string;
      party_id?: string;
      invoice_date?: string;
      valid_until?: string;
      subtotal?: number;
      discount?: number;
      tax_amount?: number;
      total_amount?: number;
      status?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase.from("proforma_invoices").insert(invoice).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proforma-invoices"] });
      toast({ title: "Proforma Invoice created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating proforma invoice", description: error.message, variant: "destructive" });
    },
  });
}

export function useProformaStats() {
  return useQuery({
    queryKey: ["proforma-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("proforma_invoices").select("total_amount, status");
      if (error) throw error;
      
      const total = data?.reduce((sum, e) => sum + (e.total_amount || 0), 0) || 0;
      const converted = data?.filter(e => e.status === "converted").reduce((sum, e) => sum + (e.total_amount || 0), 0) || 0;
      const open = data?.filter(e => e.status === "open" || e.status === "pending").reduce((sum, e) => sum + (e.total_amount || 0), 0) || 0;
      
      return { total, converted, open };
    },
  });
}
