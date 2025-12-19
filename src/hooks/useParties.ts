import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Party {
  id: string;
  name: string;
  gstin?: string;
  phone?: string;
  email?: string;
  billing_address?: string;
  shipping_address?: string;
  party_type: string;
  opening_balance: number;
  balance: number;
  created_at: string;
  updated_at: string;
}

export function useParties() {
  return useQuery({
    queryKey: ["parties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parties")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Party[];
    },
  });
}

export function useAddParty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (party: Omit<Party, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("parties")
        .insert(party)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      toast({ title: "Party added successfully" });
    },
    onError: (error) => {
      toast({ title: "Error adding party", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteParty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("parties").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      toast({ title: "Party deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error deleting party", description: error.message, variant: "destructive" });
    },
  });
}
