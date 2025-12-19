export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          account_name: string
          account_number: string | null
          account_type: string | null
          bank_name: string | null
          created_at: string
          current_balance: number | null
          id: string
          ifsc_code: string | null
          opening_balance: number | null
          updated_at: string
        }
        Insert: {
          account_name: string
          account_number?: string | null
          account_type?: string | null
          bank_name?: string | null
          created_at?: string
          current_balance?: number | null
          id?: string
          ifsc_code?: string | null
          opening_balance?: number | null
          updated_at?: string
        }
        Update: {
          account_name?: string
          account_number?: string | null
          account_type?: string | null
          bank_name?: string | null
          created_at?: string
          current_balance?: number | null
          id?: string
          ifsc_code?: string | null
          opening_balance?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      business_profile: {
        Row: {
          address: string | null
          business_category: string | null
          business_name: string | null
          business_type: string | null
          city: string | null
          created_at: string
          email: string | null
          gstin: string | null
          id: string
          logo_url: string | null
          pan: string | null
          phone: string | null
          pincode: string | null
          signature_url: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          business_category?: string | null
          business_name?: string | null
          business_type?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          gstin?: string | null
          id?: string
          logo_url?: string | null
          pan?: string | null
          phone?: string | null
          pincode?: string | null
          signature_url?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          business_category?: string | null
          business_name?: string | null
          business_type?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          gstin?: string | null
          id?: string
          logo_url?: string | null
          pan?: string | null
          phone?: string | null
          pincode?: string | null
          signature_url?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      delivery_challans: {
        Row: {
          challan_date: string
          challan_number: string
          created_at: string
          id: string
          notes: string | null
          party_id: string | null
          status: string | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          challan_date?: string
          challan_number: string
          created_at?: string
          id?: string
          notes?: string | null
          party_id?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          challan_date?: string
          challan_number?: string
          created_at?: string
          id?: string
          notes?: string | null
          party_id?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_challans_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      estimates: {
        Row: {
          created_at: string
          discount: number | null
          estimate_date: string
          estimate_number: string
          id: string
          notes: string | null
          party_id: string | null
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          total_amount: number | null
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          discount?: number | null
          estimate_date?: string
          estimate_number: string
          id?: string
          notes?: string | null
          party_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          discount?: number | null
          estimate_date?: string
          estimate_number?: string
          id?: string
          notes?: string | null
          party_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estimates_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          expense_date: string
          expense_number: string
          id: string
          notes: string | null
          payment_mode: string | null
        }
        Insert: {
          amount?: number
          category?: string | null
          created_at?: string
          expense_date?: string
          expense_number: string
          id?: string
          notes?: string | null
          payment_mode?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          expense_date?: string
          expense_number?: string
          id?: string
          notes?: string | null
          payment_mode?: string | null
        }
        Relationships: []
      }
      items: {
        Row: {
          category: string | null
          created_at: string
          hsn_code: string | null
          id: string
          item_type: string | null
          low_stock_alert: number | null
          name: string
          purchase_price: number | null
          sale_price: number | null
          stock_quantity: number | null
          tax_rate: number | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          hsn_code?: string | null
          id?: string
          item_type?: string | null
          low_stock_alert?: number | null
          name: string
          purchase_price?: number | null
          sale_price?: number | null
          stock_quantity?: number | null
          tax_rate?: number | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          hsn_code?: string | null
          id?: string
          item_type?: string | null
          low_stock_alert?: number | null
          name?: string
          purchase_price?: number | null
          sale_price?: number | null
          stock_quantity?: number | null
          tax_rate?: number | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      parties: {
        Row: {
          balance: number | null
          billing_address: string | null
          created_at: string
          email: string | null
          gstin: string | null
          id: string
          name: string
          opening_balance: number | null
          party_type: string | null
          phone: string | null
          shipping_address: string | null
          updated_at: string
        }
        Insert: {
          balance?: number | null
          billing_address?: string | null
          created_at?: string
          email?: string | null
          gstin?: string | null
          id?: string
          name: string
          opening_balance?: number | null
          party_type?: string | null
          phone?: string | null
          shipping_address?: string | null
          updated_at?: string
        }
        Update: {
          balance?: number | null
          billing_address?: string | null
          created_at?: string
          email?: string | null
          gstin?: string | null
          id?: string
          name?: string
          opening_balance?: number | null
          party_type?: string | null
          phone?: string | null
          shipping_address?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          notes: string | null
          party_id: string | null
          payment_date: string
          payment_mode: string | null
          payment_number: string
          payment_type: string
          reference_number: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          notes?: string | null
          party_id?: string | null
          payment_date?: string
          payment_mode?: string | null
          payment_number: string
          payment_type: string
          reference_number?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          notes?: string | null
          party_id?: string | null
          payment_date?: string
          payment_mode?: string | null
          payment_number?: string
          payment_type?: string
          reference_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      proforma_invoices: {
        Row: {
          created_at: string
          discount: number | null
          id: string
          invoice_date: string
          invoice_number: string
          notes: string | null
          party_id: string | null
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          total_amount: number | null
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          discount?: number | null
          id?: string
          invoice_date?: string
          invoice_number: string
          notes?: string | null
          party_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          discount?: number | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          party_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proforma_invoices_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_bill_items: {
        Row: {
          amount: number
          bill_id: string
          created_at: string
          discount: number | null
          id: string
          item_id: string | null
          item_name: string
          quantity: number
          rate: number
          tax_amount: number | null
          tax_rate: number | null
          unit: string | null
        }
        Insert: {
          amount?: number
          bill_id: string
          created_at?: string
          discount?: number | null
          id?: string
          item_id?: string | null
          item_name: string
          quantity?: number
          rate?: number
          tax_amount?: number | null
          tax_rate?: number | null
          unit?: string | null
        }
        Update: {
          amount?: number
          bill_id?: string
          created_at?: string
          discount?: number | null
          id?: string
          item_id?: string | null
          item_name?: string
          quantity?: number
          rate?: number
          tax_amount?: number | null
          tax_rate?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_bill_items_bill_id_fkey"
            columns: ["bill_id"]
            isOneToOne: false
            referencedRelation: "purchase_bills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_bill_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_bills: {
        Row: {
          balance_due: number | null
          bill_date: string
          bill_number: string
          created_at: string
          discount: number | null
          due_date: string | null
          id: string
          notes: string | null
          paid_amount: number | null
          party_id: string | null
          payment_type: string | null
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          balance_due?: number | null
          bill_date?: string
          bill_number: string
          created_at?: string
          discount?: number | null
          due_date?: string | null
          id?: string
          notes?: string | null
          paid_amount?: number | null
          party_id?: string | null
          payment_type?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          balance_due?: number | null
          bill_date?: string
          bill_number?: string
          created_at?: string
          discount?: number | null
          due_date?: string | null
          id?: string
          notes?: string | null
          paid_amount?: number | null
          party_id?: string | null
          payment_type?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_bills_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_invoice_items: {
        Row: {
          amount: number
          created_at: string
          discount: number | null
          id: string
          invoice_id: string
          item_id: string | null
          item_name: string
          quantity: number
          rate: number
          tax_amount: number | null
          tax_rate: number | null
          unit: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          discount?: number | null
          id?: string
          invoice_id: string
          item_id?: string | null
          item_name: string
          quantity?: number
          rate?: number
          tax_amount?: number | null
          tax_rate?: number | null
          unit?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          discount?: number | null
          id?: string
          invoice_id?: string
          item_id?: string | null
          item_name?: string
          quantity?: number
          rate?: number
          tax_amount?: number | null
          tax_rate?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sale_invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "sale_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_invoice_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_invoices: {
        Row: {
          balance_due: number | null
          created_at: string
          discount: number | null
          due_date: string | null
          id: string
          invoice_date: string
          invoice_number: string
          notes: string | null
          paid_amount: number | null
          party_id: string | null
          payment_type: string | null
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          balance_due?: number | null
          created_at?: string
          discount?: number | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number: string
          notes?: string | null
          paid_amount?: number | null
          party_id?: string | null
          payment_type?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          balance_due?: number | null
          created_at?: string
          discount?: number | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          paid_amount?: number | null
          party_id?: string | null
          payment_type?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_invoices_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_orders: {
        Row: {
          created_at: string
          delivery_date: string | null
          discount: number | null
          id: string
          notes: string | null
          order_date: string
          order_number: string
          party_id: string | null
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          delivery_date?: string | null
          discount?: number | null
          id?: string
          notes?: string | null
          order_date?: string
          order_number: string
          party_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          delivery_date?: string | null
          discount?: number | null
          id?: string
          notes?: string | null
          order_date?: string
          order_number?: string
          party_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_orders_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          created_at: string
          id: string
          name: string
          short_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          short_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          short_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
