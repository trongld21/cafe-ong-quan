import React from 'react';

const ChiTietCa = ({ transactions, selectedDate, selectedShift }) => {
  // Lọc các giao dịch của ca và ngày tương ứng
  const shiftTransactions = transactions.filter(
    (transaction) =>
      transaction.timestamp.startsWith(selectedDate) &&
      transaction.shift === selectedShift
  );

  // Tính tổng số tiền
  const shiftTotal = shiftTransactions.reduce(
    (total, transaction) =>
      total + (transaction.cashAmount || 0) + (transaction.transferAmount || 0),
    0
  );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Chi tiết ca {selectedShift} ngày {selectedDate}
      </h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Thời gian</th>
            <th className="py-2 px-4">Doanh thu</th>
            <th className="py-2 px-4">Tiền chuyển khoản</th>
            <th className="py-2 px-4">Tiền mặt</th>
          </tr>
        </thead>
        <tbody>
          {shiftTransactions.map((transaction, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{transaction.timestamp}</td>
              <td className="py-2 px-4">{transaction.revenue}</td>
              <td className="py-2 px-4">{transaction.transferAmount}</td>
              <td className="py-2 px-4">{transaction.cashAmount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-300">
            <td className="py-2 px-4 font-semibold">Tổng cộng</td>
            <td className="py-2 px-4 font-semibold">{shiftTotal}</td>
            <td className="py-2 px-4 font-semibold">
              {shiftTransactions.reduce(
                (total, transaction) =>
                  total + (transaction.transferAmount || 0),
                0
              )}
            </td>
            <td className="py-2 px-4 font-semibold">
              {shiftTransactions.reduce(
                (total, transaction) => total + (transaction.cashAmount || 0),
                0
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ChiTietCa;
