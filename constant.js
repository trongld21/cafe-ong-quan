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
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Sử dụng định dạng 24 giờ
  };
  return new Intl.DateTimeFormat("vi-VN", options).format(new Date(timestamp));
};
