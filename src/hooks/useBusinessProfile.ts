import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface BusinessProfile {
  id: string;
  business_name?: string;
  phone?: string;
  email?: string;
  gstin?: string;
  pan?: string;
  business_type?: string;
  business_category?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  logo_url?: string;
  signature_url?: string;
  created_at: string;
  updated_at: string;
}

import { mockBusinessProfile } from "@/data/mockData";

export function useBusinessProfile() {
  return useQuery({
    queryKey: ["business_profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_profile")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return (data || mockBusinessProfile) as BusinessProfile;
    },
  });
}

export function useSaveBusinessProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: Partial<BusinessProfile>) => {
      const { data: existing } = await supabase
        .from("business_profile")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (existing) {
        const { data, error } = await supabase
          .from("business_profile")
          .update(profile)
          .eq("id", existing.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("business_profile")
          .insert(profile)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business_profile"] });
      toast({ title: "Profile saved successfully" });
    },
    onError: (error) => {
      toast({ title: "Error saving profile", description: error.message, variant: "destructive" });
    },
  });
}
