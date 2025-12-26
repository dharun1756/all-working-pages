import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useSaleOrders() {
  return useQuery({
    queryKey: ["sale-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sale_orders")
        .select(`*, parties(name)`)
        .order("order_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAddSaleOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (order: {
      order_number: string;
      party_id?: string;
      order_date?: string;
      due_date?: string;
      subtotal?: number;
      discount?: number;
      tax_amount?: number;
      total_amount?: number;
      status?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase.from("sale_orders").insert(order).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-orders"] });
      toast({ title: "Sale order created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating sale order", description: error.message, variant: "destructive" });
    },
  });
}

export function useSaleOrderStats() {
  return useQuery({
    queryKey: ["sale-order-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sale_orders").select("total_amount, status");
      if (error) throw error;
      
      const total = data?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
      const pending = data?.filter(o => o.status === "pending").reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
      const completed = data?.filter(o => o.status === "completed").reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
      
      return { total, pending, completed };
    },
  });
}
