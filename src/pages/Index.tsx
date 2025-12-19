import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboardStats } from "@/hooks/useDashboard";
import { Link } from "react-router-dom";

const reports = [
  { name: "Sale Report", href: "/sale-invoices" },
  { name: "All Transactions", href: "#" },
  { name: "Daybook Report", href: "#" },
  { name: "Party Statement", href: "/parties" },
];

export default function Index() {
  const { data: stats, isLoading } = useDashboardStats();

  const chartData = [
    { date: "1 Dec", amount: 0 },
    { date: "5 Dec", amount: 0 },
    { date: "10 Dec", amount: 0 },
    { date: "15 Dec", amount: 0 },
    { date: "20 Dec", amount: 0 },
    { date: "25 Dec", amount: 0 },
    { date: "31 Dec", amount: 0 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Receivable Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Receivable</p>
                <p className="text-2xl font-bold mt-1">
                  {isLoading ? "..." : formatCurrency(stats?.receivable || 0)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  From {stats?.receivableParties || 0} Parties
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payable Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Payable</p>
                <p className="text-2xl font-bold mt-1">
                  {isLoading ? "..." : formatCurrency(stats?.payable || 0)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  From {stats?.payableParties || 0} Parties
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowUp className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium text-sm">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" asChild>
                <Link to="/sale-invoices">+ Sale Invoice</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link to="/parties">+ Party</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link to="/items">+ Item</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Sale</p>
              <p className="text-2xl font-bold">
                {isLoading ? "..." : formatCurrency(stats?.totalSales || 0)}
              </p>
            </div>
            <Button variant="outline" size="sm">
              This Month
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Reports */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Most Used Reports</h3>
            <Button variant="link" className="text-secondary p-0 h-auto">View All</Button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {reports.map((report) => (
              <Button
                key={report.name}
                variant="outline"
                className="justify-between h-auto py-3"
                asChild
              >
                <Link to={report.href}>
                  <span>{report.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
