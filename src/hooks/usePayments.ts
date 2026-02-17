import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import { mockPayments } from "@/data/mockData";

export function usePayments(paymentType: "in" | "out") {
  return useQuery({
    queryKey: ["payments", paymentType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(`*, parties(name)`)
        .eq("payment_type", paymentType === "in" ? "Payment In" : "Payment Out")
        .order("payment_date", { ascending: false });
      if (error) throw error;

      const sourceData = data?.length ? data : mockPayments.filter(p => p.payment_type === (paymentType === "in" ? "Payment In" : "Payment Out"));
      return sourceData;
    },
  });
}

export function useAddPayment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (payment: {
      payment_number: string;
      payment_type: string;
      party_id?: string;
      payment_date?: string;
      amount?: number;
      payment_mode?: string;
      reference_number?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase.from("payments").insert(payment).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["payments", variables.payment_type] });
      toast({ title: "Payment recorded successfully" });
    },
    onError: (error) => {
      toast({ title: "Error recording payment", description: error.message, variant: "destructive" });
    },
  });
}

export function usePaymentStats(paymentType: "in" | "out") {
  return useQuery({
    queryKey: ["payment-stats", paymentType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("amount")
        .eq("payment_type", paymentType === "in" ? "Payment In" : "Payment Out");
      if (error) throw error;

      const sourceData = data?.length ? data : mockPayments.filter(p => p.payment_type === (paymentType === "in" ? "Payment In" : "Payment Out"));
      const total = sourceData?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
      return { total };
    },
  });
}
