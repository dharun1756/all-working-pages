import { TransactionPage } from "@/components/shared/TransactionPage";

export default function Estimates() {
  return (
    <TransactionPage
      title="Estimate/Quotation"
      addButtonText="Add Estimate"
      summaryTitle="Total Quotations"
      summaryAmount="₹ 0.00"
      summarySubtitle="Converted: ₹ 0.00 | Open: ₹ 0.00"
      columns={[
        { key: "date", label: "Date" },
        { key: "referenceNo", label: "Reference no" },
        { key: "partyName", label: "Party Name" },
        { key: "amount", label: "Amount" },
        { key: "balance", label: "Balance" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
