import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Settings, Search, BarChart3, FileSpreadsheet, Printer, MoreVertical, Landmark, Plus, ArrowUpRight, ArrowDownLeft, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast";

interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    accountType: string;
}

const mockBankAccounts: BankAccount[] = [
    {
        id: "1",
        bankName: "HDFC Bank",
        accountNumber: "50100234567890",
        ifscCode: "HDFC0001234",
        accountHolderName: "RAMESH CLOTH STORE",
        accountType: "Current",
    },
    {
        id: "2",
        bankName: "State Bank of India",
        accountNumber: "31234567890",
        ifscCode: "SBIN0005678",
        accountHolderName: "RAMESH KUMAR",
        accountType: "Savings"
    }
];

export default function BankAccounts() {
    const [accounts, setAccounts] = useState<BankAccount[]>(mockBankAccounts);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
    const [accountToDelete, setAccountToDelete] = useState<string | null>(null);

    const [newAccount, setNewAccount] = useState({
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
        accountType: "Current"
    });

    const resetForm = () => {
        setNewAccount({
            bankName: "",
            accountNumber: "",
            ifscCode: "",
            accountHolderName: "",
            accountType: "Current"
        });
        setEditingAccount(null);
    };

    const handleEdit = (account: BankAccount) => {
        setEditingAccount(account);
        setNewAccount({
            bankName: account.bankName,
            accountNumber: account.accountNumber,
            ifscCode: account.ifscCode,
            accountHolderName: account.accountHolderName,
            accountType: account.accountType
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setAccounts(accounts.filter(acc => acc.id !== id));
        setAccountToDelete(null);
        toast({
            title: "Account Deleted",
            description: "The bank account has been removed successfully.",
        });
    };

    const handleSubmit = () => {
        if (!newAccount.bankName || !newAccount.accountNumber) return;

        if (editingAccount) {
            setAccounts(accounts.map(acc =>
                acc.id === editingAccount.id ? { ...acc, ...newAccount } : acc
            ));
            toast({
                title: "Account Updated",
                description: "The bank account details have been updated.",
            });
        } else {
            const account: BankAccount = {
                id: Math.random().toString(36).substr(2, 9),
                bankName: newAccount.bankName,
                accountNumber: newAccount.accountNumber,
                ifscCode: newAccount.ifscCode,
                accountHolderName: newAccount.accountHolderName,
                accountType: newAccount.accountType,
            };
            setAccounts([...accounts, account]);
            toast({
                title: "Account Added",
                description: "New bank account has been added successfully.",
            });
        }

        setIsDialogOpen(false);
        resetForm();
    };

    return (
        <MainLayout>
            <div className="flex flex-col h-full bg-gray-50/50">
                {/* HEADER */}
                <div className="mb-4 bg-white flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">Bank Accounts</h1>
                    <div className="flex items-center gap-2">
                        <Dialog open={isDialogOpen} onOpenChange={(open) => {
                            setIsDialogOpen(open);
                            if (!open) resetForm();
                        }}>
                            <DialogTrigger asChild>
                                <Button className="bg-[#0D66F3] hover:bg-[#0D66F8] text-white font-medium px-5 py-2 rounded-full shadow-sm">
                                    <Plus className="w-4 h-4 mr-1" /> Add Bank Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold">
                                        {editingAccount ? "Edit Bank Account" : "Add Bank Account"}
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 mt-2">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Account Holder Name (User Name) *</Label>
                                        <Input
                                            value={newAccount.accountHolderName}
                                            onChange={(e) => setNewAccount({ ...newAccount, accountHolderName: e.target.value })}
                                            placeholder="Enter holder name"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Bank Name *</Label>
                                        <Input
                                            value={newAccount.bankName}
                                            onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                                            placeholder="Enter bank name"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Account Number *</Label>
                                        <Input
                                            value={newAccount.accountNumber}
                                            onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                                            placeholder="Enter account number"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">IFSC Code</Label>
                                        <Input
                                            value={newAccount.ifscCode}
                                            onChange={(e) => setNewAccount({ ...newAccount, ifscCode: e.target.value.toUpperCase() })}
                                            placeholder="HDFC0001234"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Account Type</Label>
                                        <Select value={newAccount.accountType} onValueChange={(v) => setNewAccount({ ...newAccount, accountType: v })}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Savings">Savings</SelectItem>
                                                <SelectItem value="Current">Current</SelectItem>
                                                <SelectItem value="Fixed Deposit">Fixed Deposit</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button onClick={handleSubmit} className="w-full bg-[#0D66F3] hover:bg-[#0D66F8] text-white">
                                        {editingAccount ? "Update Account" : "Save Account"}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                            <Settings className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto scrollbar-hidden">

                    <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-0">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Account List</h3>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><Search className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><FileSpreadsheet className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><Printer className="w-4 h-4" /></Button>
                                </div>
                            </div>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="text-left font-medium text-gray-500 py-3 px-4">Bank Name</th>
                                        <th className="text-left font-medium text-gray-500 py-3 px-4">Account Holder</th>
                                        <th className="text-left font-medium text-gray-500 py-3 px-4">Account Number</th>
                                        <th className="text-left font-medium text-gray-500 py-3 px-4">IFSC Code</th>
                                        <th className="text-left font-medium text-gray-500 py-3 px-4">Type</th>
                                        <th className="w-[50px] py-3 px-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map((account) => (
                                        <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="font-medium text-gray-900">{account.bankName}</div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{account.accountHolderName}</td>
                                            <td className="py-3 px-4 text-gray-600">{account.accountNumber}</td>
                                            <td className="py-3 px-4 text-gray-600 font-mono text-xs">{account.ifscCode}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${account.accountType === 'Current' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                                    }`}>
                                                    {account.accountType}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleEdit(account)} className="cursor-pointer">
                                                            <Pencil className="w-4 h-4 mr-2" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => setAccountToDelete(account.id)}
                                                            className="cursor-pointer text-red-600 focus:text-red-600"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {accounts.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 bg-white">
                                    <Landmark className="w-16 h-16 text-gray-200 mb-4" />
                                    <p className="font-semibold text-gray-800">No bank accounts found</p>
                                    <p className="text-sm text-gray-400 mt-1 mb-5">Add your bank account to start managing payments.</p>
                                    <Button onClick={() => setIsDialogOpen(true)} className="bg-[#0D66F3] hover:bg-[#0D66F8] text-white rounded-full">
                                        <Plus className="w-4 h-4 mr-1" /> Add Bank Account
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation */}
            <AlertDialog open={!!accountToDelete} onOpenChange={() => setAccountToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the bank account
                            and remove all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => accountToDelete && handleDelete(accountToDelete)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </MainLayout>
    );
}
