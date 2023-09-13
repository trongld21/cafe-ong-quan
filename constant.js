import * as Yup from "yup";

export const formatVND = (amount) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(amount);
};

export const formatDateTime = (timestamp) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: false, // Sử dụng định dạng 24 giờ
  };
  return new Intl.DateTimeFormat("vi-VN", options).format(new Date(timestamp));
};

export const columnsThuChi = ({ handleClickDetail }) => [
  {
    title: "Ngày",
    dataIndex: "date",
    render: (text) => <p onClick={() => handleClickDetail()}>{text}</p>,
  },
  {
    title: "Ca 1",
    dataIndex: "ca1",
  },
  {
    title: "Ca 2",
    dataIndex: "ca2",
  },
  {
    title: "Ca 3",
    dataIndex: "ca3",
  },
  {
    title: "Tổng danh thu",
    dataIndex: "totalRevenue",
  },
  {
    title: "Tổng chi",
    dataIndex: "totalExpenditure",
  },
  {
    title: "Thực nhận",
    dataIndex: "actuallyReceived",
  },
];

export const validateExpense = Yup.object().shape({
  date: Yup.string().trim().required("Vui lòng nhập ngày"),
  expense: Yup.string().trim().required("Vui lòng nhập số tiền"),
  date: Yup.string().trim().required("Vui lòng nhập ngày"),
  content: Yup.string().trim().required("Vui lòng nhập hình thức chi"),
});

export const columnChiQuan = () => [
  {
    title: "Ngày",
    dataIndex: "date",
  },
  {
    title: "Số tiền chi",
    dataIndex: "expense",
  },
  {
    title: "Nội dung chi",
    dataIndex: "content",
  },
];
