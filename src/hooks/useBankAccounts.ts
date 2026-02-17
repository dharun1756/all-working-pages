import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { mockBankAccounts } from "@/data/mockData";

export interface BankAccount {
    id: string;
    account_name: string;
    bank_name: string | null;
    account_number: string | null;
    ifsc_code: string | null;
    account_type: string | null;
    opening_balance: number | null;
    current_balance: number | null;
    created_at: string;
    updated_at: string;
}

export function useBankAccounts() {
    return useQuery({
        queryKey: ["bank_accounts"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("bank_accounts")
                .select("*")
                .order("account_name");
            if (error) throw error;
            return (data?.length ? data : mockBankAccounts) as BankAccount[];
        },
    });
}

export function useAddBankAccount() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (account: Omit<BankAccount, "id" | "created_at" | "updated_at">) => {
            const { data, error } = await supabase
                .from("bank_accounts")
                .insert(account)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bank_accounts"] });
            toast({ title: "Bank account added successfully" });
        },
        onError: (error) => {
            toast({ title: "Error adding bank account", description: error.message, variant: "destructive" });
        },
    });
}

export function useDeleteBankAccount() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("bank_accounts").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bank_accounts"] });
            toast({ title: "Bank account deleted successfully" });
        },
        onError: (error) => {
            toast({ title: "Error deleting bank account", description: error.message, variant: "destructive" });
        },
    });
}
