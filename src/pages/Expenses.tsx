import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
    Save,
    X,
    Trash2,
    ChevronDown,
} from "lucide-react";
import { format } from "date-fns";

// Types
interface ExpenseItem {
    id: string;
    item: string;
    qty: number;
    pricePerUnit: number;
    amount: number;
}

const initialItems: ExpenseItem[] = [
    { id: "1", item: "", qty: 0, pricePerUnit: 0, amount: 0 },
    { id: "2", item: "", qty: 0, pricePerUnit: 0, amount: 0 },
];

const expenseCategories = [
    "Office Supplies",
    "Rent",
    "Utilities",
    "Travel",
    "Salaries",
    "Marketing",
    "Insurance",
    "Maintenance",
    "Other",
];

export default function Expenses() {
    const [items, setItems] = useState<ExpenseItem[]>(initialItems);
    const [expenseCategory, setExpenseCategory] = useState("");
    const [expenseNo, setExpenseNo] = useState("");
    const [expenseDate, setExpenseDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [gstEnabled, setGstEnabled] = useState(false);
    const [paymentType, setPaymentType] = useState("Cash");
    const [roundOff, setRoundOff] = useState(true);
    const [roundOffValue, setRoundOffValue] = useState(0);

    const handleAddItem = () => {
        const newItem: ExpenseItem = {
            id: (items.length + 1).toString(),
            item: "",
            qty: 0,
            pricePerUnit: 0,
            amount: 0,
        };
        setItems([...items, newItem]);
    };

    const updateItem = (id: string, field: keyof ExpenseItem, value: any) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };

                    if (field === "qty" || field === "pricePerUnit") {
                        const qty = field === "qty" ? value : item.qty;
                        const pricePerUnit = field === "pricePerUnit" ? value : item.pricePerUnit;
                        updatedItem.amount = qty * pricePerUnit;
                    }

                    return updatedItem;
                }
                return item;
            })
        );
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter((item) => item.id !== id));
        }
    };

    const calculateTotalQty = () => items.reduce((acc, item) => acc + Number(item.qty), 0);
    const calculateTotalAmount = () => items.reduce((acc, item) => acc + item.amount, 0);

    const finalTotal = calculateTotalAmount() + (roundOff ? roundOffValue : 0);

    return (
        <MainLayout>
            <div className="flex flex-col h-full bg-gray-50/50 justify-between">
                {/* Header */}
                <div className="mb-4 bg-white border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-gray-800">Expense</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">GST</span>
                            <Switch
                                checked={gstEnabled}
                                onCheckedChange={setGstEnabled}
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                        <Save className="w-5 h-5" />
                    </Button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-auto scrollbar-hidden">
                    <div className="mx-auto bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px] flex flex-col">

                        {/* Top Form Section */}
                        <div className="p-6 flex justify-between">
                            {/* Left Side - Expense Category */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <div className="w-[200px] border-2 border-blue-400 rounded-md bg-white p-2 relative">
                                        <Label className="text-xs text-blue-500 absolute -top-2 left-2 bg-white px-1 font-medium">
                                            Expense Category*
                                        </Label>
                                        <Select value={expenseCategory} onValueChange={setExpenseCategory}>
                                            <SelectTrigger className="h-8 border-none focus:ring-0 p-0 text-sm font-medium">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {expenseCategories.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Expense Details */}
                            <div className="grid grid-cols-[100px_1fr] gap-y-4 gap-x-4 items-center">
                                <Label className="text-gray-500 text-right text-sm">Expense No.</Label>
                                <Input
                                    className="h-8 max-w-[150px] border-gray-200"
                                    value={expenseNo}
                                    onChange={(e) => setExpenseNo(e.target.value)}
                                />

                                <Label className="text-gray-500 text-right text-sm">Date</Label>
                                <div className="relative max-w-[150px]">
                                    <Input
                                        type="date"
                                        className="h-8 border-gray-200"
                                        value={expenseDate}
                                        onChange={(e) => setExpenseDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mt-4 border-t border-gray-200">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-medium text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-[50px]">#</th>
                                        <th className="px-4 py-3 text-left w-[40%]">ITEM</th>
                                        <th className="px-4 py-3 text-left w-[120px]">QTY</th>
                                        <th className="px-4 py-3 text-left w-[150px]">PRICE/UNIT</th>
                                        <th className="px-4 py-3 text-right">AMOUNT</th>
                                        <th className="px-2 py-3 w-[40px]"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {items.map((item, index) => (
                                        <tr key={item.id} className="group hover:bg-gray-50/50">
                                            <td className="px-4 py-2 text-gray-500 text-center">{index + 1}</td>
                                            <td className="px-4 py-2">
                                                <Input
                                                    className="h-9 border-gray-200 focus:border-blue-500 bg-gray-50/50"
                                                    value={item.item}
                                                    onChange={(e) => updateItem(item.id, "item", e.target.value)}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <Input
                                                    type="number"
                                                    className="h-9 border-gray-200 focus:border-blue-500 bg-gray-50/50 text-right"
                                                    value={item.qty || ""}
                                                    onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <Input
                                                    type="number"
                                                    className="h-9 border-gray-200 focus:border-blue-500 bg-gray-50/50 text-right"
                                                    value={item.pricePerUnit || ""}
                                                    onChange={(e) => updateItem(item.id, "pricePerUnit", Number(e.target.value))}
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-right font-medium">
                                                {item.amount > 0 ? item.amount.toFixed(2) : ""}
                                            </td>
                                            <td className="px-2 py-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Total Row */}
                                    <tr className="bg-gray-50 font-medium text-sm border-t border-gray-200">
                                        <td className="px-4 py-3"></td>
                                        <td className="px-4 py-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                                onClick={handleAddItem}
                                            >
                                                ADD ROW
                                            </Button>
                                        </td>
                                        <td className="px-4 py-3 text-center text-gray-500">TOTAL</td>
                                        <td className="px-4 py-3 text-right">{calculateTotalQty()}</td>
                                        <td className="px-4 py-3 text-right text-gray-900">
                                            {calculateTotalAmount() > 0 ? calculateTotalAmount().toFixed(2) : "0"}
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex-1"></div>

                        {/* Payment & Footer Section */}
                        <div className="border-t border-gray-200 p-6 bg-gray-50/30">
                            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-[200px] border rounded-md bg-white p-2 relative">
                                            <Label className="text-xs text-gray-500 absolute -top-2 left-2 bg-white px-1">
                                                Payment Type
                                            </Label>
                                            <Select value={paymentType} onValueChange={setPaymentType}>
                                                <SelectTrigger className="h-8 border-none focus:ring-0 p-0 text-sm font-medium">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Cash">Cash</SelectItem>
                                                    <SelectItem value="Check">Check</SelectItem>
                                                    <SelectItem value="Online">Online</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Button variant="link" className="text-blue-600 h-auto p-0 text-sm font-medium">
                                        + Add Payment type
                                    </Button>
                                </div>

                                <div className="md:min-w-[300px] space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id="roundOff"
                                                checked={roundOff}
                                                onCheckedChange={(checked) => setRoundOff(!!checked)}
                                                className="rounded-[2px] border-blue-500 text-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                                            />
                                            <Label htmlFor="roundOff" className="text-sm font-normal text-gray-600">
                                                Round Off
                                            </Label>
                                        </div>
                                        <Input
                                            type="number"
                                            className="w-20 h-8 text-right bg-white border-gray-200"
                                            value={roundOffValue}
                                            disabled={!roundOff}
                                            onChange={(e) => setRoundOffValue(Number(e.target.value))}
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 mt-2">
                                        <span className="text-base font-medium text-gray-700">Total</span>
                                        <div className="w-32">
                                            <Input
                                                className="h-10 text-right bg-white font-bold text-lg border-gray-200"
                                                value={finalTotal.toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Padding for sticky footer */}
                    <div className="h-20"></div>
                </div>

                {/* Sticky Footer */}
                <div className="bg-white border-t border-gray-200 p-4 z-25 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end gap-0">
                    <div className="flex bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden divide-x divide-gray-200">
                        <Button
                            variant="ghost"
                            className="h-10 px-4 gap-2 text-blue-600 hover:bg-blue-50 font-medium rounded-none"
                        >
                            Share <ChevronDown className="w-4 h-4" />
                        </Button>
                        <Button className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-none">
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
