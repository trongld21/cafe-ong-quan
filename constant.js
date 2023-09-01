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

export const columnsThuChi = ({handleClickDetail}) => [
  {
    title: "Ngày",
    dataIndex: "date",
    render: text => <p onClick={() => handleClickDetail()}>{text}</p>
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
