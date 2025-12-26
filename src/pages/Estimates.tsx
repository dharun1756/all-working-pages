import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Settings, ChevronDown, AlertTriangle, Search, BarChart3, FileSpreadsheet, Printer, MoreVertical } from "lucide-react";
import { useEstimates, useAddEstimate, useEstimateStats } from "@/hooks/useEstimates";
import { useParties } from "@/hooks/useParties";
import { format } from "date-fns";

export default function Estimates() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: estimates, isLoading } = useEstimates();
  const { data: stats } = useEstimateStats();
  const { data: parties } = useParties();
  const addEstimate = useAddEstimate();

  const [newEstimate, setNewEstimate] = useState({
    estimate_number: "",
    party_id: "",
    estimate_date: new Date().toISOString().split("T")[0],
    valid_until: "",
    total_amount: 0,
    status: "pending",
    notes: "",
  });

  const handleSubmit = () => {
    if (!newEstimate.estimate_number) return;
    addEstimate.mutate(
      {
        ...newEstimate,
        party_id: newEstimate.party_id || undefined,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setNewEstimate({
            estimate_number: "",
            party_id: "",
            estimate_date: new Date().toISOString().split("T")[0],
            valid_until: "",
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
          <h1 className="text-xl font-semibold">Estimate/Quotation</h1>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">+ Add Estimate</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Estimate</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Estimate Number *</Label>
                  <Input
                    value={newEstimate.estimate_number}
                    onChange={(e) => setNewEstimate({ ...newEstimate, estimate_number: e.target.value })}
                    placeholder="EST-001"
                  />
                </div>
                <div>
                  <Label>Party</Label>
                  <Select value={newEstimate.party_id} onValueChange={(v) => setNewEstimate({ ...newEstimate, party_id: v })}>
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
                    <Label>Estimate Date</Label>
                    <Input
                      type="date"
                      value={newEstimate.estimate_date}
                      onChange={(e) => setNewEstimate({ ...newEstimate, estimate_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Valid Until</Label>
                    <Input
                      type="date"
                      value={newEstimate.valid_until}
                      onChange={(e) => setNewEstimate({ ...newEstimate, valid_until: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={newEstimate.total_amount}
                    onChange={(e) => setNewEstimate({ ...newEstimate, total_amount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={newEstimate.status} onValueChange={(v) => setNewEstimate({ ...newEstimate, status: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSubmit} className="w-full" disabled={addEstimate.isPending}>
                  {addEstimate.isPending ? "Saving..." : "Save Estimate"}
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
            <p className="text-sm text-muted-foreground">Total Quotations</p>
            <p className="text-2xl font-bold mt-1">₹ {(stats?.total || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Converted: ₹ {(stats?.converted || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })} | Open: ₹ {(stats?.open || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Transactions</h3>
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
                <th>Reference no <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Party Name <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Amount <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Status <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
              ) : estimates && estimates.length > 0 ? (
                estimates.map((estimate) => (
                  <tr key={estimate.id}>
                    <td>{format(new Date(estimate.estimate_date), "dd/MM/yyyy")}</td>
                    <td>{estimate.estimate_number}</td>
                    <td>{estimate.parties?.name || "-"}</td>
                    <td>₹ {(estimate.total_amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs ${
                        estimate.status === "converted" ? "bg-green-100 text-green-800" :
                        estimate.status === "cancelled" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {estimate.status || "Pending"}
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
                      <p className="font-medium">No Estimates Found</p>
                      <p className="text-sm text-muted-foreground">Create your first estimate to get started.</p>
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
