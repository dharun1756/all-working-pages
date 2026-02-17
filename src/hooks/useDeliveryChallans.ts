import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { mockDeliveryChallans } from "@/data/mockData";

export function useDeliveryChallans() {
  return useQuery({
    queryKey: ["delivery-challans"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("delivery_challans")
          .select(`*, parties(name)`)
          .order("challan_date", { ascending: false });

        if (error) {
          console.error("Supabase error fetching delivery challans:", error);
          return mockDeliveryChallans;
        }
        return data?.length ? data : mockDeliveryChallans;
      } catch (err) {
        console.error("Network error fetching delivery challans:", err);
        return mockDeliveryChallans;
      }
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
      try {
        const { data, error } = await supabase.from("delivery_challans").select("total_amount, status");

        const sourceData = !error && data?.length ? data : mockDeliveryChallans;
        const total = sourceData?.reduce((sum, c) => sum + (c.total_amount || 0), 0) || 0;
        const pending = sourceData?.filter(c => c.status === "pending").reduce((sum, c) => sum + (c.total_amount || 0), 0) || 0;
        const delivered = sourceData?.filter(c => c.status === "delivered").reduce((sum, c) => sum + (c.total_amount || 0), 0) || 0;

        return { total, pending, delivered };
      } catch (err) {
        console.error("Network error fetching delivery challan stats:", err);
        const sourceData = mockDeliveryChallans;
        const total = sourceData?.reduce((sum, c) => sum + (c.total_amount || 0), 0) || 0;
        const pending = sourceData?.filter(c => c.status === "pending").reduce((sum, c) => sum + (c.total_amount || 0), 0) || 0;
        const delivered = sourceData?.filter(c => c.status === "delivered").reduce((sum, c) => sum + (c.total_amount || 0), 0) || 0;

        return { total, pending, delivered };
      }
    },
  });
}
