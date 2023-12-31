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

export const validateUpdateThuChi = Yup.object().shape({
  startAmount: Yup.string().trim().required("Vui lòng nhập số tiền"),
  endAmount: Yup.string().trim().required("Vui lòng nhập số tiền"),
  cashAmount: Yup.string().trim().required("Vui lòng nhập số tiền"),
  transferAmount: Yup.string().trim().required("Vui lòng nhập số tiền"),
  revenue: Yup.string().trim().required("Vui lòng nhập số tiền"),
  expenditure: Yup.string().trim().required("Vui lòng nhập số tiền"),
});

export const validateCreateMaterial = Yup.object().shape({
  materialName: Yup.string().trim().required("Vui lòng nhập tên đơn vị"),
});

export const validateCreateWareHouse = Yup.object().shape({
  date: Yup.string().trim().required("Vui lòng nhập ngày"),
  staffName: Yup.string().trim().required("Vui lòng nhập tên"),
  ingredientName: Yup.string().required('Tên sản phẩm không được để trống'),
  quantity: Yup.number().required('Số lượng không được để trống').positive('Số lượng phải là số dương'),
  note: Yup.string(),
});

export const validateCreateIngredient = Yup.object().shape({
  ingredientName: Yup.string().required('Tên sản phẩm không được để trống'),
  materialName: Yup.string().required('Vui lòng chọn đơn vị'),
  originalQuantity: Yup.number().required('Số lượng không được để trống').positive('Số lượng phải là số dương'),
  limitQuantity: Yup.number().required('Số lượng không được để trống').positive('Số lượng phải là số dương'),
});
