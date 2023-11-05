import { Select, Table, Tooltip } from "antd";
import AdminLayout from "../../../components/Layout/AdminLayout";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useEffect, useState } from "react";
import { formatDateTime, formatVND } from "../../../constant";
import Link from "next/link";
import moment from "moment";

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
  const [sortDateSelected, setSortDateSelected] = useState({
    month: (moment().month() + 1).toString().padStart(2, "0"),
    year: moment().year(),
  });

  const optionsMonth = [];
  for (let i = 1; i <= 12; i++) {
    optionsMonth.push({
      value: i.toString().padStart(2, "0"),
      label: "Tháng " + i,
    });
  }

  const optionsYear = [
    {
      value: moment().year() - 1,
      label: "Năm " + (moment().year() - 1),
    },
    {
      value: moment().year(),
      label: "Năm " + moment().year(),
    },
    {
      value: moment().year() + 1,
      label: "Năm " + (moment().year() + 1),
    },
  ];

  const handleChangeSortMonth = (value) => {
    setSortDateSelected({
      ...sortDateSelected,
      month: value,
    });
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "expense"));
      const dataTmp = querySnapshot.docs.map((doc) => doc.data());
      dataTmp.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      console.log("🚀 ~ file: index.js:79 ~ dataTmp.sort ~ dataTmp:", dataTmp)
      setData(
        dataTmp.filter((item) => {
          const [year, month] = item?.timestamp.split("-");
          return (
            year == sortDateSelected.year && month == sortDateSelected.month
          );
        })
      );
    } catch (error) {
      console.error("Lỗi khi tải danh sách giao dịch:", error);
    }
  };

  useEffect(() => {
    // Fetch data
    fetchData(sortDateSelected);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortDateSelected]);

  return (
    <AdminLayout>
      <div class="py-4 flex justify-between">
        <Link
          href="/admin/thu-chi-quan/nhap"
          className="p-2 bg-green-600 rounded-md text-white hover:text-white"
        >
          Nhập chi
        </Link>
        <div className="flex gap-2">
          <Select
            // size={size}
            defaultValue={(moment().month() + 1).toString().padStart(2, "0")}
            onChange={handleChangeSortMonth}
            style={{
              width: 100,
            }}
            options={optionsMonth}
          />
          <Select
            // size={size}
            defaultValue={moment().year()}
            onChange={(value) =>
              setSortDateSelected({ ...sortDateSelected, year: value })
            }
            style={{
              width: 150,
            }}
            options={optionsYear}
          />
        </div>
      </div>
      <Table columns={column} dataSource={data} size="middle" pagination={{ pageSize: 31 }} />
    </AdminLayout>
  );
}

export default ThuChiQuan;
