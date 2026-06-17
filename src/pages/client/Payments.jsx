import { CreditCard, IndianRupee, Download, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Payments() {
  const { appointments, currentUser } = useApp();

  const clientEmail = currentUser?.email || '';
  const clientApts = appointments.filter((apt) => apt.clientEmail === clientEmail);
  
  // Total Spent (non cancelled)
  const totalSpent = clientApts.reduce(
    (acc, apt) => (apt.status !== 'Cancelled' ? acc + (apt.price || 1500) : acc),
    0
  );

  const handleDownloadReceipt = (apt, txId) => {
    const receiptText = `==================================================
            VANSHIKA COUNSELLING STUDIO           
==================================================
           OFFICIAL PAYMENT RECEIPT & INVOICE     
==================================================

Receipt Number:   ` + txId + `
Date Issued:      ` + new Date().toISOString().split('T')[0] + `
Transaction ID:   ` + txId + `
Status:           PAID (Razorpay Secure Checkout)

--------------------------------------------------
CLIENT DETAILS
--------------------------------------------------
Name:             ` + (currentUser?.name || 'Client User') + `
Email:            ` + (currentUser?.email || 'client@example.com') + `

--------------------------------------------------
SESSION & BOOKING DETAILS
--------------------------------------------------
Service:          ` + apt.service + `
Consultation Date: ` + apt.date + `
Consultation Time: ` + apt.time + `
Counsellor:       Vanshika Singh

--------------------------------------------------
BILLING & FINANCIALS
--------------------------------------------------
Amount:           INR ` + (apt.price || 1500) + `.00
Tax / GST:        INR 0.00 (Included)
--------------------------------------------------
Total Paid:       INR ` + (apt.price || 1500) + `.00
==================================================
Thank you for prioritizing your mental wellness.
For questions, contact: contact@vanshikastudio.com
==================================================`;

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'receipt_' + txId + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Payments & Receipts
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Access order logs, receipts, and payment statements.
        </p>
      </div>

      {/* KPI payment card */}
      <div className="premium-card p-6 md:p-8 bg-gradient-to-br from-sage-50 to-beige-50 dark:from-sage-950/20 dark:to-sage-900/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-l-4 border-l-sage-600">
        <div className="space-y-2">
          <span className="text-xs text-slate-950 dark:text-beige-300 uppercase tracking-wider font-bold block">Account Balance & Spend</span>
          <h2 className="font-serif text-3xl font-bold text-slate-950 dark:text-white">
            ₹{totalSpent} <span className="text-xs font-sans text-slate-950 dark:text-beige-300 font-bold">INR Total Settled</span>
          </h2>
          <p className="text-xs text-slate-950 dark:text-beige-100 font-bold">
            All payments are processed securely in compliance with PCI-DSS guidelines.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="p-3 bg-white dark:bg-sage-900 border border-beige-200/50 dark:border-sage-850/50 rounded-xl text-xs font-semibold text-stone-600 dark:text-sage-350 shadow-sm flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>Razorpay Wallet Connected</span>
          </div>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="premium-card overflow-hidden">
        <div className="p-5 border-b border-beige-100 dark:border-sage-800/40">
          <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">
            Payment Log & Transactions
          </h3>
        </div>

        {clientApts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-beige-100 dark:bg-sage-900/40 border-b border-beige-100 dark:border-sage-800/30 text-[10px] font-bold uppercase text-slate-950 dark:text-sage-500 tracking-wider">
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-6">Service</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-100 dark:divide-sage-900/40 text-xs text-stone-700 dark:text-sage-350">
                {clientApts.map((apt, i) => {
                  const txId = apt.notes && apt.notes.indexOf('Razorpay Payment ID: ') === 0
                    ? apt.notes.replace('Razorpay Payment ID: ', '')
                    : 'TXN-' + (apt.id.split('-')[1] || i) + '4823';
                  const isPaid = apt.status !== 'Cancelled';
                  return (
                    <tr key={apt.id} className="hover:bg-beige-50/20 dark:hover:bg-sage-900/10 transition-colors">
                      <td className="py-4.5 px-6 font-mono text-slate-950 dark:text-beige-300 font-bold">
                        {txId}
                      </td>
                      <td className="py-4.5 px-6 font-serif font-bold text-slate-950 dark:text-white">
                        {apt.service}
                      </td>
                      <td className="py-4.5 px-6 font-bold">
                        {apt.date}
                      </td>
                      <td className="py-4.5 px-6 font-bold text-slate-950 dark:text-white">
                        ₹{apt.price || 1500}
                      </td>
                      <td className="py-4.5 px-6">
                        {isPaid ? (
                          <span className="px-2.5 py-1 text-[9px] font-bold rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 uppercase tracking-wide">
                            Paid
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 text-[9px] font-bold rounded bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 uppercase tracking-wide">
                            Refunded
                          </span>
                        )}
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        {isPaid ? (
                          <button
                            onClick={() => handleDownloadReceipt(apt, txId)}
                            className="p-1.5 text-stone-400 hover:text-sage-600 hover:bg-beige-50 dark:hover:bg-sage-900 rounded-lg transition-colors inline-flex"
                            title="Download Receipt"
                          >
                            <Download className="h-4.5 w-4.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-950 dark:text-beige-300 font-bold">No receipt</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-950 dark:text-beige-300 font-bold">
            No payments recorded.
          </div>
        )}
      </div>

    </div>
  );
}
