import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminLayout from "../../../components/Layout/AdminLayout";

export default function CreateEmployee() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Phục vụ"); // Mặc định là 'Phục vụ'
  const [state, setState] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Thêm state cho thông báo

  const router = useRouter(); // Sử dụng router của Next.js

  const handleCreateAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;

      // Add employee info to Firestore
      const employeeData = {
        fullName,
        phoneNumber,
        username: user.email,
        password: password,
        role: selectedRole,
        state: state,
      };
      await addDoc(collection(firestore, "employees"), employeeData);

      setSuccessMessage("Tạo tài khoản thành công!");
      setError("");

      setTimeout(() => {
        setSuccessMessage("");
        router.push("/admin/nhan-vien"); // Điều hướng sau khi tạo thành công
      }, 3000); // Hiển thị thông báo thành công trong 3 giây trước khi điều hướng
    } catch (error) {
      setError("Lỗi: " + error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">
            Tạo tài khoản nhân viên mới
          </h2>
          <div className="mb-4">
            <Link
              href="/admin/nhan-vien"
              className="p-2 bg-blue-400 rounded-md text-white"
            >
              Quay lại trang quản lý nhân viên
            </Link>
          </div>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="email"
            placeholder="Tài khoản (email)"
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="Phục vụ">Phục vụ</option>
            <option value="Pha chế">Pha chế</option>
            <option value="Bếp">Bếp</option>
            <option value="Thu ngân">Thu ngân</option>
            <option value="Admin">Admin</option>
          </select>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            onClick={handleCreateAccount}
          >
            Tạo tài khoản
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
