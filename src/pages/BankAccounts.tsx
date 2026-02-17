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

import { useBankAccounts, useAddBankAccount, useDeleteBankAccount, BankAccount } from "@/hooks/useBankAccounts";

export default function BankAccounts() {
    const { data: accounts = [], isLoading } = useBankAccounts();
    const addAccount = useAddBankAccount();
    const deleteAccount = useDeleteBankAccount();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
    const [accountToDelete, setAccountToDelete] = useState<string | null>(null);

    const [newAccount, setNewAccount] = useState({
        account_name: "",
        bank_name: "",
        account_number: "",
        ifsc_code: "",
        account_type: "Current",
        opening_balance: 0,
        current_balance: 0,
    });

    const resetForm = () => {
        setNewAccount({
            account_name: "",
            bank_name: "",
            account_number: "",
            ifsc_code: "",
            account_type: "Current",
            opening_balance: 0,
            current_balance: 0,
        });
        setEditingAccount(null);
    };

    const handleEdit = (account: BankAccount) => {
        setEditingAccount(account);
        setNewAccount({
            account_name: account.account_name,
            bank_name: account.bank_name || "",
            account_number: account.account_number || "",
            ifsc_code: account.ifsc_code || "",
            account_type: account.account_type || "Current",
            opening_balance: account.opening_balance || 0,
            current_balance: account.current_balance || 0,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteAccount.mutateAsync(id);
        setAccountToDelete(null);
    };

    const handleSubmit = async () => {
        if (!newAccount.bank_name || !newAccount.account_number) return;

        if (editingAccount) {
            // Update logic would go here, currently using mutation for add
            // For now, let's just use the addAccount mutation logic if needed or toast
            toast({
                title: "Coming Soon",
                description: "Update functionality is being integrated.",
            });
        } else {
            await addAccount.mutateAsync(newAccount);
        }

        setIsDialogOpen(false);
        resetForm();
    };

    return (
        <MainLayout>
            <div className="flex flex-col h-full bg-gray-50/50">
                {/* HEADER */}
                <div className="px-2 mb-4 bg-white flex items-center justify-between">
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
                                            value={newAccount.account_name}
                                            onChange={(e) => setNewAccount({ ...newAccount, account_name: e.target.value })}
                                            placeholder="Enter holder name"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Bank Name *</Label>
                                        <Input
                                            value={newAccount.bank_name}
                                            onChange={(e) => setNewAccount({ ...newAccount, bank_name: e.target.value })}
                                            placeholder="Enter bank name"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Account Number *</Label>
                                        <Input
                                            value={newAccount.account_number}
                                            onChange={(e) => setNewAccount({ ...newAccount, account_number: e.target.value })}
                                            placeholder="Enter account number"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">IFSC Code</Label>
                                        <Input
                                            value={newAccount.ifsc_code}
                                            onChange={(e) => setNewAccount({ ...newAccount, ifsc_code: e.target.value.toUpperCase() })}
                                            placeholder="HDFC0001234"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Account Type</Label>
                                        <Select value={newAccount.account_type} onValueChange={(v) => setNewAccount({ ...newAccount, account_type: v })}>
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
                                                <div className="font-medium text-gray-900">{account.bank_name}</div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{account.account_name}</td>
                                            <td className="py-3 px-4 text-gray-600">{account.account_number}</td>
                                            <td className="py-3 px-4 text-gray-600 font-mono text-xs">{account.ifsc_code}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${account.account_type === 'Current' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                                    }`}>
                                                    {account.account_type}
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
