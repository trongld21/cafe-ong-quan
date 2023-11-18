import { DatePicker, Input, InputNumber, Modal, Select, message } from "antd";
import { ErrorMessage, Form, Formik } from "formik";
import { validateCreateWareHouse } from "../../constant";

import { firestore } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import moment from "moment";

const { TextArea } = Input;

function CreateWarehouseModal(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [category, setCategory] = useState([
    {
      value: 0,
      label: "Nhập kho",
    },
    {
      value: 1,
      label: "Xuất kho",
    },
  ]);

  const success = (values) => {
    createWarehouseHistory(values)
    props.setIsShowWareHouseModal(false);
    props.fetchData();
    messageApi.open({
      type: "success",
      content: "Cập nhật kho thành công",
    });
  };

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  let initialValues = {
    date: "",
    category: category[0].value,
    staffName: "",
    ingredientName: props.listProduct ? props.listProduct[0]?.value : "",
    quantity: 1,
    limitQuantity: 1,
  };

  const createWarehouse = async (values) => {
    try {
      const ingredientCollection = collection(firestore, "ingredient");
      const ingredientDocRef = doc(ingredientCollection, values.ingredientName);
      const ingredientDocSnapshot = await getDoc(ingredientDocRef);
      if (ingredientDocSnapshot.exists()) {
        const ingredientData = ingredientDocSnapshot.data();
        if (values.category === 0) {
          await updateDoc(ingredientDocRef, {
            currentQuantity: ingredientData.currentQuantity + values.quantity,
          });
          success(values);
        } else {
          if (ingredientData.currentQuantity - values.quantity > 0) {
            await updateDoc(ingredientDocRef, {
              currentQuantity: ingredientData.currentQuantity - values.quantity,
            });
            success(values);
          } else {
            warning("Số lượng xuất kho vượt quá số lượng hiện tại");
          }
        }
      }
    } catch (error) {
      console.error("Error creating material:", error);
    }
  };

  const createWarehouseHistory = async (values) => {
    try {
      const ingredientName = props.listProduct.find((item) => item.value === values.ingredientName).label
      const dataInsert = {
        ...values,
        ingredientName: ingredientName,
        category: values.category === 0 ? 'Nhập kho' : 'Xuất kho'
      }
      const ingredientHistoryCollection = collection(
        firestore,
        "ingredientHistory"
      );
      await addDoc(ingredientHistoryCollection, dataInsert);
    } catch (error) {
      console.error("Error creating material:", error);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Xuất nhập kho"
        open={props.isShowWareHouseModal}
        onCancel={() => props.setIsShowWareHouseModal(false)}
        destroyOnClose
        footer={[
          <button
            form="createWarehouse"
            className="border border-grey px-2.5 py-1 rounded-md hover:bg-grey"
            key="submit"
            htmltype="submit"
            type="submit"
          >
            Thêm mới
          </button>,
        ]}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validateCreateWareHouse}
          onSubmit={(values) => {
            createWarehouse(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form id="createWarehouse" className="flex flex-col gap-4 mt-10">
              {/* Category */}
              <section className="flex justify-between gap-2 items-center">
                <p className="w-2/4">Ngày</p>
                <div className="flex flex-col gap-1 w-full">
                  <DatePicker
                    onChange={(event, dateString) => {
                      setFieldValue("date", dateString);
                    }}
                    className="w-full disabled"
                  />
                  <ErrorMessage
                    name="date"
                    component="p"
                    className="text-error text-xs"
                  />
                </div>
              </section>
              <section className="flex justify-between gap-2 items-center">
                <p className="w-2/4">Phương thức</p>
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    className="w-full"
                    showSearch
                    placeholder="Vui lòng phương thức"
                    defaultValue={category[0].value}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={category}
                    onChange={(event) => {
                      setFieldValue("category", event);
                    }}
                  />
                </div>
              </section>
              {/* Username */}
              <section className="flex justify-between gap-2 items-center">
                <p className="w-2/4">Tên người nhập</p>
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    className="w-full"
                    onChange={(event) => {
                      setFieldValue("staffName", event.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="staffName"
                    component="p"
                    className="text-error text-xs"
                  />
                </div>
              </section>
              {/* Product name */}
              <section className="flex justify-between gap-2 items-center">
                <p className="w-2/4">Tên nguyên liệu</p>
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    className="w-full"
                    showSearch
                    placeholder="Vui lòng chọn nguyên liệu"
                    defaultValue={props.listProduct[0].value}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={props.listProduct}
                    onChange={(event) => {
                      console.log(
                        "🚀 ~ file: CreateIngredientModal.js:117 ~ CreateIngredientModal ~ event:",
                        event
                      );
                      setFieldValue("ingredientName", event);
                    }}
                  />
                  <ErrorMessage
                    name="ingredientName"
                    component="p"
                    className="text-error text-xs"
                  />
                </div>
              </section>
              {/* Quantity */}
              <section className="flex justify-between gap-2 items-center">
                <p className="w-2/4">Số lượng</p>
                <div className="flex flex-col gap-1 w-full">
                  <InputNumber
                    min={1}
                    defaultValue={1}
                    className="w-full"
                    onChange={(event) => {
                      setFieldValue("quantity", event);
                    }}
                  />
                  <ErrorMessage
                    name="quantity"
                    component="p"
                    className="text-error text-xs"
                  />
                </div>
              </section>
              {/* Note */}
              <section className="flex justify-between gap-2 items-center">
                <p className="w-2/4">Ghi chú</p>
                <div className="flex flex-col gap-1 w-full">
                  <TextArea
                    placeholder="Vui lòng nhập ghi chú"
                    autoSize={{
                      minRows: 2,
                      maxRows: 2,
                    }}
                    onChange={(event) =>
                      setFieldValue("note", event.target.value)
                    }
                  />
                  <ErrorMessage
                    name="note"
                    component="p"
                    className="text-error text-xs"
                  />
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default CreateWarehouseModal;
