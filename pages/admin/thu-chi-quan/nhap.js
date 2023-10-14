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
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmitExpend = async (values) => {
    try {
      const expenseData = {
        timestamp: values.date,
        expense: values.expense,
        type: values.type,
        content: values.content,
      };
      const expenseCollection = collection(firestore, "expense");
      await addDoc(expenseCollection, expenseData);
      alert("Dữ liệu đã được lưu thành công vào Firestore.");
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:183 ~ handleSubmitExpend ~ error:",
        error
      );
    }
  };

  return (
    <AdminLayout>
      {contextHolder}
      <Formik
        initialValues={{
          date: "",
          expense: "",
          type: "Chi phí từ Quán",
          content: "",
        }}
        validationSchema={validateExpense}
        onSubmit={(values, { resetForm }) => {
          handleSubmitExpend(values);
          resetForm();
        }}
      >
        {({ setFieldValue }) => (
          <Form id={"formCreateExpense"}>
            <div className="flex flex-col gap-4 flex-wrap">
              <section className="w-full flex gap-4 items-center flex-wrap">
                <p className="font-bold lg:w-3/12">Ngày chi</p>
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
              <section className="w-full flex gap-4 items-center flex-wrap">
                <p className="font-bold lg:w-3/12">Số tiền chi</p>
                <div className="flex flex-col gap-1 w-full">
                  <InputNumber
                    className="w-full"
                    min={1000}
                    step={1000}
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
              <section className="w-full flex gap-4 items-center flex-wrap">
                <p className="font-bold lg:w-3/12">Loại chi phí</p>
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
                  <Option value="Chi phí từ Cá nhân">Chi phí từ Cá nhân</Option>
                </Select>
              </section>
              <section className="w-full flex gap-4 items-center flex-wrap">
                <p className="font-bold lg:w-3/12">Hình thức chi</p>
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

            <div class="py-4 flex justify-center gap-4">
              <Link
                href="/admin/thu-chi-quan"
                className="p-2 rounded-md text-black"
              >
                Quay lại
              </Link>
              <button
                className="p-2 bg-green-700 rounded-md text-white"
                form="formCreateExpense"
                key="submit"
                htmltype="submit"
                type="submit"
              >
                Thêm
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AdminLayout>
  );
}

export default ThuChi;
