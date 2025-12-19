-- Enable RLS and create permissive policies for all tables (public access for now)
-- In production, you would add user authentication and restrict access

ALTER TABLE public.parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sale_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sale_invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_bill_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_challans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sale_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proforma_invoices ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for all tables
CREATE POLICY "Allow all access to parties" ON public.parties FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to items" ON public.items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to units" ON public.units FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to sale_invoices" ON public.sale_invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to sale_invoice_items" ON public.sale_invoice_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to purchase_bills" ON public.purchase_bills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to purchase_bill_items" ON public.purchase_bill_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to payments" ON public.payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to expenses" ON public.expenses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to bank_accounts" ON public.bank_accounts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to business_profile" ON public.business_profile FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to estimates" ON public.estimates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to delivery_challans" ON public.delivery_challans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to sale_orders" ON public.sale_orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to proforma_invoices" ON public.proforma_invoices FOR ALL USING (true) WITH CHECK (true);