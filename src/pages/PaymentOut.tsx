import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Settings, ChevronDown, Search, BarChart3, FileSpreadsheet, Printer, MoreVertical, TrendingUp, Calendar, FileText, CreditCard } from "lucide-react";
import { usePayments, useAddPayment, usePaymentStats } from "@/hooks/usePayments";
import { useParties } from "@/hooks/useParties";
import { format, startOfMonth, endOfMonth } from "date-fns";

export default function PaymentOut() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data: payments, isLoading } = usePayments("out");
    const { data: stats } = usePaymentStats("out");
    const { data: parties } = useParties();
    const addPayment = useAddPayment();

    const currentDate = new Date();
    const monthStart = format(startOfMonth(currentDate), "dd/MM/yyyy");
    const monthEnd = format(endOfMonth(currentDate), "dd/MM/yyyy");

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
                payment_type: "out",
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
            {/* Business Name Bar */}
            <div className="w-full bg-white border-b border-gray-200 px-4 py-2.5 -mx-4 -mt-4 mb-4 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                <span className="text-sm text-gray-400 italic">Enter Business Name</span>
            </div>

            {/* Title + Add Button */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold text-gray-900">Payment-Out</h1>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex items-center gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#0D66F3] hover:bg-[#0D66F8] text-white font-medium px-5 py-2 rounded-full shadow-sm transition-all duration-200 hover:shadow-md">
                                + Add Payment-Out
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-lg font-semibold">Record Payment-Out</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-2">
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Payment Number *</Label>
                                    <Input
                                        value={newPayment.payment_number}
                                        onChange={(e) => setNewPayment({ ...newPayment, payment_number: e.target.value })}
                                        placeholder="PAY-001"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Party</Label>
                                    <Select value={newPayment.party_id} onValueChange={(v) => setNewPayment({ ...newPayment, party_id: v })}>
                                        <SelectTrigger className="mt-1">
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
                                    <Label className="text-sm font-medium text-gray-700">Payment Date</Label>
                                    <Input
                                        type="date"
                                        value={newPayment.payment_date}
                                        onChange={(e) => setNewPayment({ ...newPayment, payment_date: e.target.value })}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Amount</Label>
                                    <Input
                                        type="number"
                                        value={newPayment.amount}
                                        onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) || 0 })}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Payment Mode</Label>
                                    <Select value={newPayment.payment_mode} onValueChange={(v) => setNewPayment({ ...newPayment, payment_mode: v })}>
                                        <SelectTrigger className="mt-1">
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
                                    <Label className="text-sm font-medium text-gray-700">Reference Number</Label>
                                    <Input
                                        value={newPayment.reference_number}
                                        onChange={(e) => setNewPayment({ ...newPayment, reference_number: e.target.value })}
                                        placeholder="Transaction ID"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Notes</Label>
                                    <Input
                                        value={newPayment.notes}
                                        onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                                        placeholder="Optional notes"
                                        className="mt-1"
                                    />
                                </div>
                                <Button onClick={handleSubmit} className="w-full bg-[#E53935] hover:bg-[#D32F2F] text-white" disabled={addPayment.isPending}>
                                    {addPayment.isPending ? "Saving..." : "Save Payment"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                        <Settings className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-3 mb-5 border border-blue-100 bg-blue-50/40 rounded-lg px-4 py-2.5">
                <span className="text-sm text-gray-500 font-medium">Filter by :</span>
                <Button variant="outline" size="sm" className="filter-chip bg-white border-gray-200 text-gray-700 rounded-full text-xs px-3 py-1 h-7">
                    This Month <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{monthStart}</span>
                    <span className="text-gray-400">To</span>
                    <span>{monthEnd}</span>
                </div>
                <Button variant="outline" size="sm" className="filter-chip bg-white border-gray-200 text-gray-700 rounded-full text-xs px-3 py-1 h-7">
                    All Firms <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
            </div>

            {/* Stats Card */}
            <Card className="mb-5 max-w-xs border border-gray-200 shadow-sm">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-2xl font-bold text-gray-900 mt-0.5">
                                ₹ {(stats?.total || 0).toLocaleString("en-IN")}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                            <span>0%</span>
                            <TrendingUp className="w-3 h-3" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">vs last month</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Paid: <span className="font-medium text-gray-700">₹ {(stats?.total || 0).toLocaleString("en-IN")}</span>
                    </p>
                </CardContent>
            </Card>

            {/* Transactions Card */}
            <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-0">
                    {payments && payments.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Transactions</h3>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600"><Search className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600"><BarChart3 className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600"><FileSpreadsheet className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600"><Printer className="w-4 h-4" /></Button>
                                </div>
                            </div>
                            <table className="data-table">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th>Date <Filter className="w-3 h-3 inline ml-1 text-gray-300" /></th>
                                        <th>Ref. no. <Filter className="w-3 h-3 inline ml-1 text-gray-300" /></th>
                                        <th>Party Name <Filter className="w-3 h-3 inline ml-1 text-gray-300" /></th>
                                        <th>Amount <Filter className="w-3 h-3 inline ml-1 text-gray-300" /></th>
                                        <th>Payment Type <Filter className="w-3 h-3 inline ml-1 text-gray-300" /></th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td>{format(new Date(payment.payment_date), "dd/MM/yyyy")}</td>
                                            <td className="text-blue-600 font-medium">{payment.payment_number}</td>
                                            <td>{payment.parties?.name || "-"}</td>
                                            <td className="font-medium">₹ {(payment.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                            <td className="capitalize">{payment.payment_mode || "Cash"}</td>
                                            <td><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-20">
                            {/* Illustration */}
                            <div className="relative mb-6">
                                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200/50 flex items-center justify-center shadow-inner">
                                        <div className="relative">
                                            <FileText className="w-7 h-7 text-blue-400" />
                                            <CreditCard className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1.5" />
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative ring */}
                                <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-dashed border-gray-200 animate-[spin_20s_linear_infinite]"></div>
                            </div>

                            <p className="font-semibold text-gray-800 text-base">No Transactions to show</p>
                            <p className="text-sm text-gray-400 mt-1 mb-5">You haven't added any transactions yet.</p>

                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-[#0D66F3] hover:bg-[#0D66F8] text-white font-medium px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                + Add Payment-Out
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </MainLayout>
    );
}
