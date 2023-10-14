import {
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../../firebase";
import {
  formatDateTime,
  formatVND,
  validateExpense,
  validateUpdateThuChi,
} from "../../../constant";
import AdminLayout from "../../../components/Layout/AdminLayout";
import Link from "next/link";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Typography } from "antd";
import { Formik, Form, ErrorMessage } from "formik";
import _ from "lodash";
import moment from "moment/moment";
const { Text } = Typography;
const { Option } = Select;

function ThuChi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExpendOpen, setIsModalExpendOpen] = useState(false);
  const [isDetailExpense, setIsDetailExpense] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState([]);
  const [dataTable, setDataTable] = useState();
  const [transactionsDetail, setTransactionsDetail] = useState();
  const [dateRange, setDateRange] = useState();
  const [resultData, setResultData] = useState();
  const [expenseDetail, setExpenseDetail] = useState();

  const [messageApi, contextHolder] = message.useMessage();

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
  const fetchTransactions = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "transactions")
      );
      const queryExpenseSnapshot = await getDocs(
        collection(firestore, "expense")
      );
      const transactionList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const expenseList = queryExpenseSnapshot.docs.map((doc) => doc.data());
      const sortExpense = _.sortBy(expenseList, "timestamp");
      const mergeExpense = _.groupBy(sortExpense, "timestamp");
      const resultExpense = [];
      for (const timestamp in mergeExpense) {
        if (mergeExpense.hasOwnProperty(timestamp)) {
          const records = mergeExpense[timestamp];
          const totalExpense = records.reduce(
            (sum, record) => sum + record.expense,
            0
          );
          const mergedRecord = {
            type: records[0].type,
            content: records.map((record) => record.content).join(", "),
            expense: totalExpense,
            timestamp: timestamp,
          };
          resultExpense.push(mergedRecord);
        }
      }
      transactionList.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setTransactions(transactionList);
      setExpense(resultExpense);
    } catch (error) {
      console.error("Lỗi khi tải danh sách giao dịch:", error);
    }
  };
  useEffect(() => {
    // Fetch data
    fetchTransactions();
  }, []);

  const handleClickDetail = (text) => {
    setTransactionsDetail(text);
    setIsModalOpen(true);
  };

  const handleClickDetailExpense = (text) => {
    setExpenseDetail(text);
    setIsDetailExpense(true);
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
          {formatVND(text?.revenue || 0)}
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
          {formatVND(text?.revenue || 0)}
        </p>
      ),
    },
    {
      title: "Tổng danh thu",
      dataIndex: "totalRevenue",
      render: (text) => <p>{formatVND(text || 0)}</p>,
    },
    {
      title: "Thu ngân chi",
      dataIndex: "totalExpenditure",
      render: (text) => <p>{formatVND(text || 0)}</p>,
    },
    {
      title: "Quán chi",
      dataIndex: "",
      render: (text) => (
        <p
          className={text?.expense && "cursor-pointer underline"}
          onClick={() => text?.expense && handleClickDetailExpense(text)}
        >
          {formatVND(text?.expense || 0)}
        </p>
      ),
    },
    {
      title: "Tổng chi",
      dataIndex: "finalExpense",
      render: (text) => <p>{formatVND(text || 0)}</p>,
    },
    {
      title: "Thực nhận",
      dataIndex: "actuallyReceived",
      render: (text) => <p>{formatVND(text || 0)}</p>,
    },
  ];

  useEffect(() => {
    if (resultData && dateRange) {
      setDataTable(
        resultData.filter((item) => {
          const itemDate = new Date(item?.date);
          return (
            itemDate >= new Date(dateRange[0]) &&
            itemDate <= new Date(dateRange[1])
          );
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  useEffect(() => {
    if (dataResult && expense) {
      setResultData(
        dataResult.map((item) => {
          const matchingObject = expense.find(
            (obj) => obj.timestamp === item.date
          );
          if (matchingObject) {
            return {
              ...item,
              ...matchingObject,
              finalExpense: item.totalExpenditure + matchingObject.expense,
              actuallyReceived:
                item.totalRevenue -
                item.totalExpenditure -
                matchingObject.expense,
            };
          } else {
            return {
              ...item,
              finalExpense: item.totalExpenditure,
            };
          }
        })
      );
    }
  }, [transactions]);

  const handleSubmitExpend = async (values) => {
    try {
      const expenseData = {
        timestamp: values.date,
        expense: values.expense,
        type: values.type,
        content: values.content,
      };
      const expenseCollection = collection(firestore, "expense");
      setIsModalExpendOpen(false);
      await addDoc(expenseCollection, expenseData);
      fetchTransactions();
      alert("Dữ liệu đã được lưu thành công vào Firestore.");
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:183 ~ handleSubmitExpend ~ error:",
        error
      );
    }
  };

  const updateTransaction = async (values) => {
    const updateRef = doc(firestore, "transactions", transactionsDetail?.id);
    await updateDoc(updateRef, {
      ...values,
    }).then(() => {
      setIsModalOpen(false);
      messageApi.open({
        type: "success",
        content: "Cập nhật thu chi thành công",
      });
      fetchTransactions();
    });
  };

  return (
    <AdminLayout>
      {contextHolder}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-4">
            {/* <Link
              href="/admin"
              className="p-2 bg-green-400 rounded-md text-white"
            >
              Về trang chủ của admin
            </Link> */}
            <Button onClick={() => setIsModalExpendOpen(true)}>Nhập Chi</Button>
            <Link
              href="/admin/nhap-thu-chi"
              className="p-2 bg-blue-400 rounded-md text-white"
            >
              Nhập thu chi
            </Link>
          </div>
          <RangePicker onChange={handleDateChange} />
        </div>
        <Table
          columns={columns}
          dataSource={!!dateRange ? dataTable : resultData}
          pagination={{ pageSize: 31 }}
          summary={(pageData) => {
            let revenue = 0;
            let expenditure = 0;
            let received = 0;
            let totalExpense = 0;
            pageData.forEach(
              ({
                totalRevenue,
                totalExpenditure,
                actuallyReceived,
                expense,
              }) => {
                revenue += totalRevenue;
                expenditure += totalExpenditure;
                received += actuallyReceived;
                totalExpense += expense || 0;
              }
            );
            return (
              <>
                <Table.Summary.Row>
                  {/* Display empty cells for the first two columns */}
                  <Table.Summary.Cell index={0}>Tổng</Table.Summary.Cell>
                  <Table.Summary.Cell index={1}></Table.Summary.Cell>
                  <Table.Summary.Cell index={2}></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}></Table.Summary.Cell>

                  <Table.Summary.Cell index={4}>
                    <Text type="" className="font-bold">
                      {formatVND(revenue || 0)}
                    </Text>
                  </Table.Summary.Cell>

                  <Table.Summary.Cell index={5}>
                    <Text type="danger" className="font-bold">
                      {formatVND(expenditure || 0)}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                    <Text type="danger" className="font-bold">
                      {formatVND(totalExpense || 0)}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                    <Text type="danger" className="font-bold">
                      {formatVND(totalExpense + expenditure || 0)}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8}>
                    <Text type="success" className="font-bold">
                      {formatVND(received || 0)}
                    </Text>
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
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <button
            form={transactionsDetail?.id}
            className="border border-grey px-2.5 py-1 rounded-md hover:bg-grey"
            key="submit"
            htmltype="submit"
            type="submit"
          >
            Cập nhật
          </button>,
        ]}
      >
        <Formik
          initialValues={{
            startAmount: transactionsDetail?.startAmount,
            endAmount: transactionsDetail?.endAmount,
            cashAmount: transactionsDetail?.cashAmount,
            transferAmount: transactionsDetail?.transferAmount,
            revenue: transactionsDetail?.revenue,
            expenditure: transactionsDetail?.expenditure,
            expenditureContent: transactionsDetail?.expenditureContent,
          }}
          validationSchema={validateUpdateThuChi}
          onSubmit={(values) => {
            return updateTransaction(values);
            // return handleSubmitExpend(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form id={transactionsDetail?.id}>
              <div className="flex flex-col gap-4">
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-5/12">Thời gian</p>
                  <div className="flex flex-col gap-1 w-full">
                    <DatePicker
                      defaultValue={moment(
                        transactionsDetail?.timestamp,
                        "YYYY-MM-DD"
                      )}
                      disabled
                      className="w-full disabled"
                    />
                  </div>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-5/12">Ca trực</p>
                  <div className="flex flex-col gap-1 w-full">
                    <Input defaultValue={transactionsDetail?.shift} disabled />
                  </div>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-5/12">Số tiền đầu ca</p>
                  <div className="flex flex-col gap-1 w-full">
                    <InputNumber
                      className="w-full"
                      defaultValue={transactionsDetail?.startAmount}
                      onChange={(values) => {
                        setFieldValue("startAmount", values);
                      }}
                    />
                    <ErrorMessage
                      name="startAmount"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-5/12">Số tiền cuối ca</p>
                  <div className="flex flex-col gap-1 w-full">
                    <InputNumber
                      className="w-full"
                      defaultValue={transactionsDetail?.endAmount}
                      onChange={(values) => {
                        setFieldValue("endAmount", values);
                      }}
                    />
                    <ErrorMessage
                      name="endAmount"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-5/12">Doanh thu trên máy</p>
                  <div className="flex flex-col gap-1 w-full">
                    <InputNumber
                      className="w-full"
                      defaultValue={transactionsDetail?.revenue}
                      onChange={(values) => {
                        setFieldValue("revenue", values);
                      }}
                    />
                    <ErrorMessage
                      name="revenue"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-5/12">Tiền chuyển khoản</p>
                  <div className="flex flex-col gap-1 w-full">
                    <InputNumber
                      className="w-full"
                      defaultValue={transactionsDetail?.transferAmount}
                      onChange={(values) => {
                        setFieldValue("transferAmount", values);
                      }}
                    />
                    <ErrorMessage
                      name="transferAmount"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-5/12">Số tiền trong két</p>
                  <div className="flex flex-col gap-1 w-full">
                    <InputNumber
                      className="w-full"
                      defaultValue={transactionsDetail?.cashAmount}
                      onChange={(values) => {
                        setFieldValue("cashAmount", values);
                      }}
                    />
                    <ErrorMessage
                      name="cashAmount"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>

                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-5/12">Số tiền đã chi</p>
                  <div className="flex flex-col gap-1 w-full">
                    <InputNumber
                      className="w-full"
                      defaultValue={transactionsDetail?.expenditure}
                      onChange={(values) => {
                        setFieldValue("expenditure", values);
                      }}
                    />
                    <ErrorMessage
                      name="expenditure"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-5/12">Nội dung đã chi</p>
                  <div className="flex flex-col gap-1 w-full">
                    <Input.TextArea
                      allowClear
                      defaultValue={transactionsDetail?.expenditureContent}
                      onChange={(event) => {
                        setFieldValue("expenditureContent", event.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="expenditureContent"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal
        title="Chi Tiết Quán Chi"
        open={isDetailExpense}
        onOk={() => setIsDetailExpense(false)}
        onCancel={() => setIsDetailExpense(false)}
      >
        <p>
          Thời gian: <b>{expenseDetail?.timestamp}</b>
        </p>
        <p>
          Tổng chi: <b>{formatVND(expenseDetail?.expense)}</b>
        </p>
        <p>
          Loại chi: <b>{expenseDetail?.type}</b>
        </p>
        {!!expenseDetail?.content && (
          <p>Nội dung chi: {expenseDetail?.content}</p>
        )}
      </Modal>
      <Modal
        title="Chi Phí Quán"
        open={isModalExpendOpen}
        onCancel={() => setIsModalExpendOpen(false)}
        footer={[
          <button
            className="border border-black p-2 rounded-md"
            form="formCreateExpense"
            key="submit"
            htmltype="submit"
            type="submit"
          >
            Tạo Mới
          </button>,
        ]}
      >
        <Formik
          initialValues={{
            date: "",
            expense: "",
            type: "Chi phí từ Quán",
            content: "",
          }}
          validationSchema={validateExpense}
          onSubmit={(values) => {
            return handleSubmitExpend(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form id={"formCreateExpense"}>
              <div className="flex flex-col gap-4">
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-3/12">Ngày chi</p>
                  <div className="flex flex-col gap-1 w-full">
                    <DatePicker
                      className="w-full"
                      onChange={(event, dateString) => {
                        setFieldValue("date", dateString);
                      }}
                    />
                    <ErrorMessage
                      name="date"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-3/12">Số tiền chi</p>
                  <div className="flex flex-col gap-1 w-full">
                    <InputNumber
                      className="w-full"
                      onChange={(values) => {
                        setFieldValue("expense", values);
                      }}
                    />
                    <ErrorMessage
                      name="expense"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-3/12">Loại chi phí</p>
                  <Select
                    className="w-full"
                    placeholder="Chọn loại chi"
                    defaultValue={"Chi phí từ Quán"}
                    onChange={(values) => {
                      setFieldValue("type", values);
                    }}
                    allowClear
                  >
                    <Option value="Chi phí từ Quán">Chi phí từ Quán</Option>
                    <Option value="Chi phí từ Cá nhân">
                      Chi phí từ Cá nhân
                    </Option>
                  </Select>
                </section>
                <section className="w-full flex gap-4 items-center">
                  <p className="font-bold w-3/12">Hình thức chi</p>
                  <div className="flex flex-col gap-1 w-full">
                    <Input.TextArea
                      allowClear
                      onChange={(event) => {
                        setFieldValue("content", event.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="content"
                      component="p"
                      className="text-error text-xs"
                    />
                  </div>
                </section>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </AdminLayout>
  );
}

export default ThuChi;
