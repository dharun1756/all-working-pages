import { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const mockBusinessProfile: Tables["business_profile"]["Row"] = {
    id: "bp-1",
    business_name: "Antigravity Solutions",
    business_type: "Technology",
    business_category: "Software Development",
    gstin: "27AAACA0000A1Z5",
    email: "contact@antigravity.io",
    phone: "+91 98765 43210",
    address: "123 Tech Park, Silicon Valley, Pune",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    pan: "AAAAA1111A",
    logo_url: null,
    signature_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export const mockCategories: Tables["categories"]["Row"][] = [
    { id: "cat-1", name: "Electronics", created_at: new Date().toISOString() },
    { id: "cat-2", name: "Services", created_at: new Date().toISOString() },
    { id: "cat-3", name: "Furniture", created_at: new Date().toISOString() },
];

export const mockUnits: Tables["units"]["Row"][] = [
    { id: "unit-1", name: "Pieces", short_name: "Pcs", created_at: new Date().toISOString() },
    { id: "unit-2", name: "Kilograms", short_name: "Kg", created_at: new Date().toISOString() },
    { id: "unit-3", name: "Hours", short_name: "Hrs", created_at: new Date().toISOString() },
];

export const mockParties: Tables["parties"]["Row"][] = [
    {
        id: "p-1",
        name: "Acme Corp",
        party_type: "customer",
        gstin: "27BBBAA1111B1Z1",
        phone: "9123456780",
        email: "billing@acme.com",
        billing_address: "Industrial Area, Mumbai",
        shipping_address: "Warehouse 4, Thane",
        opening_balance: 0,
        balance: 50000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "p-2",
        name: "Global Supplies Ltd",
        party_type: "supplier",
        gstin: "27CCCCA2222C1Z2",
        phone: "9876543210",
        email: "sales@globalsupplies.com",
        billing_address: "Electronic City, Bangalore",
        shipping_address: "",
        opening_balance: 10000,
        balance: -25000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "p-3",
        name: "Retail Partner Inc",
        party_type: "customer",
        gstin: "27DDDAA3333D1Z3",
        phone: "8888877777",
        email: "info@retailpartner.com",
        billing_address: "Main Market, Delhi",
        shipping_address: "",
        opening_balance: 0,
        balance: 15000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export const mockItems: Tables["items"]["Row"][] = [
    {
        id: "i-1",
        name: "Laptop Pro 16",
        item_type: "product",
        category: "Electronics",
        unit: "Pcs",
        sale_price: 120000,
        purchase_price: 95000,
        stock_quantity: 15,
        low_stock_alert: 5,
        hsn_code: "8471",
        tax_rate: 18,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "i-2",
        name: "Wireless Mouse",
        item_type: "product",
        category: "Electronics",
        unit: "Pcs",
        sale_price: 1500,
        purchase_price: 800,
        stock_quantity: 50,
        low_stock_alert: 10,
        hsn_code: "8471",
        tax_rate: 12,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "i-3",
        name: "Consulting Fee",
        item_type: "service",
        category: "Services",
        unit: "Hrs",
        sale_price: 5000,
        purchase_price: 0,
        stock_quantity: 0,
        low_stock_alert: 0,
        hsn_code: "9983",
        tax_rate: 18,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export const mockBankAccounts: Tables["bank_accounts"]["Row"][] = [
    {
        id: "ba-1",
        account_name: "HDFC Current Account",
        bank_name: "HDFC Bank",
        account_number: "50100012345678",
        ifsc_code: "HDFC0000123",
        account_type: "Current",
        opening_balance: 100000,
        current_balance: 250000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "ba-2",
        account_name: "ICICI Business Savings",
        bank_name: "ICICI Bank",
        account_number: "000401567890",
        ifsc_code: "ICIC0000004",
        account_type: "Savings",
        opening_balance: 50000,
        current_balance: 75000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export const mockExpenses: Tables["expenses"]["Row"][] = [
    {
        id: "ex-1",
        amount: 5000,
        category: "Office Rent",
        expense_date: new Date().toISOString(),
        expense_number: "EXP-001",
        payment_mode: "Bank",
        notes: "Monthly rent for Jan",
        created_at: new Date().toISOString(),
    },
    {
        id: "ex-2",
        amount: 1200,
        category: "Electricity",
        expense_date: new Date().toISOString(),
        expense_number: "EXP-002",
        payment_mode: "Cash",
        notes: "Electricity bill for Jan",
        created_at: new Date().toISOString(),
    },
];

export const mockSaleInvoices: (Tables["sale_invoices"]["Row"] & { parties?: { name: string } })[] = [
    {
        id: "si-1",
        invoice_number: "INV-2024-001",
        invoice_date: new Date().toISOString(),
        due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        party_id: "p-1", // Acme Corp
        status: "paid",
        subtotal: 121500,
        tax_amount: 21870,
        discount: 0,
        total_amount: 143370,
        paid_amount: 143370,
        balance_due: 0,
        payment_type: "Bank",
        notes: "First sale to Acme",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        parties: { name: "Acme Corp" },
    },
    {
        id: "si-2",
        invoice_number: "INV-2024-002",
        invoice_date: new Date().toISOString(),
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        party_id: "p-3", // Retail Partner
        status: "unpaid",
        subtotal: 15000,
        tax_amount: 2700,
        discount: 500,
        total_amount: 17200,
        paid_amount: 0,
        balance_due: 17200,
        payment_type: "Credit",
        notes: "Bulk order",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        parties: { name: "Retail Partner Inc" },
    },
];

export const mockSaleInvoiceItems: Tables["sale_invoice_items"]["Row"][] = [
    {
        id: "sii-1",
        invoice_id: "si-1",
        item_id: "i-1",
        item_name: "Laptop Pro 16",
        quantity: 1,
        rate: 120000,
        unit: "Pcs",
        tax_rate: 18,
        tax_amount: 21600,
        discount: 0,
        amount: 141600,
        created_at: new Date().toISOString(),
    },
    {
        id: "sii-2",
        invoice_id: "si-1",
        item_id: "i-2",
        item_name: "Wireless Mouse",
        quantity: 1,
        rate: 1500,
        unit: "Pcs",
        tax_rate: 18,
        tax_amount: 270,
        discount: 0,
        amount: 1770,
        created_at: new Date().toISOString(),
    },
];

export const mockPurchaseBills: Tables["purchase_bills"]["Row"][] = [
    {
        id: "pb-1",
        bill_number: "BILL-5566",
        bill_date: new Date().toISOString(),
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        party_id: "p-2", // Global Supplies
        status: "paid",
        subtotal: 40000,
        tax_amount: 7200,
        discount: 0,
        total_amount: 47200,
        paid_amount: 47200,
        balance_due: 0,
        payment_type: "Bank",
        notes: "Inventory restock",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export const mockPurchaseBillItems: Tables["purchase_bill_items"]["Row"][] = [
    {
        id: "pbi-1",
        bill_id: "pb-1",
        item_id: "i-2",
        item_name: "Wireless Mouse",
        quantity: 50,
        rate: 800,
        unit: "Pcs",
        tax_rate: 18,
        tax_amount: 7200,
        discount: 0,
        amount: 47200,
        created_at: new Date().toISOString(),
    },
];

export const mockPayments: (Tables["payments"]["Row"] & { parties?: { name: string } })[] = [
    {
        id: "pm-1",
        payment_number: "PAY-001",
        payment_date: new Date().toISOString(),
        party_id: "p-1",
        amount: 143370,
        payment_type: "Payment In",
        payment_mode: "Bank",
        reference_number: "TXN123456",
        notes: "Payment for INV-2024-001",
        created_at: new Date().toISOString(),
        parties: { name: "Acme Corp" },
    },
    {
        id: "pm-2",
        payment_number: "PAY-002",
        payment_date: new Date().toISOString(),
        party_id: "p-2",
        amount: 47200,
        payment_type: "Payment Out",
        payment_mode: "Bank",
        reference_number: "TXN789012",
        notes: "Payment for BILL-5566",
        created_at: new Date().toISOString(),
        parties: { name: "Global Supplies Ltd" },
    },
];

export const mockEstimates: Tables["estimates"]["Row"][] = [
    {
        id: "est-1",
        estimate_number: "EST-001",
        estimate_date: new Date().toISOString(),
        party_id: "p-1",
        total_amount: 15000,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        discount: 0,
        notes: "Project estimate",
        subtotal: 12711,
        tax_amount: 2289,
        valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

export const mockDeliveryChallans: Tables["delivery_challans"]["Row"][] = [
    {
        id: "dc-1",
        challan_number: "DC-001",
        challan_date: new Date().toISOString(),
        party_id: "p-1",
        total_amount: 5000,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        notes: "Sample delivery",
    },
];

export const mockProformaInvoices: Tables["proforma_invoices"]["Row"][] = [
    {
        id: "pi-1",
        invoice_number: "PI-001",
        invoice_date: new Date().toISOString(),
        party_id: "p-3",
        total_amount: 25000,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        discount: 0,
        notes: "Advanced payment request",
        subtotal: 21186,
        tax_amount: 3814,
        valid_until: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

export const mockSaleOrders: Tables["sale_orders"]["Row"][] = [
    {
        id: "so-1",
        order_number: "SO-001",
        order_date: new Date().toISOString(),
        party_id: "p-1",
        total_amount: 10000,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        delivery_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        discount: 0,
        notes: "Bulk stock order",
        subtotal: 8474,
        tax_amount: 1526,
    },
];
