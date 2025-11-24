"use client";
import { useParams } from "next/navigation";
import VendorAuthGuard from "../../../screens/vendorAuth";

const mockTickets = [
  { id: "TCK-3001", subject: "Invoice not received", date: "2025-11-10", status: "Open", description: "I have not received the invoice for my last order." },
  { id: "TCK-3002", subject: "Payment delay", date: "2025-11-12", status: "Closed", description: "Payment for invoice INV-1002 is delayed." },
  { id: "TCK-3003", subject: "Document rejected", date: "2025-11-15", status: "Pending", description: "My bank statement was rejected. Please advise." },
];

export default function TicketDetailPage() {
  const params = useParams();
  const ticket = mockTickets.find(t => t.id === params.ticketId);

  if (!ticket) return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-xl">
          <h1 className="mb-4 text-xl font-semibold text-rose-600">Ticket not found</h1>
        </div>
      </main>
    </VendorAuthGuard>
  );

  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Ticket Details</h1>
          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <div className="mb-2 text-sm text-zinc-700 dark:text-zinc-300"><span className="font-medium">Ticket #:</span> {ticket.id}</div>
            <div className="mb-2 text-sm text-zinc-700 dark:text-zinc-300"><span className="font-medium">Subject:</span> {ticket.subject}</div>
            <div className="mb-2 text-sm text-zinc-700 dark:text-zinc-300"><span className="font-medium">Date:</span> {ticket.date}</div>
            <div className="mb-2 text-sm text-zinc-700 dark:text-zinc-300"><span className="font-medium">Status:</span> {ticket.status}</div>
            <div className="mb-4 text-sm text-zinc-700 dark:text-zinc-300"><span className="font-medium">Description:</span> {ticket.description}</div>
            <button className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Reply</button>
          </div>
        </div>
      </main>
    </VendorAuthGuard>
  );
}
