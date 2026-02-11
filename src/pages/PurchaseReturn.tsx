import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    FileText,
    FileSpreadsheet,
    Printer,
    Filter,
    Plus,
    Search,
    MoreVertical,
    ArrowUp,
    ArrowDown,
    Check,
    ChevronsUpDown,
    Edit,
    Trash2,
    Share2
} from "lucide-react";
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear, isWithinInterval, parse } from "date-fns";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// Types
interface PurchaseReturnItem {
    id: string;
    date: string;
    refNo: string;
    partyName: string;
    categoryName: string;
    type: string;
    total: number;
    receivedPaid: string;
    balance: number;
}

// Sample Data
const initialSampleData: PurchaseReturnItem[] = [
    {
        id: "1",
        date: "2026-02-01",
        refNo: "PR-2026-001",
        partyName: "Vendor A",
        categoryName: "Electronics",
        type: "Return",
        total: 15000,
        receivedPaid: "Unpaid",
        balance: 15000
    },
    {
        id: "2",
        date: "2026-02-05",
        refNo: "PR-2026-002",
        partyName: "Vendor B",
        categoryName: "Furniture",
        type: "Return",
        total: 5000,
        receivedPaid: "Paid",
        balance: 0
    },
    {
        id: "3",
        date: "2026-02-10",
        refNo: "PR-2026-003",
        partyName: "Alpha Traders",
        categoryName: "Hardware",
        type: "Return",
        total: 8500,
        receivedPaid: "Partial",
        balance: 2000
    },
    {
        id: "4",
        date: "2026-01-25",
        refNo: "PR-2026-000",
        partyName: "Omega Supplies",
        categoryName: "Stationery",
        type: "Return",
        total: 1200,
        receivedPaid: "Paid",
        balance: 0
    }
];

const businesses = [
    {
        value: "business-1",
        label: "My Business",
    },
    {
        value: "business-2",
        label: "Another Ventures",
    },
]

type SortConfig = {
    key: keyof PurchaseReturnItem | null;
    direction: 'asc' | 'desc';
}

