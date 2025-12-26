import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useDeliveryChallans() {
  return useQuery({
    queryKey: ["delivery-challans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("delivery_challans")
        .select(`*, parties(name)`)
        .order("challan_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAddDeliveryChallan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (challan: {
      challan_number: string;
      party_id?: string;
      challan_date?: string;
      total_amount?: number;
      status?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase.from("delivery_challans").insert(challan).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-challans"] });
      toast({ title: "Delivery Challan created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating delivery challan", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeliveryChallanStats() {
  return useQuery({
    queryKey: ["delivery-challan-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("delivery_challans").select("total_amount, status");
      if (error) throw error;
      
      const total = data?.reduce((sum, c) => sum + (c.total_amount || 0), 0) || 0;
      const pending = data?.filter(c => c.status === "pending").reduce((sum, c) => sum + (c.total_amount || 0), 0) || 0;
      const delivered = data?.filter(c => c.status === "delivered").reduce((sum, c) => sum + (c.total_amount || 0), 0) || 0;
      
      return { total, pending, delivered };
    },
  });
}
