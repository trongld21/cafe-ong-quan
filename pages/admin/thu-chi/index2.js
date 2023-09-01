import { Button, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { formatDateTime, formatVND } from "../../../constant";
import AdminLayout from "../../../components/Layout/AdminLayout";
import Link from "next/link";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Typography } from "antd";
const { Text } = Typography;

function ThuChi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [dataTable, setDataTable] = useState();
  const [transactionsDetail, setTransactionsDetail] = useState();
  const [dateRange, setDateRange] = useState();

  let transactionsTotal = [];
  // Function to calculator each element in array
  transactions.forEach((item) => {
    const timestamp = item.timestamp;
    if (!transactionsTotal[timestamp]) {
      transactionsTotal[timestamp] = {
        totalRevenue: 0,
        totalExpenditure: 0,
        entries: [],
      };
    }
    transactionsTotal[timestamp].totalRevenue += item.revenue || 0;
    transactionsTotal[timestamp].totalExpenditure += item.expenditure || 0;
    transactionsTotal[timestamp].entries.push(item);
  });

  // Format list data
  const resultArray = Object.keys(transactionsTotal).map((timestamp) => ({
    timestamp,
    totalRevenue: transactionsTotal[timestamp].totalRevenue,
    totalExpenditure: transactionsTotal[timestamp].totalExpenditure,
    entries: transactionsTotal[timestamp].entries.sort((a, b) => {
      const shiftOrder = { "Ca 1": 1, "Ca 2": 2, "Ca 3": 3 };
      return shiftOrder[a.shift] - shiftOrder[b.shift];
    }),
  }));

  const dataResult = resultArray.map((item) => ({
    key: item.timestamp,
    date: item.timestamp || "",
    ca1: item.entries[0],
    ca2: item.entries[1],
    ca3: item.entries[2],
    totalRevenue: item.totalRevenue,
    totalExpenditure: item.totalExpenditure,
    actuallyReceived: item.totalRevenue - item.totalExpenditure,
  }));

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date, dateString) => {
    if (date === null) {
      setDateRange(null);
    } else {
      setDateRange(dateString);
    }
  };

  // Fetch data from firebase
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "transactions")
        );
        const transactionList = querySnapshot.docs.map((doc) => doc.data());
        transactionList.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setTransactions(transactionList);
      } catch (error) {
        console.error("Lỗi khi tải danh sách giao dịch:", error);
      }
    };

    // Fetch data
    fetchTransactions();
  }, []);

  const handleClickDetail = (text) => {
    setTransactionsDetail(text);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Ngày",
      dataIndex: "date",
      render: (text) => <p>{formatDateTime(new Date(text), "dd/MM/yyyy")}</p>,
    },
    {
      title: "Ca 1",
      dataIndex: "ca1",
      render: (text) => (
        <p
          className="cursor-pointer underline"
          onClick={() => handleClickDetail(text)}
        >
          {formatVND(text.revenue || 0)}
        </p>
      ),
    },
    {
      title: "Ca 2",
      dataIndex: "ca2",
      render: (text) => (
        <p
          className="cursor-pointer underline"
          onClick={() => handleClickDetail(text)}
        >
          {formatVND(text.revenue || 0)}
        </p>
      ),
    },
    {
      title: "Ca 3",
      dataIndex: "ca3",
      render: (text) => (
        <p
          className="cursor-pointer underline"
          onClick={() => handleClickDetail(text)}
        >
          {formatVND(text.revenue || 0)}
        </p>
      ),
    },
    {
      title: "Tổng danh thu",
      dataIndex: "totalRevenue",
      render: (text) => <p>{formatVND(text || 0)}</p>,
    },
    {
      title: "Tổng chi",
      dataIndex: "totalExpenditure",
      render: (text) => <p>{formatVND(text || 0)}</p>,
    },
    {
      title: "Thực nhận",
      dataIndex: "actuallyReceived",
      render: (text) => <p>{formatVND(text || 0)}</p>,
    },
  ];

  useEffect(() => {
    if (transactions && dateRange) {
      setDataTable(
        dataResult.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate >= new Date(dateRange[0]) &&
            itemDate <= new Date(dateRange[1])
          );
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  useEffect(() => {}, [transactions]);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Link
              href="/admin"
              className="p-2 bg-green-400 rounded-md text-white"
            >
              Về trang chủ của admin
            </Link>
            <Link
              href="/admin/thu-chi/nhap-thu-chi"
              className="p-2 bg-blue-400 rounded-md text-white"
            >
              Nhập thu chi
            </Link>
          </div>
          <RangePicker onChange={handleDateChange} />
        </div>
        <Table
          columns={columns}
          dataSource={!!dateRange ? dataTable : dataResult}
          summary={(pageData) => {
            let revenue = 0;
            let expenditure = 0;
            let received = 0;
            pageData.forEach(({ totalRevenue, totalExpenditure, actuallyReceived }) => {
              revenue += totalRevenue;
              expenditure += totalExpenditure;
              received += actuallyReceived;
            });
            return (
              <>
                <Table.Summary.Row>
                  {/* Display empty cells for the first two columns */}
                  <Table.Summary.Cell index={0}>Tổng</Table.Summary.Cell>
                  <Table.Summary.Cell index={1}></Table.Summary.Cell>
                  <Table.Summary.Cell index={2}></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}></Table.Summary.Cell>

                  <Table.Summary.Cell index={4}>
                    <Text type="" className="font-bold">{formatVND(revenue || 0)}</Text>
                  </Table.Summary.Cell>

                  <Table.Summary.Cell index={5}>
                  <Text type="danger" className="font-bold">{formatVND(expenditure || 0)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                  <Text type="success" className="font-bold">{formatVND(received || 0)}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <Modal
        title="Chi Tiết Thu Chi"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Ca trực: <b>{transactionsDetail?.shift}</b>
        </p>
        <p>
          Thời gian: <b>{transactionsDetail?.timestamp}</b>
        </p>
        <p>
          Tiền mặt: <b>{formatVND(transactionsDetail?.cashAmount)}</b>
        </p>
        <p>
          Tiền chuyển khoản:{" "}
          <b>{formatVND(transactionsDetail?.transferAmount || 0)}</b>
        </p>
        <p>
          Doanh thu: <b>{formatVND(transactionsDetail?.revenue || 0)}</b>
        </p>
        <p>
          Tổng chi: <b>{formatVND(transactionsDetail?.expenditure || 0)}</b>
        </p>
        {!!transactionsDetail?.expenditure && (
          <p>Nội dung chi: {transactionsDetail?.expenditureContent}</p>
        )}
      </Modal>
    </AdminLayout>
  );
}

export default ThuChi;
