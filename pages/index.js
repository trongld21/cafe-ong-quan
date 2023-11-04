import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";
import Facebook from "../components/Facebook";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function Home() {
  const [initialValues, setInitialValues] = useState({
    name: "",
    mailSender: "",
    content: "",
  });
  // Check validate form
  const validation = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập học và tên")
      .min(3, "Họ và tên ít nhất 3 ký tự")
      .max(50, "Họ và tên nhiều nhất 50 ký tự")
      .matches(
        /^[a-zA-ZÀ-ỹ ]+$/,
        "Họ và tên chỉ chứa ký tự hoa, thường và khoảng trắng"
      ),
    mailSender: Yup.string()
      .required("Vui lòng nhập email")
      .email("Định dạng email không đúng")
      .max(100, "Địa chỉ email nhiều nhất 100 ký tự"),
    content: Yup.string()
      .required("Vui lòng nhập nội dung")
      .max(2000, "Nội dung nhiều nhất 2000 kí tự"),
  });

  const handleSubmitForm = async (values) => {
    console.log(values);
    // const res = await apiContact.GetComment(values.name, values.mailSender, values.content);
    // if (res && res.success === true) {
    //     showSuccess('Đã gửi thành công', ' Cảm ơn vì đã liên hệ', 10);
    // } else {
    //     showError('Gửi bình luận thất bại', 'Hãy thử lại!!!', 1);
    // }
  };

  return (
    <div className="w-full bg-[#F1E8C7]">
      <header className="h-24 bg-[#594633] flex justify-between items-center px-8">
        <div>
          <Link href="/" className="">
            <img src="/assets/images/home/logo.png" className="h-16" />
          </Link>
        </div>
        <div className="flex justify-between gap-16">
          <Link
            href="/"
            className="font-medium text-xl uppercase text-[#F1E8C7] font-iCielBCCartelDeuxAlt"
          >
            Trang Chủ
          </Link>
          <Link
            href="/"
            className="font-medium text-xl uppercase text-[#F1E8C7] font-iCielBCCartelDeuxAlt"
          >
            Thực đơn
          </Link>
          <Link
            href="/"
            className="font-medium text-xl uppercase text-[#F1E8C7] font-iCielBCCartelDeuxAlt"
          >
            Ưu đãi
          </Link>
          <Link
            href="/"
            className="font-medium text-xl uppercase text-[#F1E8C7] font-iCielBCCartelDeuxAlt"
          >
            Tin tức
          </Link>
          <Link
            href="/"
            className="font-medium text-xl uppercase text-[#F1E8C7] font-iCielBCCartelDeuxAlt"
          >
            Về chúng tôi
          </Link>
          <Link
            href="/"
            className="font-medium text-xl uppercase text-[#F1E8C7] font-iCielBCCartelDeuxAlt"
          >
            Liên hệ
          </Link>
        </div>
      </header>
      <div className="main-section w-full min-h-[40rem]">
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#594633] opacity-30"></div>

        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center gap-3">
          <h1 className="uppercase text-white font-normal text-9xl font-iCielBCHolidaySerif">
            Tiệm Cà Phê Ông Quan
          </h1>
          <h2 className="text-[#F1E8C7] text-3xl font-light font-iCielBCLeJeunePoster">
            Không chỉ là coffee, chúng tôi bán với sự trải nghiệm
          </h2>
          <button className="bg-[#F1E8C7] text-[#594633] text-lg px-7 py-3 uppercase font-medium font-iCielBCCartelDeuxAlt">
            Đặt bàn
          </button>
        </div>
      </div>
      <div className="p-16">
        <div className="flex flex-col justify-center items-center gap-12 pb-12">
          <h3 className="uppercase text-[#594633] text-xl font-iCielBCLivory">
            trải nghiệm
          </h3>
          <h1 className="uppercase text-[#594633] font-normal text-6xl font-iCielBCBjola">
            Về không gian
          </h1>
          <p className="text-center text-lg font-normal text-[#594633] leading-[128%] tracking-wider font-iCielBCLivory">
            Tiệm Cà Phê Ông Quan là một ẩn mình trong lòng Cần Thơ, mang đến cho
            bạn một trải nghiệm độc đáo với không gian lấy cảm hứng từ vẻ đẹp
            của Đà Lạt. Với tông màu ấm áp và thoải mái, chúng tôi đã thiết kế
            đồ nội thất thông minh và tinh tế để tạo ra một môi trường đặc biệt,
            mang đến sự thoải mái tối đa cho khách hàng. Bạn có thể lựa chọn
            ngồi ở các góc ngồi riêng tư, nơi bạn có thể thả lỏng và tận hưởng
            không gian riêng tư yên bình, hoặc bạn cũng có thể chọn các bàn đơn
            tại quán, tùy theo sở thích của mình. Tiệm Cà Phê Ông Quan sẽ luôn
            sẵn sàng đón tiếp bạn và mang đến cho bạn cảm giác thư giãn và hòa
            mình vào vẻ đẹp độc đáo của Đà Lạt tại trung tâm Cần Thơ.
          </p>
        </div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <img src="/assets/images/home/slider/i1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/slider/i2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/slider/i3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/home/slider/i2.png" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="bg-[#594633] w-full min-h-[50rem] relative overflow-y-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#594633] opacity-30 z-[1]"></div>
        <div className="absolute w-96 -bottom-40 left-1/2 transform -translate-x-1/2">
          <img src="/assets/images/home/best_seller.png" className="w-96" />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center gap-7 z-[2]">
          <h1 className="uppercase text-[#F1E8C7] font-normal text-9xl font-iCielBCBjola">
            BEST SELLER #1
          </h1>
          <h2 className="text-[#F1E8C7] text-6xl font-light font-iCielBCDowntown">
            CÀ PHÊ SỮA
          </h2>
          <button className="bg-[#F1E8C7] text-[#594633] text-lg px-7 py-3 uppercase font-medium font-iCielBCCartelDeuxAlt">
            TÌM HIỂU THÊM
          </button>
        </div>
      </div>
      <div className="w-full min-h-[50rem] px-16 pt-16 pb-8">
        <div className="pb-12">
          <div className="flex flex-col justify-center items-center gap-12 pb-20">
            <h1 className="uppercase text-[#594633] font-normal text-6xl font-iCielBCBjola">
              Thực đơn có gì?
            </h1>
            <div className="flex justify-center items-center gap-8">
              <Link
                href="javascript:void(0)"
                className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt border-b-4 border-[#594633]"
              >
                Cà Phê
              </Link>
              <Link
                href="javascript:void(0)"
                className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt opacity-70"
              >
                Trà
              </Link>
              <Link
                href="javascript:void(0)"
                className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt opacity-70"
              >
                Sữa Chua
              </Link>
              <Link
                href="javascript:void(0)"
                className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt opacity-70"
              >
                Cacao
              </Link>
              <Link
                href="javascript:void(0)"
                className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt opacity-70"
              >
                Đá Xay
              </Link>
              <Link
                href="javascript:void(0)"
                className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt opacity-70"
              >
                Khác
              </Link>
            </div>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                <img src="/assets/images/product_1.png" className="w-40" />
              </div>
              <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                Cà Phê Đen
              </h1>
              <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                25.0000 VND
              </h3>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                <img src="/assets/images/product_2.png" className="w-40" />
              </div>
              <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                Cà phê SỮA
              </h1>
              <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                25.0000 VND
              </h3>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                <img src="/assets/images/product_3.png" className="w-40" />
              </div>
              <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                Cà phê thường
              </h1>
              <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                25.0000 VND
              </h3>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                <img src="/assets/images/product_1.png" className="w-40" />
              </div>
              <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                Cà Phê Đen
              </h1>
              <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                25.0000 VND
              </h3>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="w-full min-h-[10rem] px-16">
        <div className="pb-8">
          <div className="flex flex-col justify-center items-center gap-12 pb-20">
            <h1 className="uppercase text-[#594633] font-normal text-4xl font-iCielBCBjola">
              Cùng với những ưu đãi
            </h1>
            <div className="flex justify-center items-start gap-16">
              <div className="flex flex-col justify-center items-center w-[40vw] gap-2">
                <img
                  src="/assets/images/content_1.png"
                  className="w-60 h-60 rounded-full"
                />
                <h1 className="text-[#594633] text-3xl px-7 py-3 uppercase font-medium font-iCielBCCartelDeuxAlt">
                  ƯU ĐÃI #1
                </h1>
                <p className="text-justify text-lg font-normal text-[#594633] leading-[128%] tracking-wider font-iCielBCLivory">
                  Sự kết hợp giữa Cappuccino và bánh bông lan nhân khô nho là
                  một cách tuyệt vời để kết hợp hương vị ngọt ngào và tươi mát.
                  Cappucino thơm ngon và mát lạnh sẽ làm dịu cơn khát vào những
                  ngày nóng bức. Bánh bông lan nhân khô nho sẽ tạo ra một vị
                  ngọt dịu, cùng với vị giòn của bánh, mang lại trải nghiệm
                  thưởng thức đầy tuyệt vời. Hãy đến Tiệm cà phê Ông Quan của
                  chúng tôi để thưởng thức ưu đãi này ngay hôm nay!
                </p>
              </div>
              <div className="flex flex-col justify-center items-center w-[40vw] gap-2">
                <img
                  src="/assets/images/content_2.png"
                  className="w-60 h-60 rounded-full"
                />
                <h1 className="text-[#594633] text-3xl px-7 py-3 uppercase font-medium font-iCielBCCartelDeuxAlt">
                  ƯU ĐÃI #2
                </h1>
                <p className="text-justify text-lg font-normal text-[#594633] leading-[128%] tracking-wider font-iCielBCLivory">
                  Cappuccino kết hợp với bánh sừng bò mặn tạo ra sự kết hợp ngon
                  miệng giữa hương vị ngọt và mặn. Bạn có thể thưởng thức miếng
                  bánh sừng bò mặn giòn tan kèm với một cốc Cappuccino thơm ngon
                  và mát lạnh để tạo ra một trải nghiệm thưởng thức thực phẩm
                  hoàn hảo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[50rem] px-16">
        <div className="pb-12">
          <div className="flex flex-col justify-center items-center gap-12 pb-20">
            <h1 className="uppercase text-[#594633] font-normal text-4xl font-iCielBCBjola">
              BÁNH NGỌT, SAO LẠI KHÔNG?
            </h1>
            <div className="flex justify-center items-start gap-16">
              <div className="grid grid-cols-4 gap-12">
                <div>
                  <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                    <img src="/assets/images/cake_1.png" className="w-40" />
                  </div>
                  <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                    BÁNH CUỘN NHO KHÔ
                  </h1>
                  <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                    25.0000 VND
                  </h3>
                </div>
                <div>
                  <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                    <img src="/assets/images/cake_2.png" className="w-40" />
                  </div>
                  <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                    BÁNH NƯỚNG MÈ
                  </h1>
                  <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                    25.0000 VND
                  </h3>
                </div>
                <div>
                  <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                    <img src="/assets/images/cake_3.png" className="w-40" />
                  </div>
                  <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                    BÁNH SỪNG
                  </h1>
                  <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                    25.0000 VND
                  </h3>
                </div>
                <div>
                  <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                    <img src="/assets/images/cake_4.png" className="w-40" />
                  </div>
                  <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                    BÁNH MẬT NGỌT
                  </h1>
                  <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                    25.0000 VND
                  </h3>
                </div>
                <div>
                  <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                    <img src="/assets/images/cake_5.png" className="w-40" />
                  </div>
                  <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                    BÁNH MỨT DÂU
                  </h1>
                  <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                    25.0000 VND
                  </h3>
                </div>
                <div>
                  <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                    <img src="/assets/images/cake_6.png" className="w-40" />
                  </div>
                  <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                    BÁNH TRỨNG MUỐI
                  </h1>
                  <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                    25.0000 VND
                  </h3>
                </div>
                <div>
                  <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                    <img src="/assets/images/cake_7.png" className="w-40" />
                  </div>
                  <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                    BÁNH QUẾ MẬT ONG
                  </h1>
                  <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                    25.0000 VND
                  </h3>
                </div>
                <div>
                  <div className="w-80 h-96 bg-[#B68C62] flex flex-col justify-center items-center gap-4">
                    <img src="/assets/images/cake_8.png" className="w-40" />
                  </div>
                  <h1 className="font-medium text-xl uppercase text-[#594633] font-iCielBCCartelDeuxAlt pt-6 uppercase">
                    BÁNH TRỨNG NƯỚNG
                  </h1>
                  <h3 className="font-medium text-xl uppercase text-[#594633] font-iCielBCDowntown pt-1">
                    25.0000 VND
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#594633] w-full min-h-[50rem] relative overflow-y-hidden">
        <div class="flex flex-col justify-center items-center px-16 pt-24">
          <h1 className="uppercase text-[#F1E8C7] font-normal text-4xl font-iCielBCBjola pb-24">
            Vì sao chúng tôi là nơi lí tưởng cho bạn?
          </h1>
          <div className="grid grid-cols-3 gap-12">
            <div className="flex flex-col justify-center items-center gap-8">
              <img src="/assets/images/icon_1.png" />
              <h1 className="text-[#F1E8C7] text-2xl font-iCielBCCartelDeuxAlt">
                VỀ CÀ PHÊ
              </h1>
              <p className="text-[#F1E8C7] text-xl font-iCielBCLivory text-justify">
                Cà phê tại quán của chúng tôi được pha chế từ những hạt cà phê
                chọn lọc kỹ càng và rang theo phương pháp truyền thống để đảm
                bảo hương vị đặc trưng và chất lượng tuyệt vời. Đến với quán cà
                phê của chúng tôi, bạn sẽ được thưởng thức một tách cà phê đậm
                đà và thơm ngon nhất.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
              <img src="/assets/images/icon_2.png" />
              <h1 className="text-[#F1E8C7] text-2xl font-iCielBCCartelDeuxAlt">
                VỀ MÔI TRƯỜNG
              </h1>
              <p className="text-[#F1E8C7] text-xl font-iCielBCLivory text-justify">
                Quán của chúng tôi có không gian ấm cúng và thiết kế sang trọng,
                tạo ra một môi trường thư giãn và đầy cảm hứng cho khách hàng.
                Bạn sẽ có cơ hội thưởng thức cà phê tuyệt vời trong một không
                gian thoải mái và đầy hứng khởi. Hãy ghé thăm quán của chúng tôi
                để tận hưởng không gian đẹp và thoải mái nhất.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
              <img src="/assets/images/icon_3.png" />
              <h1 className="text-[#F1E8C7] text-2xl font-iCielBCCartelDeuxAlt">
                VỀ GIAO HÀNG
              </h1>
              <p className="text-[#F1E8C7] text-xl font-iCielBCLivory text-justify">
                Quán của chúng tôi có không gian ấm cúng và thiết kế sang trọng,
                tạo ra một môi trường thư giãn và đầy cảm hứng cho khách hàng.
                Bạn sẽ có cơ hội thưởng thức cà phê tuyệt vời trong một không
                gian thoải mái và đầy hứng khởi. Hãy ghé thăm quán của chúng tôi
                để tận hưởng không gian đẹp và thoải mái nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[50rem] px-16 pt-16">
        <div className="pb-12">
          <div className="flex flex-col justify-center items-center gap-12 pb-20">
            <h1 className="uppercase text-[#594633] font-normal text-4xl font-iCielBCBjola">
              ƯU ĐÃI DÀNH RIÊNG CHO KHÁCH HÀNG QUA WEBSITE
            </h1>
            <p className="text-[#594633] font-normal text-base font-iCielBCLivory">
              Chúng tôi rất cảm kích sự quan tâm của bạn đến Tiệm cà phê Ông
              Quan và mong muốn có cơ hội chào đón bạn tới thưởng thức các loại
              nước uống và bánh ngọt tuyệt vời của chúng tôi. Hãy để lại thông
              tin của bạn để nhận ngay ưu đãi đặc biệt của chúng tôi - giảm ngay
              30% trên tổng hóa đơn khi mua nước và bánh tại cửa hàng. Bằng cách
              đăng ký, bạn sẽ trở thành một phần của cộng đồng của Tiệm cà phê
              Ông Quan và được cập nhật về những sự kiện và ưu đãi đặc biệt sớm
              nhất. Chúng tôi cam kết bảo mật thông tin của bạn và chỉ sử dụng
              để gửi cho bạn các ưu đãi và tin tức mới nhất từ Tiệm cà phê Ông
              Quan. Một lần nữa, chúng tôi rất trân trọng sự quan tâm của bạn và
              hy vọng được đón tiếp bạn tại Tiệm cà phê Ông Quan sớm nhất!
            </p>

            <div className="p-12 text-center items-center justify-center border-[#594633] border-dashed border-2 rounded-xl">
              <h1 className="uppercase text-[#594633] font-normal text-2xl font-iCielBCBjola">
                Gửi thông tin
              </h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={(values, { resetForm }) => {
                  handleSubmitForm(values);
                  resetForm();
                }}
              >
                <Form className="min-w-[50vw]">
                  <div className="xl:w-3/4 mx-auto">
                    <div className="flex flex-col items-center justify-center gap-4 p-4">
                      <Field
                        className="placeholder-[#594633] font-iCielBCLivory p-2 bot border-b border-t-0 border-l-0 border-r-0 border-[#594633] leading-tight focus:outline-none w-3/4 bg-transparent"
                        type="text"
                        name="name"
                        placeholder="Hãy nhập tên..."
                      />
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-[#594633] text-xs font-iCielBCLivory"
                      />
                      <Field
                        className="placeholder-[#594633] font-iCielBCLivory p-2 bot border-b border-t-0 border-l-0 border-r-0 border-[#594633] leading-tight focus:outline-none w-3/4 bg-transparent"
                        type="text"
                        name="mailSender"
                        placeholder="Hãy nhập địa chỉ email.."
                      />
                      <ErrorMessage
                        name="mailSender"
                        component="p"
                        className="text-[#594633] text-xs font-iCielBCLivory"
                      />
                      <Field
                        className="placeholder-[#594633] font-iCielBCLivory border p-2 border-[#594633] leading-tight focus:outline-none h-32 w-3/4 mt-8 bg-transparent"
                        type="text"
                        as="textarea"
                        name="content"
                        placeholder="Nhập tin nhắn của bạn..."
                      />
                      <ErrorMessage
                        name="content"
                        component="p"
                        className="text-[#594633] text-xs font-iCielBCLivory"
                      />
                      <div className="flex justify-center items-center">
                        <button
                          className="font-iCielBCCartelDeuxAlt text-sm font-bold border border-[#594633] w-32 h-9 hover:bg-secondary hover:text-[#F1E8C7] hover:bg-[#594633]"
                          type="submit"
                        >
                          Gửi
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#594633] w-full min-h-[20rem] p-16">
        <div className="grid grid-cols-4">
          <div className="flex flex-col justify-start items-start gap-2">
            <img src="/assets/images/home/logo.png" className="w-28" />
            <h1 className="uppercase text-[#F1E8C7] font-normal text-3xl font-iCielBCHolidaySerif">
              Tiệm Cà Phê Ông Quan
            </h1>
          </div>
          <div>
            <h1 className="uppercase text-[#F1E8C7] font-normal text-3xl font-iCielBCHolidaySerif">Giới thiệu</h1>
            <Link href="javascript:void(0)" className="block text-[#F1E8C7] font-normal text-xl leading-[128%] tracking-wider font-iCielBCLivory">Về chúng tôi</Link>
            <Link href="javascript:void(0)" className="block text-[#F1E8C7] font-normal text-xl leading-[128%] tracking-wider font-iCielBCLivory">Ưu đãi</Link>
          </div>
          <div>
            <h1 className="uppercase text-[#F1E8C7] font-normal text-3xl font-iCielBCHolidaySerif">Dịch vụ khách hàng</h1>
            <Link href="javascript:void(0)" className="block text-[#F1E8C7] font-normal text-xl leading-[128%] tracking-wider font-iCielBCLivory">Thực đơn</Link>
            <Link href="javascript:void(0)" className="block text-[#F1E8C7] font-normal text-xl leading-[128%] tracking-wider font-iCielBCLivory">Bánh ngọt</Link>
          </div>
          <div>
            <h1 className="uppercase text-[#F1E8C7] font-normal text-3xl font-iCielBCHolidaySerif">Liên hệ</h1>
            <div className="flex justify-start gap-4 items-center">
            <Link target="_blank" href="https://www.facebook.com/tiemcafeongquan">
              <img src="/assets/images/facebook.png" className="w-10"/>
            </Link>
            <Link target="_blank" href="https://www.tiktok.com/@ongquan_251223">
              <img src="/assets/images/tiktok.png" className="w-10" />
            </Link>
            </div>
            
          </div>
        </div>
        <p className="text-[#F1E8C7] font-normal text-xl leading-[128%] tracking-wider font-iCielBCLivory">Địa chỉ: hẻm 583, đường 30/4, phường Hưng Lợi, quận Ninh Kiều, TP Cần Thơ, Việt Nam</p>
            <Link href="callto:0937296565" className="text-[#F1E8C7] font-normal text-xl leading-[128%] tracking-wider font-iCielBCLivory">Điện thoại: 093 729 65 65</Link>
      </footer>
      <div className="fixed rounded-full bottom-8 right-8 z-[60]">
        <Facebook />
      </div>
    </div>
  );
}
