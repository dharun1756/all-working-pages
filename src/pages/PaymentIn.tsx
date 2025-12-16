import { TransactionPage } from "@/components/shared/TransactionPage";

export default function PaymentIn() {
  return (
    <TransactionPage
      title="Payment-In"
      addButtonText="Add Payment-In"
      summaryTitle="Total Amount"
      summaryAmount="₹ 0"
      summarySubtitle="Received: ₹ 0"
      columns={[
        { key: "date", label: "Date" },
        { key: "refNo", label: "Ref. no." },
        { key: "partyName", label: "Party Name" },
        { key: "totalAmount", label: "Total Amount" },
        { key: "received", label: "Received" },
        { key: "paymentType", label: "Payment Type" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
