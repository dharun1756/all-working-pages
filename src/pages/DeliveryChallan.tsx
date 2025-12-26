import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Settings, ChevronDown, AlertTriangle, Search, BarChart3, FileSpreadsheet, Printer, MoreVertical } from "lucide-react";
import { useDeliveryChallans, useAddDeliveryChallan, useDeliveryChallanStats } from "@/hooks/useDeliveryChallans";
import { useParties } from "@/hooks/useParties";
import { format } from "date-fns";

export default function DeliveryChallan() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: challans, isLoading } = useDeliveryChallans();
  const { data: stats } = useDeliveryChallanStats();
  const { data: parties } = useParties();
  const addChallan = useAddDeliveryChallan();

  const [newChallan, setNewChallan] = useState({
    challan_number: "",
    party_id: "",
    challan_date: new Date().toISOString().split("T")[0],
    total_amount: 0,
    status: "pending",
    notes: "",
  });

  const handleSubmit = () => {
    if (!newChallan.challan_number) return;
    addChallan.mutate(
      {
        ...newChallan,
        party_id: newChallan.party_id || undefined,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setNewChallan({
            challan_number: "",
            party_id: "",
            challan_date: new Date().toISOString().split("T")[0],
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Delivery Challan</h1>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">+ Add Delivery Challan</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Delivery Challan</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Challan Number *</Label>
                  <Input
                    value={newChallan.challan_number}
                    onChange={(e) => setNewChallan({ ...newChallan, challan_number: e.target.value })}
                    placeholder="DC-001"
                  />
                </div>
                <div>
                  <Label>Party</Label>
                  <Select value={newChallan.party_id} onValueChange={(v) => setNewChallan({ ...newChallan, party_id: v })}>
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
                <div>
                  <Label>Challan Date</Label>
                  <Input
                    type="date"
                    value={newChallan.challan_date}
                    onChange={(e) => setNewChallan({ ...newChallan, challan_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={newChallan.total_amount}
                    onChange={(e) => setNewChallan({ ...newChallan, total_amount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={newChallan.status} onValueChange={(v) => setNewChallan({ ...newChallan, status: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="converted">Converted to Sale</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSubmit} className="w-full" disabled={addChallan.isPending}>
                  {addChallan.isPending ? "Saving..." : "Save Challan"}
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
            <p className="text-sm text-muted-foreground">Total Delivery Challans</p>
            <p className="text-2xl font-bold mt-1">₹ {(stats?.total || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Pending: ₹ {(stats?.pending || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })} | Delivered: ₹ {(stats?.delivered || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Challans</h3>
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
                <th>Challan no <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Party Name <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Amount <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Status <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
              ) : challans && challans.length > 0 ? (
                challans.map((challan) => (
                  <tr key={challan.id}>
                    <td>{format(new Date(challan.challan_date), "dd/MM/yyyy")}</td>
                    <td>{challan.challan_number}</td>
                    <td>{challan.parties?.name || "-"}</td>
                    <td>₹ {(challan.total_amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs ${
                        challan.status === "delivered" ? "bg-green-100 text-green-800" :
                        challan.status === "cancelled" ? "bg-red-100 text-red-800" :
                        challan.status === "converted" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {challan.status || "Pending"}
                      </span>
                    </td>
                    <td><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state py-12">
                      <AlertTriangle className="w-12 h-12 text-primary/50 mb-4" />
                      <p className="font-medium">No Delivery Challans Found</p>
                      <p className="text-sm text-muted-foreground">Create your first delivery challan to get started.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
