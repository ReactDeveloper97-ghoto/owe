import { useState, useEffect, useRef } from 'react';
import { DollarSign, CheckCircle, Clock, TrendingUp, Download, Receipt, CreditCard, AlertCircle, Printer, FileText } from 'lucide-react';
import { useParentStore } from '../../store/parentStore';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Fees = () => {
  const { getSelectedStudent } = useParentStore();
  const selectedStudent = getSelectedStudent();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    if (!selectedStudent) return;

    const fees = selectedStudent.fees || [];
    const monthlyFee = selectedStudent.monthly_fee || 30000;

    // Generate monthly fee structure for last 6 months
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = date.toISOString().slice(0, 7); // YYYY-MM
      const payment = fees.find(f => f.month === month);

      months.push({
        month,
        monthName: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        dueDate: new Date(date.getFullYear(), date.getMonth(), 5).toISOString().slice(0, 10),
        amountDue: monthlyFee,
        amountPaid: payment?.amount_paid || 0,
        status: payment?.amount_paid >= monthlyFee ? 'paid' :
          payment?.amount_paid > 0 ? 'partial' : 'pending',
        paymentDate: payment ? 'Paid' : 'Not Paid'
      });
    }

    setPaymentHistory(months.sort((a, b) => b.month.localeCompare(a.month)));
  }, [selectedStudent]);

  // Format date to YYYY-MM-DD
  const formatDateToYMD = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Download PDF of fee table
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('Fee Statement', 105, 15, { align: 'center' });

    // Student Info
    doc.setFontSize(10);
    doc.text(`Student: ${selectedStudent.name}`, 14, 25);
    doc.text(`Class: ${selectedStudent.class_name}`, 14, 32);
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 14, 39);

    // Summary
    const totalPaid = selectedStudent.fees.reduce((sum, fee) => sum + fee.amount_paid, 0);
    const totalDue = paymentHistory.reduce((sum, month) => sum + month.amountDue, 0);
    const balance = totalDue - totalPaid;

    doc.setFontSize(11);
    doc.text('Summary', 14, 50);
    doc.setFontSize(10);
    doc.text(`Total Due: PKR ${totalDue.toLocaleString()}`, 14, 58);
    doc.text(`Total Paid: PKR ${totalPaid.toLocaleString()}`, 14, 65);
    doc.text(`Balance: PKR ${balance.toLocaleString()}`, 14, 72);

    // Table data
    const tableData = paymentHistory.map(month => [
      month.monthName,
      month.dueDate,
      `PKR ${month.amountDue.toLocaleString()}`,
      `PKR ${month.amountPaid.toLocaleString()}`,
      `PKR ${(month.amountDue - month.amountPaid).toLocaleString()}`,
      month.status.charAt(0).toUpperCase() + month.status.slice(1)
    ]);

    // Create table
    doc.autoTable({
      startY: 80,
      head: [['Month', 'Due Date', 'Due Amount', 'Paid Amount', 'Balance', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 }
      }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text('Page ' + i + ' of ' + pageCount, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }

    // Save PDF
    doc.save(`Fee_Statement_${selectedStudent.name}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Print fee table
  const printTable = () => {
    const printContent = document.getElementById('fee-table-print').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fee Statement - ${selectedStudent.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #2c3e50; text-align: center; }
          .student-info { margin-bottom: 20px; padding: 10px; background: #f8f9fa; }
          .summary { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 15px; background: #e8f4fc; }
          .summary-item { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #3498db; color: white; padding: 10px; text-align: left; }
          td { padding: 8px; border-bottom: 1px solid #ddd; }
          .paid { color: #27ae60; }
          .partial { color: #f39c12; }
          .pending { color: #e74c3c; }
          @media print {
            .no-print { display: none; }
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <h1>Fee Statement</h1>
        <div class="student-info">
          <p><strong>Student:</strong> ${selectedStudent.name}</p>
          <p><strong>Class:</strong> ${selectedStudent.class_name}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
        </div>
        <div class="summary no-print">
          <div class="summary-item">
            <strong>Total Due</strong><br>
            PKR ${paymentHistory.reduce((sum, month) => sum + month.amountDue, 0).toLocaleString()}
          </div>
          <div class="summary-item">
            <strong>Total Paid</strong><br>
            PKR ${selectedStudent.fees.reduce((sum, fee) => sum + fee.amount_paid, 0).toLocaleString()}
          </div>
          <div class="summary-item">
            <strong>Balance</strong><br>
            PKR ${(paymentHistory.reduce((sum, month) => sum + month.amountDue, 0) - selectedStudent.fees.reduce((sum, fee) => sum + fee.amount_paid, 0)).toLocaleString()}
          </div>
        </div>
        ${printContent}
        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #3498db; color: white; border: none; cursor: pointer; margin-right: 10px;">Print</button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; cursor: pointer;">Close</button>
        </div>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // Download as CSV
  const downloadCSV = () => {
    const csvRows = [];

    // Headers
    const headers = ['Month', 'Due Date', 'Due Amount', 'Paid Amount', 'Balance', 'Status'];
    csvRows.push(headers.join(','));

    // Data
    paymentHistory.forEach(month => {
      const row = [
        month.monthName,
        month.dueDate,
        `PKR ${month.amountDue}`,
        `PKR ${month.amountPaid}`,
        `PKR ${month.amountDue - month.amountPaid}`,
        month.status
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fee_Statement_${selectedStudent.name}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!selectedStudent) {
    return (
      <div className="text-center py-12">
        <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Student</h3>
        <p className="text-gray-500">Please select a student to view fee details</p>
      </div>
    );
  }

  const fees = selectedStudent.fees || [];
  const monthlyFee = selectedStudent.monthly_fee || 30000;
  const totalPaid = fees.reduce((sum, fee) => sum + fee.amount_paid, 0);
  const totalDue = paymentHistory.reduce((sum, month) => sum + month.amountDue, 0);
  const balance = totalDue - totalPaid;
  const paymentPercentage = totalDue > 0 ? Math.round((totalPaid / totalDue) * 100) : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Fee Management</h1>
            <p className="text-gray-600 mt-1">For {selectedStudent.name} • Class {selectedStudent.class_name}</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText size={16} />
              Download PDF
            </button>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Download size={16} />
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">Total Paid</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">PKR {totalPaid.toLocaleString()}</p>
          <p className="text-gray-500">Amount paid to date</p>
          <div className="mt-2 text-sm">
            <span className="font-semibold text-green-600">↑ 12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Monthly Due</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">PKR {monthlyFee.toLocaleString()}</p>
          <p className="text-gray-500">Per month tuition fee</p>
          <div className="mt-2 text-sm">
            <span className="font-semibold text-blue-600">Due on 5th of each month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <span className={`text-sm font-medium ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
              Current Balance
            </span>
          </div>
          <p className={`text-3xl font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
            PKR {balance.toLocaleString()}
          </p>
          <p className="text-gray-500">{balance > 0 ? 'Amount due' : 'All payments cleared'}</p>
          <div className="mt-2 text-sm">
            <span className={`font-semibold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {balance > 0 ? `${paymentPercentage}% paid` : 'Fully paid'}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="bg-white rounded-xl shadow border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Payment Progress</h2>
            <p className="text-gray-600">Overall fee payment status</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">{paymentPercentage}%</p>
            <p className="text-sm text-gray-600">Paid</p>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Payment Progress</span>
            <span>{paymentPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${paymentPercentage >= 100 ? 'bg-green-500' :
                  paymentPercentage >= 75 ? 'bg-blue-500' :
                    paymentPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              style={{ width: `${Math.min(paymentPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>PKR 0</span>
          <span>PKR {totalDue.toLocaleString()}</span>
        </div>
      </div>

      {/* Monthly Fee Breakdown */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Monthly Fee Breakdown</h2>
            <p className="text-gray-600 mt-1">Detailed fee structure for each month</p>
          </div>
          <div className="flex gap-2">

            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download size={14} />
              PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-auto" id="fee-table-print" ref={tableRef}>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Month</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Due Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Due Amount</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Paid Amount</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Balance</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paymentHistory.map((month, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium">{month.monthName}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-700">{month.dueDate}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-800">PKR {month.amountDue.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className={`font-bold ${month.amountPaid > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                      PKR {month.amountPaid.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`font-bold ${month.amountDue - month.amountPaid > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      PKR {(month.amountDue - month.amountPaid).toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(month.status)}`}>
                      {month.status === 'paid' && <CheckCircle className="w-4 h-4 mr-1" />}
                      {month.status === 'partial' && <AlertCircle className="w-4 h-4 mr-1" />}
                      {month.status === 'pending' && <Clock className="w-4 h-4 mr-1" />}
                      {month.status.charAt(0).toUpperCase() + month.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    {month.status !== 'paid' ? (
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <CreditCard size={14} />
                        Pay Now
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Receipt size={14} />
                        Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl shadow border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Recent Payments</h2>
          <p className="text-gray-600 mt-1">Latest fee payment transactions</p>
        </div>

        {fees.length > 0 ? (
          <div className="divide-y">
            {fees.slice().reverse().map((payment, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Fee Payment - {payment.month}</h3>
                    <p className="text-gray-600">Monthly tuition fee payment</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-2xl font-bold text-green-600">PKR {payment.amount_paid.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Paid successfully</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Payment completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-blue-500" />
                    <span>Receipt: INV-{payment.month.replace('-', '')}-{selectedStudent.id.slice(0, 8)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>Paid on: {formatDateToYMD(payment.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Payment History</h3>
            <p className="text-gray-500">Payment records will appear here once payments are made.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fees;