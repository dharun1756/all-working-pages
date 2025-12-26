import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useEstimates() {
  return useQuery({
    queryKey: ["estimates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("estimates")
        .select(`*, parties(name)`)
        .order("estimate_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAddEstimate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (estimate: {
      estimate_number: string;
      party_id?: string;
      estimate_date?: string;
      valid_until?: string;
      subtotal?: number;
      discount?: number;
      tax_amount?: number;
      total_amount?: number;
      status?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase.from("estimates").insert(estimate).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estimates"] });
      toast({ title: "Estimate created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating estimate", description: error.message, variant: "destructive" });
    },
  });
}

export function useEstimateStats() {
  return useQuery({
    queryKey: ["estimate-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("estimates").select("total_amount, status");
      if (error) throw error;
      
      const total = data?.reduce((sum, e) => sum + (e.total_amount || 0), 0) || 0;
      const converted = data?.filter(e => e.status === "converted").reduce((sum, e) => sum + (e.total_amount || 0), 0) || 0;
      const open = data?.filter(e => e.status === "open" || e.status === "pending").reduce((sum, e) => sum + (e.total_amount || 0), 0) || 0;
      
      return { total, converted, open };
    },
  });
}
