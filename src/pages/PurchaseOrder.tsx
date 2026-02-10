import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
    Calculator,
    X,
    Plus,
    Trash2,
    ChevronDown,
    Share2,
    Check
} from "lucide-react";
import { format } from "date-fns";
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
interface OrderItem {
    id: string;
    item: string;
    qty: number;
    unit: string;
    price: number;
    taxConfig: string; // "Without Tax" or "With Tax"
    taxPercent: number;
    taxAmount: number;
    amount: number;
}

const initialItems: OrderItem[] = [
    {
        id: "1",
        item: "",
        qty: 0,
        unit: "NONE",
        price: 0,
        taxConfig: "Without Tax",
        taxPercent: 0,
        taxAmount: 0,
        amount: 0
    },
    {
        id: "2",
        item: "",
        qty: 0,
        unit: "NONE",
        price: 0,
        taxConfig: "Without Tax",
        taxPercent: 0,
        taxAmount: 0,
        amount: 0
    }
];

const parties = [
    { value: "party-1", label: "Party A" },
    { value: "party-2", label: "Party B" },
];

export default function PurchaseOrder() {
    const [items, setItems] = useState<OrderItem[]>(initialItems);
    const [openParty, setOpenParty] = useState(false);
    const [partyValue, setPartyValue] = useState("");
    const [orderNo, setOrderNo] = useState("1");
    const [orderDate, setOrderDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [dueDate, setDueDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [paymentType, setPaymentType] = useState("Cash");
    const [roundOff, setRoundOff] = useState(false);
    const [roundOffValue, setRoundOffValue] = useState(0);

    const handleAddItem = () => {
        const newItem: OrderItem = {
            id: (items.length + 1).toString(),
            item: "",
            qty: 0,
            unit: "NONE",
            price: 0,
            taxConfig: "Without Tax",
            taxPercent: 0,
            taxAmount: 0,
            amount: 0
        };
        setItems([...items, newItem]);
    };

    const updateItem = (id: string, field: keyof OrderItem, value: any) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };

                // Recalculate generic amount logic
                if (field === 'qty' || field === 'price' || field === 'taxPercent') {
                    const qty = field === 'qty' ? value : item.qty;
                    const price = field === 'price' ? value : item.price;
                    const taxPercent = field === 'taxPercent' ? value : item.taxPercent;

                    const baseAmount = qty * price;
                    const taxAmt = baseAmount * (taxPercent / 100);
                    updatedItem.taxAmount = taxAmt;
                    updatedItem.amount = baseAmount + taxAmt;
                }

                return updatedItem;
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const calculateTotalQty = () => items.reduce((acc, item) => acc + Number(item.qty), 0);
    const calculateTotalAmount = () => items.reduce((acc, item) => acc + item.amount, 0);

    const finalTotal = calculateTotalAmount() + (roundOff ? roundOffValue : 0);

    return (
        <MainLayout>
            <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-gray-50/50">
                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">Purchase Order</h1>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-gray-500">
                            <Calculator className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* hide scrollbar */}
                <div className="flex-1 overflow-auto no-scrollbar">
                    <div className="mx-auto bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px] flex flex-col">

                        {/* Top Form Section */}
                        <div className="p-6 flex justify-between">
                            {/* Left Side - Party */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <div className="flex items-center">
                                        <Label className="text-blue-500 text-sm font-medium">Party</Label>
                                        <span className="text-red-500 ml-0.5">*</span>
                                    </div>
                                    <Popover open={openParty} onOpenChange={setOpenParty}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="select"
                                                role="combobox"
                                                aria-expanded={openParty}
                                                className="w-full sm:w-[300px] justify-between border-blue-400 text-left font-normal"
                                            >
                                                {partyValue
                                                    ? parties.find((party) => party.value === partyValue)?.label
                                                    : "Select Party"}
                                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search party..." />
                                                <CommandList>
                                                    <CommandEmpty>No party found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {parties.map((party) => (
                                                            <CommandItem
                                                                key={party.value}
                                                                value={party.value}
                                                                onSelect={(currentValue) => {
                                                                    setPartyValue(currentValue === partyValue ? "" : currentValue)
                                                                    setOpenParty(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        partyValue === party.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {party.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            {/* Right Side - Invoice Details */}
                            <div className="grid grid-cols-[100px_1fr] gap-y-4 gap-x-4 items-center">
                                <Label className="text-gray-500 text-right text-sm">Order No.</Label>
                                <Input
                                    className="h-8 max-w-[150px] border-gray-200"
                                    value={orderNo}
                                    onChange={(e) => setOrderNo(e.target.value)}
                                />

                                <Label className="text-gray-500 text-right text-sm">Order Date</Label>
                                <div className="relative max-w-[150px]">
                                    <Input
                                        type="date"
                                        className="h-8 border-gray-200"
                                        value={orderDate}
                                        onChange={(e) => setOrderDate(e.target.value)}
                                    />
                                </div>

                                <Label className="text-gray-500 text-right text-sm">Due Date</Label>
                                <div className="relative max-w-[150px]">
                                    <Input
                                        type="date"
                                        className="h-8 border-gray-200"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
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
                                        <th className="px-4 py-3 text-left w-[30%]">ITEM</th>
                                        <th className="px-4 py-3 text-left w-[100px]">QTY</th>
                                        <th className="px-4 py-3 text-left w-[100px]">UNIT</th>
                                        <th className="px-4 py-3 text-left w-[180px]">
                                            <div className="flex flex-col">
                                                <span>PRICE/UNIT</span>
                                                <select className="text-[10px] text-gray-500 bg-transparent border-none p-0 focus:ring-0">
                                                    <option>Without Tax</option>
                                                    <option>With Tax</option>
                                                </select>
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-left w-[180px]">
                                            <div className="flex justify-between items-center">
                                                <span>TAX</span>
                                                <span className="text-[10px] text-gray-400 font-normal">AMOUNT</span>
                                            </div>
                                        </th>
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
                                                    placeholder=""
                                                    value={item.item}
                                                    onChange={(e) => updateItem(item.id, 'item', e.target.value)}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <Input
                                                    type="number"
                                                    className="h-9 border-gray-200 focus:border-blue-500 bg-gray-50/50 text-right"
                                                    value={item.qty || ''}
                                                    onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <Select value={item.unit} onValueChange={(val) => updateItem(item.id, 'unit', val)}>
                                                    <SelectTrigger className="h-9 border-gray-200 bg-gray-50/50">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="NONE">NONE</SelectItem>
                                                        <SelectItem value="PCS">PCS</SelectItem>
                                                        <SelectItem value="KG">KG</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                            <td className="px-4 py-2">
                                                <Input
                                                    type="number"
                                                    className="h-9 border-gray-200 focus:border-blue-500 bg-gray-50/50 text-right"
                                                    value={item.price || ''}
                                                    onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="grid grid-cols-[1fr_80px] gap-2 items-center">
                                                    <Select
                                                        value={item.taxPercent.toString()}
                                                        onValueChange={(val) => updateItem(item.id, 'taxPercent', Number(val))}
                                                    >
                                                        <SelectTrigger className="h-9 border-gray-200 bg-gray-50/50">
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="0">0%</SelectItem>
                                                            <SelectItem value="5">5%</SelectItem>
                                                            <SelectItem value="12">12%</SelectItem>
                                                            <SelectItem value="18">18%</SelectItem>
                                                            <SelectItem value="28">28%</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <span className="text-right text-gray-500 text-sm">
                                                        {item.taxAmount > 0 ? item.taxAmount.toFixed(2) : ''}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-right font-medium">
                                                {item.amount > 0 ? item.amount.toFixed(2) : ''}
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
                                        <td className="px-4 py-3 text-center text-gray-500">
                                            TOTAL
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {calculateTotalQty()}
                                        </td>
                                        <td colSpan={2}></td>
                                        <td className="px-4 py-3 text-right text-gray-900">
                                            {items.reduce((acc, item) => acc + item.taxAmount, 0).toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-900">
                                            {calculateTotalAmount().toFixed(2)}
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
                                            <Label className="text-xs text-gray-500 absolute -top-2 left-2 bg-white px-1">Payment Type</Label>
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
                                    <div className="pt-8">
                                        <p className="text-gray-400 text-sm">Description</p>
                                        <div className="border-b border-gray-300 w-full h-8"></div>
                                    </div>
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
                                            <Label htmlFor="roundOff" className="text-sm font-normal text-gray-600">Round Off</Label>
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
                <div className="bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end gap-0">
                    <div className="flex bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden divide-x divide-gray-200">
                        <Button
                            variant="ghost"
                            className="h-10 px-4 gap-2 text-blue-600 hover:bg-blue-50 font-medium rounded-none"
                            onClick={() => alert('Share clicked')}
                        >
                            Share <ChevronDown className="w-4 h-4" />
                        </Button>
                        <Button
                            className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-none"
                            onClick={() => alert('Save clicked')}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
