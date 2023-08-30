import React from 'react';
import { formatDateTime, formatVND } from '../constant';

const ChiTietCa = ({ transactions, selectedDate, selectedShift }) => {
  // Lọc các giao dịch của ca và ngày tương ứng
  const shiftTransactions = transactions.filter(
    (transaction) =>
      transaction.timestamp.startsWith(selectedDate) &&
      transaction.shift === selectedShift
  );

  // Tính tổng số tiền chuyển khoản
  const transferTotal = shiftTransactions.reduce(
    (total, transaction) => total + (transaction.transferAmount || 0),
    0
  );

  // Tính tổng số tiền mặt
  const cashTotal = shiftTransactions.reduce(
    (total, transaction) => total + (transaction.cashAmount || 0),
    0
  );

  // Tính tổng số tiền chi
  const expenseTotal = shiftTransactions.reduce(
    (total, transaction) => total + (transaction.expenseAmount || 0),
    0
  );

  // Tính tổng số tiền
  const shiftTotal = transferTotal + cashTotal + expenseTotal;

  return (
    <div className="rounded-lg p-16 bg-white w-full h-full">
      <h1 className="text-xl font-semibold mb-4">
        Chi tiết ca {selectedShift} ngày {formatDateTime(selectedDate)}
      </h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-center">Thời gian</th>
            <th className="py-2 px-4 text-center">Doanh thu</th>
            <th className="py-2 px-4 text-center">Tiền chuyển khoản</th>
            <th className="py-2 px-4 text-center">Tiền mặt</th>
            <th className="py-2 px-4 text-center">Tiền chi</th>
          </tr>
        </thead>
        <tbody>
          {shiftTransactions.map((transaction, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 text-center">{formatDateTime(transaction.timestamp)}</td>
              <td className="py-2 px-4 text-center">{formatVND(transaction.revenue)}</td>
              <td className="py-2 px-4 text-center">{formatVND(transaction.transferAmount)}</td>
              <td className="py-2 px-4 text-center">{formatVND(transaction.cashAmount)}</td>
              <td className="py-2 px-4 text-center">{formatVND(transaction.expenditure)}</td>
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          <tr className="bg-gray-200">
            <td className="py-2 px-4 text-center font-semibold">Tổng cộng</td>
            <td className="py-2 px-4 text-center font-semibold">{formatVND(shiftTotal)}</td>
            <td className="py-2 px-4 text-center font-semibold">{formatVND(transferTotal)}</td>
            <td className="py-2 px-4 text-center font-semibold">{formatVND(cashTotal)}</td>
            <td className="py-2 px-4 text-center font-semibold">{formatVND(expenseTotal)}</td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default ChiTietCa;
