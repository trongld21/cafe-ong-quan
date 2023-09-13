import { Table, Tooltip } from "antd";
import AdminLayout from "../../components/Layout/AdminLayout";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";
import { formatDateTime, formatVND } from "../../constant";

const column = [
  {
    title: "Ngày",
    dataIndex: "timestamp",
    render: (timestamp) => <p>{formatDateTime(timestamp)}</p>,
  },
  {
    title: "Số tiền chi",
    dataIndex: "expense",
    render: (expense) => <p>{formatVND(expense)}</p>,
  },
  {
    title: "Nội dung chi",
    dataIndex: "content",
    ellipsis: {
      showTitle: false,
    },
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
];

function ThuChiQuan() {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "expense"));
      const dataTmp = querySnapshot.docs.map((doc) => doc.data());
      dataTmp.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setData(dataTmp);
    } catch (error) {
      console.error("Lỗi khi tải danh sách giao dịch:", error);
    }
  };
  useEffect(() => {
    // Fetch data
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <Table columns={column} dataSource={data} size="middle" />
    </AdminLayout>
  );
}

export default ThuChiQuan;
