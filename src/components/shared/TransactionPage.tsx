import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Settings, ChevronDown, AlertTriangle, Search, BarChart3, FileSpreadsheet, Printer } from "lucide-react";

interface TransactionPageProps {
  title: string;
  addButtonText: string;
  summaryTitle: string;
  summaryAmount: string;
  summarySubtitle?: string;
  columns: { key: string; label: string }[];
  hasFilters?: boolean;
}

export function TransactionPage({
  title,
  addButtonText,
  summaryTitle,
  summaryAmount,
  summarySubtitle,
  columns,
  hasFilters = true,
}: TransactionPageProps) {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{title}</h1>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-primary hover:bg-primary/90">
            + {addButtonText}
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {hasFilters && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-muted-foreground">Filter by :</span>
          <Button variant="outline" size="sm" className="filter-chip">
            This Month <ChevronDown className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm" className="filter-chip">
            📅 01/12/2025 To 31/12/2025
          </Button>
          <Button variant="outline" size="sm" className="filter-chip">
            All Firms <ChevronDown className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm" className="filter-chip">
            All Users <ChevronDown className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Summary Card */}
      <Card className="mb-4 max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{summaryTitle}</p>
              <p className="text-2xl font-bold mt-1">{summaryAmount}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                0% ↗
              </div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </div>
          {summarySubtitle && (
            <p className="text-sm text-muted-foreground mt-2">{summarySubtitle}</p>
          )}
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Transactions</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <BarChart3 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <FileSpreadsheet className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Printer className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>
                    {col.label} <Filter className="w-3 h-3 inline ml-1" />
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="empty-state py-12">
                    <AlertTriangle className="w-12 h-12 text-primary/50 mb-4" />
                    <p className="font-medium">No Transaction Found</p>
                    <p className="text-sm text-muted-foreground">We could not find any transactions.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
