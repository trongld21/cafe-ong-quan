import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase"; // Đảm bảo đúng đường dẫn
import Link from "next/link";
import AdminLayout from "../../../components/Layout/AdminLayout";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "employees"));
        const employeeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(employeeList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDisableAccount = async (employeeId) => {
    try {
      const employeeRef = doc(firestore, "employees", employeeId);
      await updateDoc(employeeRef, { disabled: true }); // Vô hiệu hoá tài khoản
      // Tải lại danh sách nhân viên sau khi cập nhật
      fetchEmployees();
    } catch (error) {
      console.error("Error disabling account:", error);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-semibold mb-4">Danh sách nhân viên: </h1>
      <div className="mb-4">
        <Link
          href="/admin/nhan-vien/tao-tai-khoan"
          className="p-2 bg-blue-400 rounded-md text-white"
        >
          Thêm nhân viên
        </Link>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Họ và tên</th>
            <th className="py-2 px-4">Vai trò</th>
            <th className="py-2 px-4">Số điện thoại</th>
            <th className="py-2 px-4">Tài khoản</th>
            <th className="py-2 px-4">Mật khẩu</th>
            <th className="py-2 px-4">Trạng thái</th>
            <th className="py-2 px-4">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="py-2 px-4">{employee.fullName}</td>
              <td className="py-2 px-4">{employee.role}</td>
              <td className="py-2 px-4">{employee.phoneNumber}</td>
              <td className="py-2 px-4">{employee.username}</td>
              <td className="py-2 px-4">{employee.password}</td>
              <td className="py-2 px-4">
                {employee.disabled ? "Disabled" : "Active"}
              </td>
              <td className="py-2 px-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                  onClick={() => handleDisableAccount(employee.id)}
                >
                  {employee.disabled
                    ? "Kích hoạt tài khoản"
                    : "Vô hiệu hoá tài khoản"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default EmployeeList;
