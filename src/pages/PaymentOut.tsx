import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Settings, ChevronDown, AlertTriangle, Search, BarChart3, FileSpreadsheet, Printer, MoreVertical, Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { usePayments, useAddPayment, usePaymentStats } from "@/hooks/usePayments";
import { useParties } from "@/hooks/useParties";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

export default function PaymentOut() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data: payments, isLoading } = usePayments("out");
    const { data: stats } = usePaymentStats("out");
    const { data: parties } = useParties();
    const addPayment = useAddPayment();
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    });

    const [dateFilterLabel, setDateFilterLabel] = useState("This Month");
    const [firmFilterLabel, setFirmFilterLabel] = useState("All Firms");
    const [openPartyCombobox, setOpenPartyCombobox] = useState(false);

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

    // Filter payments based on selected date range
    const filteredPayments = payments?.filter(payment => {
        if (!dateRange?.from) return true;
        const paymentDate = new Date(payment.payment_date);
        const from = dateRange.from;
        const to = dateRange.to || dateRange.from;
        return paymentDate >= from && paymentDate <= to;
    });

    const categories = ["This Month", "Last Month", "This Quarter", "This Year"];

    return (
        <MainLayout>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-semibold">Payment-Out</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#ea384c] hover:bg-[#ea384c]/90 text-white shadow-sm">+ Add Payment-Out</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold">Record Payment-Out</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="">Receipt Number *</Label>
                                    <Input
                                        className="mt-2"
                                        value={newPayment.payment_number}
                                        onChange={(e) => setNewPayment({ ...newPayment, payment_number: e.target.value })}
                                        placeholder="REC-001"
                                    />
                                </div>
                                <div className="flex flex-col space-y-[18px]">
                                    <Label>Party</Label>
                                    <Popover
                                        open={openPartyCombobox}
                                        onOpenChange={setOpenPartyCombobox}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openPartyCombobox}
                                                className="w-full justify-between"
                                            >
                                                {newPayment.party_id
                                                    ? parties?.find((party) => party.id === newPayment.party_id)?.name
                                                    : "Select party"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search party..." />
                                                <CommandList>
                                                    <CommandEmpty>No party found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {parties?.map((party) => (
                                                            <CommandItem
                                                                key={party.id}
                                                                value={party.name}
                                                                onSelect={() => {
                                                                    setNewPayment({ ...newPayment, party_id: party.id });
                                                                    setOpenPartyCombobox(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        newPayment.party_id === party.id ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {party.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div>
                                    <Label>Payment Date</Label>
                                    <Input
                                        className="mt-2"
                                        type="date"
                                        value={newPayment.payment_date}
                                        onChange={(e) => setNewPayment({ ...newPayment, payment_date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>Amount</Label>
                                    <Input
                                        className="mt-2"
                                        type="number"
                                        value={newPayment.amount}
                                        onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="flex flex-col space-y-[18px]">
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
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <Button onClick={handleSubmit} className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90 text-white mt-4" disabled={addPayment.isPending}>
                                {addPayment.isPending ? "Saving..." : "Save Payment"}
                            </Button>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon">
                        <Settings className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Filter by :</span>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="filter-chip bg-[#f0f9ff] !text-[#0ea5e9] border-[#0ea5e9]/20 hover:bg-[#f0f9ff]/80">
                            {dateFilterLabel} <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {categories.map((category) => (
                            <DropdownMenuItem key={category} onClick={() => setDateFilterLabel(category)}>
                                {category}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"select"}
                            size="sm"
                            className={cn(
                                "justify-start text-left font-normal",
                                !dateRange && "!text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "dd/MM/yyyy")} To {format(dateRange.to, "dd/MM/yyyy")}
                                    </>
                                ) : (
                                    format(dateRange.from, "dd/MM/yyyy")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="filter-chip bg-[#f0f9ff] !text-[#0ea5e9] border-[#0ea5e9]/20 hover:bg-[#f0f9ff]/80">
                            {firmFilterLabel} <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuItem onClick={() => setFirmFilterLabel("All Firms")}>
                            All Firms
                        </DropdownMenuItem>
                        {parties?.map((party) => (
                            <DropdownMenuItem key={party.id} onClick={() => setFirmFilterLabel(party.name)}>
                                {party.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Card className="mb-4 max-w-sm bg-[#fbf8ff] border-solid border-[#e1e7ef] shadow-sm hover:shadow-md">
                <CardContent className="p-4">
                    <div>
                        <div className="flex justify-between items-start">
                            <p className="text-sm text-muted-foreground font-medium">Total Amount</p>
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">0% ↗ vs last month</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">₹ {(stats?.total || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
                        <p className="text-sm text-muted-foreground mt-1">Paid: ₹ 0</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="!h-full">
                <CardContent className="p-4 !h-full">
                    {(!filteredPayments || filteredPayments.length === 0) ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                            <div className="bg-blue-50 rounded-full p-6 mb-4 relative">
                                <div className="absolute top-0 right-0 w-3 h-3 bg-blue-300 rounded-full animate-ping"></div>
                                <FileSpreadsheet className="w-12 h-12 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No Transactions to show</h3>
                            <p className="text-sm text-gray-500 mb-6">You haven't added any transactions yet.</p>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-[#ea384c] hover:bg-[#ea384c]/90 text-white">+ Add Payment-Out</Button>
                                </DialogTrigger>
                            </Dialog>
                        </div>
                    ) : (
                        <>
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
                                    {filteredPayments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td>{format(new Date(payment.payment_date), "dd/MM/yyyy")}</td>
                                            <td>{payment.payment_number}</td>
                                            <td>{payment.parties?.name || "-"}</td>
                                            <td>₹ {(payment.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                            <td className="capitalize">{payment.payment_mode || "Cash"}</td>
                                            <td><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </CardContent>
            </Card>
        </MainLayout>
    );
}
