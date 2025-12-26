import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Settings, ChevronDown, AlertTriangle, Search, BarChart3, FileSpreadsheet, Printer, MoreVertical } from "lucide-react";
import { usePayments, useAddPayment, usePaymentStats } from "@/hooks/usePayments";
import { useParties } from "@/hooks/useParties";
import { format } from "date-fns";

export default function PaymentIn() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: payments, isLoading } = usePayments("in");
  const { data: stats } = usePaymentStats("in");
  const { data: parties } = useParties();
  const addPayment = useAddPayment();

  const [newPayment, setNewPayment] = useState({
    payment_number: "",
    party_id: "",
    payment_date: new Date().toISOString().split("T")[0],
    amount: 0,
    payment_mode: "cash",
    reference_number: "",
    notes: "",
  });

  const handleSubmit = () => {
    if (!newPayment.payment_number) return;
    addPayment.mutate(
      {
        ...newPayment,
        payment_type: "in",
        party_id: newPayment.party_id || undefined,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setNewPayment({
            payment_number: "",
            party_id: "",
            payment_date: new Date().toISOString().split("T")[0],
            amount: 0,
            payment_mode: "cash",
            reference_number: "",
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
          <h1 className="text-xl font-semibold">Payment-In</h1>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">+ Add Payment-In</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Record Payment-In</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Receipt Number *</Label>
                  <Input
                    value={newPayment.payment_number}
                    onChange={(e) => setNewPayment({ ...newPayment, payment_number: e.target.value })}
                    placeholder="REC-001"
                  />
                </div>
                <div>
                  <Label>Party</Label>
                  <Select value={newPayment.party_id} onValueChange={(v) => setNewPayment({ ...newPayment, party_id: v })}>
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
                  <Label>Payment Date</Label>
                  <Input
                    type="date"
                    value={newPayment.payment_date}
                    onChange={(e) => setNewPayment({ ...newPayment, payment_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Payment Mode</Label>
                  <Select value={newPayment.payment_mode} onValueChange={(v) => setNewPayment({ ...newPayment, payment_mode: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Reference Number</Label>
                  <Input
                    value={newPayment.reference_number}
                    onChange={(e) => setNewPayment({ ...newPayment, reference_number: e.target.value })}
                    placeholder="Transaction ID"
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full" disabled={addPayment.isPending}>
                  {addPayment.isPending ? "Saving..." : "Save Payment"}
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
            <p className="text-sm text-muted-foreground">Total Amount Received</p>
            <p className="text-2xl font-bold mt-1">₹ {(stats?.total || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
          </div>
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
                <th>Ref. no. <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Party Name <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Amount <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Payment Type <Filter className="w-3 h-3 inline ml-1" /></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
              ) : payments && payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{format(new Date(payment.payment_date), "dd/MM/yyyy")}</td>
                    <td>{payment.payment_number}</td>
                    <td>{payment.parties?.name || "-"}</td>
                    <td>₹ {(payment.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="capitalize">{payment.payment_mode || "Cash"}</td>
                    <td><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state py-12">
                      <AlertTriangle className="w-12 h-12 text-primary/50 mb-4" />
                      <p className="font-medium">No Payments Found</p>
                      <p className="text-sm text-muted-foreground">Record your first payment to get started.</p>
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
