import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import Link from "next/link";
import AdminLayout from "../../components/Layout/AdminLayout";

export default function NhapThuChi() {
  const [shift, setShift] = useState("Ca 1");
  const [startAmount, setStartAmount] = useState("");
  const [endAmount, setEndAmount] = useState("");
  const [revenue, setRevenue] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [expenditure, setExpenditure] = useState("");
  const [expenditureContent, setExpenditureContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const transactionData = {
        shift,
        startAmount: parseFloat(startAmount),
        endAmount: parseFloat(endAmount),
        revenue: parseFloat(revenue),
        transferAmount: parseFloat(transferAmount),
        cashAmount: parseFloat(cashAmount),
        expenditure: parseFloat(expenditure),
        expenditureContent,
        timestamp: selectedDate,
      };

      const transactionsCollection = collection(firestore, "transactions");
      await addDoc(transactionsCollection, transactionData);

      // Reset form fields
      setShift("Ca 1");
      setStartAmount("");
      setEndAmount("");
      setRevenue("");
      setTransferAmount("");
      setCashAmount("");
      setExpenditure("");
      setExpenditureContent("");

      alert("Dữ liệu đã được lưu thành công vào Firestore.");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu vào Firestore:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center">
        <div className="bg-white rounded shadow-md w-96 p-8">
          <h2 className="text-xl font-semibold mb-4">Nhập Thu Chi</h2>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4">
              <label className="block font-medium">Ngày</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Ca</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Ca 1">Ca 1</option>
                <option value="Ca 2">Ca 2</option>
                <option value="Ca 3">Ca 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Số tiền đầu ca</label>
              <input
                type="number"
                value={startAmount}
                onChange={(e) => setStartAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Số tiền cuối ca</label>
              <input
                type="number"
                value={endAmount}
                onChange={(e) => setEndAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Doanh thu trên máy</label>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">
                Số tiền khách hàng chuyển khoản
              </label>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Số tiền mặt trong két</label>
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Số tiền đã chi</label>
              <input
                type="number"
                value={expenditure}
                onChange={(e) => setExpenditure(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {expenditure && (
              <div className="mb-4">
                <label className="block font-medium">Nội dung đã chi</label>
                <input
                  type="text"
                  value={expenditureContent}
                  onChange={(e) => setExpenditureContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}
            <div className="mb-4 flex justify-between items-center">
              <Link
                href="/admin/thu-chi"
                className="text-red-600 border-b-2 border-red-600"
              >
                Quay lại
              </Link>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                type="submit"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
