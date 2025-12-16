import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ChevronRight, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { date: "1 Dec", amount: 0 },
  { date: "5 Dec", amount: 0 },
  { date: "10 Dec", amount: 0 },
  { date: "15 Dec", amount: 0 },
  { date: "20 Dec", amount: 0 },
  { date: "25 Dec", amount: 0 },
  { date: "31 Dec", amount: 0 },
];

const reports = [
  { name: "Sale Report", href: "#" },
  { name: "All Transactions", href: "#" },
  { name: "Daybook Report", href: "#" },
  { name: "Party Statement", href: "#" },
];

export default function Index() {
  return (
    <MainLayout>
      {/* Trial Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span className="text-sm text-amber-800">
            Your Free Plan has expired. To continue using Vyapar, upgrade to our Premium Plan.
          </span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="bg-primary hover:bg-primary/90">Buy Now</Button>
          <Button size="sm" variant="outline" className="text-secondary border-secondary">
            Get Free Demo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Receivable Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Receivable</p>
                <p className="text-2xl font-bold mt-1">₹ 2,05,214</p>
                <p className="text-sm text-muted-foreground mt-1">From 4 Parties</p>
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
                <p className="text-2xl font-bold mt-1">₹ 37,256</p>
                <p className="text-sm text-muted-foreground mt-1">From 2 Parties</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowUp className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integrations Card */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">W</div>
                <span className="font-medium text-sm">WhatsApp Connect</span>
              </div>
              <span className="text-xs text-primary font-medium">TRIAL EXPIRED</span>
            </div>
            <p className="text-xs text-muted-foreground">Purchase your license to continue sending invoices</p>
            <Button variant="link" className="p-0 h-auto text-secondary text-sm">
              Buy Now <ChevronRight className="w-3 h-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Sale</p>
              <p className="text-2xl font-bold">₹ 0</p>
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
              >
                <span>{report.name}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
