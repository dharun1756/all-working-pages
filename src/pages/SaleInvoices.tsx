import { TransactionPage } from "@/components/shared/TransactionPage";

export default function SaleInvoices() {
  return (
    <TransactionPage
      title="Sale Invoices"
      addButtonText="Add Sale"
      summaryTitle="Total Sales Amount"
      summaryAmount="₹ 0"
      summarySubtitle="Received: ₹ 0 | Balance: ₹ 0"
      columns={[
        { key: "date", label: "Date" },
        { key: "invoiceNo", label: "Invoice no" },
        { key: "partyName", label: "Party Name" },
        { key: "transaction", label: "Transaction" },
        { key: "paymentType", label: "Payment Type" },
        { key: "amount", label: "Amount" },
        { key: "balance", label: "Balance" },
        { key: "dueDate", label: "Due date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
