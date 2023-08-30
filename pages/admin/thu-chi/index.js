import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase";
import Link from "next/link";
import { format } from "date-fns";
import ChiTietCa from "../../../components/ChiTietCa";
import { formatDateTime, formatVND } from "../../../constant";

export default function QuanLyThuChi() {
  const [transactions, setTransactions] = useState([]);
  const [selectedShift, setSelectedShift] = useState("Ca 1");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "transactions")
        );
        const transactionList = querySnapshot.docs.map((doc) => doc.data());
        setTransactions(transactionList);
      } catch (error) {
        console.error("Lỗi khi tải danh sách giao dịch:", error);
      }
    };

    fetchTransactions();
  }, []);

  const shifts = ["Ca 1", "Ca 2", "Ca 3"];

  const handleShiftClick = (date, shift) => {
    setSelectedDate(date);
    setSelectedShift(shift);
  };

  // Định nghĩa đối tượng lưu trữ thông tin doanh thu của từng ca
  const shiftRevenues = {};

  // Lặp qua các giao dịch để tính tổng doanh thu của từng ca
  transactions.forEach((transaction) => {
    const timestamp = new Date(transaction.timestamp)
      .toISOString()
      .split("T")[0];
    if (!shiftRevenues[timestamp]) {
      shiftRevenues[timestamp] = {};
    }
    if (!shiftRevenues[timestamp][transaction.shift]) {
      shiftRevenues[timestamp][transaction.shift] = 0;
    }
    shiftRevenues[timestamp][transaction.shift] += transaction.revenue;
  });

  // Định nghĩa đối tượng lưu trữ thông tin tổng doanh thu, tổng chi và thực nhận theo ngày
  const dailyInfo = {};

  // Lặp qua các giao dịch để tính tổng doanh thu, tổng chi và thực nhận theo ngày
  transactions.forEach((transaction) => {
    const timestamp = new Date(transaction.timestamp)
      .toISOString()
      .split("T")[0];
    if (!dailyInfo[timestamp]) {
      dailyInfo[timestamp] = {
        totalRevenue: 0,
        totalExpenditure: 0,
      };
    }
    dailyInfo[timestamp].totalRevenue += transaction.revenue;
    dailyInfo[timestamp].totalExpenditure += transaction.expenditure;
  });

  return (
    <div className="p-16">
      <h1 className="text-xl font-semibold mb-4">Quản lý Thu Chi</h1>
      <div className="mb-4 flex justify-start gap-4 flex-wrap">
        <Link href="/admin" className="p-2 bg-green-400 rounded-md text-white">
          Về trang chủ của admin
        </Link>

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
            <th className="py-2 px-4 text-center">Ngày</th>
            {shifts.map((shift) => (
              <th
                key={shift}
                className="py-2 px-4 cursor-pointer"
                onClick={() => handleShiftClick(selectedDate, shift)}
              >
                {shift}
              </th>
            ))}
            <th>Tổng Doanh Thu</th>
            <th>Tổng Chi</th>
            <th>Thực nhận</th>
          </tr>
        </thead>
        <tbody>
          {/* {Object.keys(shiftRevenues).map((timestamp) => (
            <tr key={timestamp} className="border-b">
              <td className="py-2 px-4 text-center">
                {formatDateTime(new Date(timestamp), "dd/MM/yyyy")}
              </td>
              {shifts.map((shift) => (
                <td
                  key={shift}
                  className="py-2 px-4 cursor-pointer text-center"
                  onClick={() => handleShiftClick(timestamp, shift)}
                >
                  {formatVND(shiftRevenues[timestamp][shift] || 0)}
                </td>
              ))}
             
            </tr>
          ))} */}

          {Object.keys(dailyInfo).map((timestamp) => (
            <tr key={timestamp} className="border-b">
              <td className="py-2 px-4 text-center">
                {formatDateTime(new Date(timestamp), "dd/MM/yyyy")}
              </td>
              {shifts.map((shift) => (
                <td
                  key={shift}
                  className="py-2 px-4 cursor-pointer text-center"
                  onClick={() => handleShiftClick(timestamp, shift)}
                >
                  {formatVND(shiftRevenues[timestamp]?.[shift] || 0)}
                </td>
              ))}
              <td className="py-2 px-4 text-center">{formatVND(dailyInfo[timestamp]?.totalRevenue || 0)}</td>
              <td className="py-2 px-4 text-center">{formatVND(dailyInfo[timestamp]?.totalExpenditure || 0)}</td>
              <td className="py-2 px-4 text-center">
                {formatVND(
                  (dailyInfo[timestamp]?.totalRevenue || 0) -
                    (dailyInfo[timestamp]?.totalExpenditure || 0)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDate && (
        <div className="bg-[rgba(0,0,0,0.75)] p-16 w-screen h-screen fixed top-0 left-0 right-0 bottom-0 ">
          <ChiTietCa
            transactions={transactions}
            selectedDate={selectedDate}
            selectedShift={selectedShift}
          />
          <button
            className="absolute top-8 right-16 text-white"
            onClick={() => {
              setSelectedDate();
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
