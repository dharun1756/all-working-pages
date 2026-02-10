import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Package,
  Receipt,
  ChevronDown,
  ChevronRight,
  Plus,
  ShoppingCart,
  TrendingUp,
  Landmark,
  BarChart3,
  RefreshCw,
  Grid3X3,
  FileSpreadsheet,
  Settings,
  Wrench,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", icon: Home, href: "/" },
  {
    label: "Parties",
    icon: Users,
    children: [
      { label: "Party Details", href: "/parties" },
    ],
  },
  { label: "Items", icon: Package, href: "/items" },
  {
    label: "Sale",
    icon: Receipt,
    children: [
      { label: "Sale Invoices", href: "/sale-invoices" },
      { label: "Estimate/Quotation", href: "/estimates" },
      { label: "Proforma Invoice", href: "/proforma" },
      { label: "Payment-In", href: "/payment-in" },
      { label: "Sale Order", href: "/sale-order" },
      { label: "Delivery Challan", href: "/delivery-challan" },
    ],
  },
  {
    label: "Purchase & Expense",
    icon: ShoppingCart,
    children: [
      { label: "Purchase Bills", href: "/purchase-bills" },
      { label: "Payment-Out", href: "/payment-out" },
      { label: "Expenses", href: "/expenses" },
      { label: "Purchase Order", href: "/purchase-order" },
      { label: "Purchase Return/Dr. Note", href: "/purchase-return" },
    ],
  },
  { label: "Purchase Estimate", icon: TrendingUp, href: "/purchase-estimate" },
  {
    label: "Bank Accounts",
    icon: Landmark,
    href: "/bank-accounts",
    // children: [
    //   { label: "Bank Accounts", href: "/bank-accounts" },
    //   { label: "Cash In Hand", href: "/cash-in-hand" },
    //   { label: "Cheques", href: "/cheques" },
    //   { label: "Loan Accounts", href: "/loan-accounts" },
    // ],
  },
  // { label: "Reports", icon: BarChart3, href: "/reports" },
  // {
  //   label: "Sync, Share & Backup",
  //   icon: RefreshCw,
  //   children: [
  //     { label: "Sync Settings", href: "/sync-settings" },
  //     { label: "Backup", href: "/backup" },
  //   ],
  // },
  // { label: "Other Products", icon: Grid3X3, href: "/other-products" },
  // { label: "Bulk GST Update", icon: FileSpreadsheet, href: "/bulk-gst" },
  // {
  //   label: "Utilities",
  //   icon: Wrench,
  //   children: [
  //     { label: "Import Data", href: "/import-data" },
  //     { label: "Export Data", href: "/export-data" },
  //   ],
  // },
  { label: "Profile", icon: Settings, href: "/profile" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Sale", "Parties"]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href?: string, children?: { href: string }[]) => {
    if (href) return location.pathname === href;
    if (children) return children.some((child) => location.pathname === child.href);
    return false;
  };

  return (
    <aside className="w-60 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0">
      <div className="p-4 border-b border-sidebar-border">
        <button className="w-full text-left text-sm bg-sidebar-accent rounded-md px-3 py-2 text-sidebar-muted">
          Open Anything (Ctrl+F)
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-sidebar-accent transition-colors",
                    isActive(undefined, item.children) && "bg-sidebar-accent"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {expandedItems.includes(item.label) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {expandedItems.includes(item.label) && (
                  <div className="ml-4 border-l-2 border-sidebar-border">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 text-sm hover:bg-sidebar-accent transition-colors",
                          location.pathname === child.href &&
                            "bg-sidebar-accent border-l-2 border-primary -ml-0.5"
                        )}
                      >
                        <span>{child.label}</span>
                        <Plus className="w-4 h-4 ml-auto" />
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.href!}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-sidebar-accent transition-colors",
                  location.pathname === item.href && "bg-sidebar-accent border-l-2 border-primary"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => navigate("/profile")}
          className="w-full flex items-center gap-3 hover:bg-sidebar-accent rounded-md p-2 -m-2 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold text-sm">
            R
          </div>
          <span className="text-sm font-medium">RAMESH CLOTH</span>
          <ChevronRight className="w-4 h-4 ml-auto" />
        </button>
      </div>
    </aside>
  );
}
