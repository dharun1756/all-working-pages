import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Item {
  id: string;
  name: string;
  item_type: string;
  category?: string;
  unit: string;
  sale_price: number;
  purchase_price: number;
  stock_quantity: number;
  low_stock_alert: number;
  hsn_code?: string;
  tax_rate: number;
  created_at: string;
  updated_at: string;
}

import { mockItems, mockCategories, mockUnits } from "@/data/mockData";

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("name");
      if (error) throw error;
      return (data?.length ? data : mockItems) as Item[];
    },
  });
}

export function useAddItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Omit<Item, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("items")
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({ title: "Item added successfully" });
    },
    onError: (error) => {
      toast({ title: "Error adding item", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({ title: "Item deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error deleting item", description: error.message, variant: "destructive" });
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data?.length ? data : mockCategories;
    },
  });
}

export function useUnits() {
  return useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("units")
        .select("*")
        .order("name");
      if (error) throw error;
      return data?.length ? data : mockUnits;
    },
  });
}