export default function PurchaseReturn() {
    const [dateFrom, setDateFrom] = useState(format(startOfMonth(new Date()), "dd/MM/yyyy"));
    const [dateTo, setDateTo] = useState(format(endOfMonth(new Date()), "dd/MM/yyyy"));
    const [dateFilterType, setDateFilterType] = useState("this-month");

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [openBusiness, setOpenBusiness] = useState(false);
    const [businessValue, setBusinessValue] = useState("");
    const [sampleData, setSampleData] = useState<PurchaseReturnItem[]>(initialSampleData);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
    const [searchQuery, setSearchQuery] = useState("");
    const [editingItem, setEditingItem] = useState<PurchaseReturnItem | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        partyName: "",
        returnNo: "",
        date: format(new Date(), "yyyy-MM-dd"),
        amount: "",
        reason: ""
    });

    const handleDateFilterChange = (value: string) => {
        setDateFilterType(value);
        const today = new Date();
        let start: Date, end: Date;

        switch (value) {
            case "this-month":
                start = startOfMonth(today);
                end = endOfMonth(today);
                break;
            case "last-month":
                const lastMonth = subMonths(today, 1);
                start = startOfMonth(lastMonth);
                end = endOfMonth(lastMonth);
                break;
            case "this-year":
                start = startOfYear(today);
                end = endOfYear(today);
                break;
            default:
                start = startOfMonth(today);
                end = endOfMonth(today);
        }
        setDateFrom(format(start, "dd/MM/yyyy"));
        setDateTo(format(end, "dd/MM/yyyy"));
    };

    const handleOpenDialog = (item?: PurchaseReturnItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                partyName: item.partyName,
                returnNo: item.refNo,
                date: item.date,
                amount: item.total.toString(),
                reason: "" // Assuming reason isn't in item but could be
            });
        } else {
            setEditingItem(null);
            setFormData({
                partyName: "",
                returnNo: "",
                date: format(new Date(), "yyyy-MM-dd"),
                amount: "",
                reason: ""
            });
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (editingItem) {
            // Edit existing
            setSampleData(prev => prev.map(item =>
                item.id === editingItem.id ? {
                    ...item,
                    date: formData.date,
                    refNo: formData.returnNo,
                    partyName: formData.partyName,
                    total: Number(formData.amount),
                    balance: Number(formData.amount) // Reset balance to total for simplicity in this demo
                } : item
            ));
        } else {
            // Add new
            const newItem: PurchaseReturnItem = {
                id: (Math.max(...sampleData.map(i => Number(i.id))) + 1).toString(),
                date: formData.date,
                refNo: formData.returnNo || `PR-2026-00${sampleData.length + 1}`,
                partyName: formData.partyName || "New Vendor",
                categoryName: "General",
                type: "Return",
                total: Number(formData.amount) || 0,
                receivedPaid: "Unpaid",
                balance: Number(formData.amount) || 0
            };
            setSampleData(prev => [...prev, newItem]);
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this return?")) {
            setSampleData(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleSortClick = (key: keyof PurchaseReturnItem) => {
        let newDirection: 'asc' | 'desc' | null = 'asc';

        if (sortConfig.key === key) {
            if (sortConfig.direction === 'asc') {
                newDirection = 'desc';
            } else {
                newDirection = null; // Reset to normal
            }
        }

        if (newDirection === null) {
            setSortConfig({ key: null, direction: 'asc' });
            setSampleData(initialSampleData); // Simplification: reset to initial. Ideally sort by ID/created_at
        } else {
            setSortConfig({ key, direction: newDirection });
            const sorted = [...sampleData].sort((a, b) => {
                const valA = a[key];
                const valB = b[key];

                if (typeof valA === 'string' && typeof valB === 'string') {
                    return newDirection === 'asc'
                        ? valA.localeCompare(valB)
                        : valB.localeCompare(valA);
                }

                if (valA < valB) return newDirection === 'asc' ? -1 : 1;
                if (valA > valB) return newDirection === 'asc' ? 1 : -1;
                return 0;
            });
            setSampleData(sorted);
        }
    };

    const handlePrint = (item?: PurchaseReturnItem) => {
        const content = item
            ? `Printing Return: ${item.refNo} for ${item.partyName}`
            : `Printing visible items...`;
        alert(content); // Placeholder for actual print logic
        // In reality, this would open a print window or generate PDF
        // window.print();
    };

    const filteredData = sampleData.filter(item => {
        const matchesSearch = item.partyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

        // Date filtering
        const itemDate = new Date(item.date);
        const fromDate = parse(dateFrom, "dd/MM/yyyy", new Date());
        const toDate = parse(dateTo, "dd/MM/yyyy", new Date());
        // Set times to ensure inclusive comparison
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);

        const matchesDate = isWithinInterval(itemDate, { start: fromDate, end: toDate });

        return matchesSearch && matchesDate;
    });

    const totalAmount = filteredData.reduce((acc, item) => acc + item.total, 0);
    const totalBalance = filteredData.reduce((acc, item) => acc + item.balance, 0);

    const SortIcon = ({ columnKey }: { columnKey: keyof PurchaseReturnItem }) => {
        if (sortConfig.key !== columnKey) return <Filter className="w-3 h-3 inline ml-1 opacity-50" />;
        if (sortConfig.direction === 'asc') return <ArrowUp className="w-3 h-3 inline ml-1 text-blue-600" />;
        return <ArrowDown className="w-3 h-3 inline ml-1 text-blue-600" />;
    };

    const renderSortableHeader = (label: string, key: keyof PurchaseReturnItem) => (
        <th
            className="py-3 px-4 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors select-none group"
            onClick={() => handleSortClick(key)}
        >
            <div className="flex items-center">
                {label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <SortIcon columnKey={key} />
                </span>
            </div>
        </th>
    );

    return (
        <MainLayout>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-6">
                    {/* Business Name Bar */}
                    <div className="w-full bg-white border-b border-gray-200 px-4 py-2.5 -mx-4 -mt-4 mb-4 flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                        <span className="text-sm text-gray-400 italic">Enter Business Name</span>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Select value={dateFilterType} onValueChange={handleDateFilterChange}>
                            <SelectTrigger className="w-[180px] font-bold text-2xl text-[#494868]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="this-month" className="font-bold">This Month</SelectItem>
                                <SelectItem value="last-month">Last Month</SelectItem>
                                <SelectItem value="this-year">This Year</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center gap-2 px-3 py-2 bg-[#aaaaa9] rounded border border-[#aaaaa9] text-sm">
                            <span className="font-medium text-[#f4f4f3]">Between</span>
                        </div>

                        <Input
                            value={dateFrom}
                            className="w-[110px] bg-white border-gray-200 text-sm text-center font-medium"
                        />

                        <span className="text-sm font-medium text-gray-500">To</span>

                        <Input
                            value={dateTo}
                            className="w-[110px] bg-white border-gray-200 text-sm text-center font-medium"
                        />

                        <Select defaultValue="all-firms">
                            <SelectTrigger className="w-[140px] bg-white border-gray-200 text-sm uppercase">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-firms">ALL FIRMS</SelectItem>
                                <SelectItem value="firm1">Firm 1</SelectItem>
                                <SelectItem value="firm2">Firm 2</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="ml-auto flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2 !text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-blue-700">
                                <FileSpreadsheet className="w-4 h-4 text-green-600" />
                                <span className="hidden sm:inline">Excel Report</span>
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 !text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-blue-700" onClick={() => handlePrint()}>
                                <Printer className="w-4 h-4" />
                                <span className="hidden sm:inline">Print</span>
                            </Button>
                        </div>
                    </div>

                    {/* Document Type Selector & Search */}
                    <div className="flex items-center gap-4 mb-4">
                        <Select defaultValue="credit-note">
                            <SelectTrigger className="w-[220px] bg-white border-gray-200 font-medium">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="debit-note">Debit Note</SelectItem>
                                <SelectItem value="credit-note">Purchase Return</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-4 relative flex justify-between gap-4">
                        <div className="min-w-[320px] relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search by Party, Ref No..."
                                className="pl-9 bg-white border-gray-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {/* Add Button */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-4 shadow-sm animate-in fade-in zoom-in duration-300"
                                    onClick={() => handleOpenDialog()}
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="font-medium">Add Purchase Return</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>{editingItem ? 'Edit Purchase Return' : 'Add Purchase Return'}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="party">Party Name</Label>
                                            <Select
                                                value={formData.partyName}
                                                onValueChange={(val) => setFormData({ ...formData, partyName: val })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select party" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Vendor A">Vendor A</SelectItem>
                                                    <SelectItem value="Vendor B">Vendor B</SelectItem>
                                                    <SelectItem value="Alpha Traders">Alpha Traders</SelectItem>
                                                    <SelectItem value="Omega Supplies">Omega Supplies</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="returnNo">Return No.</Label>
                                            <Input
                                                id="returnNo"
                                                value={formData.returnNo}
                                                onChange={(e) => setFormData({ ...formData, returnNo: e.target.value })}
                                                placeholder="Auto-generated"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="amount">Total Amount</Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                                <Input
                                                    id="amount"
                                                    type="number"
                                                    value={formData.amount}
                                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                    className="pl-7"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="reason">Reason for Return</Label>
                                        <Input
                                            id="reason"
                                            value={formData.reason}
                                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                            placeholder="Describe reason for return (optional)"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                                        {editingItem ? 'Update Return' : 'Save Return'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Data Table */}
                <Card className="border-t border-gray-200 shadow-sm flex-1 flex flex-col min-h-0">
                    <CardContent className="p-0 flex-1 flex flex-col min-h-0">
                        <div className="overflow-auto flex-1">
                            <table className="data-table w-full text-sm text-left relative">
                                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                                    <tr>
                                        {renderSortableHeader("#", "id")}
                                        {renderSortableHeader("DATE", "date")}
                                        {renderSortableHeader("REF NO.", "refNo")}
                                        {renderSortableHeader("PARTY NAME", "partyName")}
                                        {renderSortableHeader("CATEGORY NAME", "categoryName")}
                                        {renderSortableHeader("TYPE", "type")}
                                        {renderSortableHeader("TOTAL", "total")}
                                        {renderSortableHeader("RECEIVED/PAID?", "receivedPaid")}
                                        {renderSortableHeader("BALANCE", "balance")}
                                        <th className="py-3 px-4 whitespace-nowrap text-right">
                                            ACTIONS
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3 px-4">{item.id}</td>
                                                <td className="py-3 px-4">{format(new Date(item.date), "dd/MM/yyyy")}</td>
                                                <td className="py-3 px-4 text-blue-600 font-medium">{item.refNo}</td>
                                                <td className="py-3 px-4 font-medium">{item.partyName}</td>
                                                <td className="py-3 px-4 text-gray-500">{item.categoryName}</td>
                                                <td className="py-3 px-4">{item.type}</td>
                                                <td className="py-3 px-4">₹ {item.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                                <td className="py-3 px-4">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded text-xs font-medium",
                                                        item.receivedPaid === "Paid" ? "bg-green-100 text-green-700" :
                                                            item.receivedPaid === "Partial" ? "bg-yellow-100 text-yellow-700" :
                                                                "bg-red-100 text-red-700"
                                                    )}>
                                                        {item.receivedPaid}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">₹ {item.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                                <td className="py-3 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 text-gray-400">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 hover:text-blue-600 hover:bg-blue-50"
                                                            onClick={() => handlePrint(item)}
                                                            title="Print"
                                                        >
                                                            <Printer className="w-4 h-4" />
                                                        </Button>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600 hover:bg-blue-50">
                                                                    <MoreVertical className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => handleOpenDialog(item)}>
                                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => alert("Share functionality would go here")}>
                                                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDelete(item.id)}>
                                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={10}>
                                                <div className="empty-state py-20 flex flex-col items-center justify-center text-center">
                                                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                                                        <FileText className="w-12 h-12 text-gray-400" />
                                                    </div>
                                                    <p className="font-medium text-gray-900 text-lg">
                                                        No data found.
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1 max-w-sm">
                                                        Try adjusting your search or add a new purchase return.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200 mt-auto sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                            <div className="flex items-center gap-8">
                                <div className="text-sm">
                                    <span className="text-gray-500 font-medium">Total Amount: </span>
                                    <span className="font-bold text-lg text-emerald-500">₹ {totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <div className="text-sm">
                                <span className="text-gray-500 font-medium">Balance: </span>
                                <span className="font-bold text-lg text-gray-900">₹ {totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
