import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import Link from 'next/link';
import { format } from 'date-fns';
import ChiTietCa from '../../../components/ChiTietCa';

export default function QuanLyThuChi() {
  const [transactions, setTransactions] = useState([]);
  const [selectedShift, setSelectedShift] = useState('Ca 1');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'transactions'));
        const transactionList = querySnapshot.docs.map((doc) => doc.data());
        setTransactions(transactionList);
      } catch (error) {
        console.error('Lỗi khi tải danh sách giao dịch:', error);
      }
    };

    fetchTransactions();
  }, []);

  const shifts = ['Ca 1', 'Ca 2', 'Ca 3'];

  const handleShiftClick = (date, shift) => {
    setSelectedDate(date);
    setSelectedShift(shift);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Quản lý Thu Chi</h1>
      <div className="mb-4">
        <Link
          href="/admin/thu-chi/nhap-thu-chi"
          className="p-2 bg-blue-400 rounded-md text-white"
        >
          Nhập thu chi
        </Link>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Ngày</th>
            {shifts.map((shift) => (
              <th
                key={shift}
                className="py-2 px-4 cursor-pointer"
                onClick={() =>
                  handleShiftClick(selectedDate, shift)
                }
              >
                {shift}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Lặp qua các ngày */}
          {transactions.map((transaction) => (
            <tr key={transaction.timestamp}>
              <td className="py-2 px-4">
                {format(new Date(transaction.timestamp), 'dd/MM/yyyy')}
              </td>
              {/* Lặp qua các ca */}
              {shifts.map((shift) => (
                <td
                  key={shift}
                  className="py-2 px-4 cursor-pointer"
                  onClick={() =>
                    handleShiftClick(transaction.timestamp, shift)
                  }
                >
                  {shift}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDate && (
        <ChiTietCa
          transactions={transactions}
          selectedDate={selectedDate}
          selectedShift={selectedShift}
        />
      )}
    </div>
  );
}
