import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Settings, ChevronDown, AlertTriangle, Search, BarChart3, FileSpreadsheet, Printer, MoreVertical } from "lucide-react";
import { useSaleOrders, useAddSaleOrder, useSaleOrderStats } from "@/hooks/useSaleOrders";
import { useParties } from "@/hooks/useParties";
import { format } from "date-fns";

export default function SaleOrder() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: orders, isLoading } = useSaleOrders();
  const { data: stats } = useSaleOrderStats();
  const { data: parties } = useParties();
  const addOrder = useAddSaleOrder();

  const [newOrder, setNewOrder] = useState({
    order_number: "",
    party_id: "",
    order_date: new Date().toISOString().split("T")[0],
    delivery_date: "",
    total_amount: 0,
    status: "pending",
    notes: "",
  });

  const handleSubmit = () => {
    if (!newOrder.order_number) return;
    addOrder.mutate(
      {
        ...newOrder,
        party_id: newOrder.party_id || undefined,
        due_date: newOrder.delivery_date || undefined,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setNewOrder({
            order_number: "",
            party_id: "",
            order_date: new Date().toISOString().split("T")[0],
            delivery_date: "",
            total_amount: 0,
            status: "pending",
            notes: "",
          });
        },
      }
    );
  };

  return (
    <MainLayout>
      <Tabs defaultValue="sale-orders" className="w-full">
        <TabsList className="w-full justify-center bg-transparent border-b border-border rounded-none h-auto p-0">
          <TabsTrigger
            value="sale-orders"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3 font-medium"
          >
            SALE ORDERS
          </TabsTrigger>
          <TabsTrigger
            value="online-orders"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3 font-medium text-muted-foreground"
          >
            ONLINE ORDERS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sale-orders" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Sale Orders</h1>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">+ Add Sale Order</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Sale Order</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Order Number *</Label>
                      <Input
                        value={newOrder.order_number}
                        onChange={(e) => setNewOrder({ ...newOrder, order_number: e.target.value })}
                        placeholder="SO-001"
                      />
                    </div>
                    <div>
                      <Label>Party</Label>
                      <Select value={newOrder.party_id} onValueChange={(v) => setNewOrder({ ...newOrder, party_id: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select party" />
                        </SelectTrigger>
                        <SelectContent>
                          {parties?.map((party) => (
                            <SelectItem key={party.id} value={party.id}>{party.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Order Date</Label>
                        <Input
                          type="date"
                          value={newOrder.order_date}
                          onChange={(e) => setNewOrder({ ...newOrder, order_date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Delivery Date</Label>
                        <Input
                          type="date"
                          value={newOrder.delivery_date}
                          onChange={(e) => setNewOrder({ ...newOrder, delivery_date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        value={newOrder.total_amount}
                        onChange={(e) => setNewOrder({ ...newOrder, total_amount: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select value={newOrder.status} onValueChange={(v) => setNewOrder({ ...newOrder, status: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleSubmit} className="w-full" disabled={addOrder.isPending}>
                      {addOrder.isPending ? "Saving..." : "Save Order"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground">Filter by :</span>
            <Button variant="outline" size="sm" className="filter-chip">This Month <ChevronDown className="w-3 h-3" /></Button>
            <Button variant="outline" size="sm" className="filter-chip">All Firms <ChevronDown className="w-3 h-3" /></Button>
          </div>

          <Card className="mb-4 max-w-sm">
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Sale Orders</p>
                <p className="text-2xl font-bold mt-1">₹ {(stats?.total || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Pending: ₹ {(stats?.pending || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })} | Completed: ₹ {(stats?.completed || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Orders</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Search className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon"><BarChart3 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon"><FileSpreadsheet className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon"><Printer className="w-4 h-4" /></Button>
                </div>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date <Filter className="w-3 h-3 inline ml-1" /></th>
                    <th>Order no <Filter className="w-3 h-3 inline ml-1" /></th>
                    <th>Party Name <Filter className="w-3 h-3 inline ml-1" /></th>
                    <th>Amount <Filter className="w-3 h-3 inline ml-1" /></th>
                    <th>Delivery Date <Filter className="w-3 h-3 inline ml-1" /></th>
                    <th>Status <Filter className="w-3 h-3 inline ml-1" /></th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr>
                  ) : orders && orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td>{format(new Date(order.order_date), "dd/MM/yyyy")}</td>
                        <td>{order.order_number}</td>
                        <td>{order.parties?.name || "-"}</td>
                        <td>₹ {(order.total_amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                        <td>{order.delivery_date ? format(new Date(order.delivery_date), "dd/MM/yyyy") : "-"}</td>
                        <td>
                          <span className={`px-2 py-1 rounded text-xs ${
                            order.status === "completed" ? "bg-green-100 text-green-800" :
                            order.status === "cancelled" ? "bg-red-100 text-red-800" :
                            order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status || "Pending"}
                          </span>
                        </td>
                        <td><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>
                        <div className="empty-state py-12">
                          <AlertTriangle className="w-12 h-12 text-primary/50 mb-4" />
                          <p className="font-medium">No Sale Orders Found</p>
                          <p className="text-sm text-muted-foreground">Create your first sale order to get started.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="online-orders">
          <div className="empty-state py-12">
            <p className="text-muted-foreground">No online orders yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
