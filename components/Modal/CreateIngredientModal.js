import { Input, InputNumber, Modal, Select } from "antd";
import { ErrorMessage, Form, Formik } from "formik";
import { validateCreateIngredient } from "../../constant";

import { firestore } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

function CreateIngredientModal(props) {
  let initialValues = {
    materialName: props.listMaterial ? props.listMaterial[0].value : "",
    ingredientName: "",
    originalQuantity: 1,
    limitQuantity: 1,
  };

  const createNewIngredient = async (values) => {
    try {
      const ingredientCollection = collection(firestore, "ingredient");
      const dataInsert = {
        ...values,
        currentQuantity: values.originalQuantity,
      };
      // Kiểm tra xem có document nào có materialName trùng không
      const querySnapshot = await getDocs(
        query(
          ingredientCollection,
          where("ingredientName", "==", values.ingredientName)
        )
      );

      if (!querySnapshot.empty) {
        // Nếu có document trùng, hiển thị thông báo và không thêm mới
        alert("Tên nguyên liệu đã tồn tại trong database.");
      } else {
        // Nếu không có document trùng, thêm mới vào database
        props.setIsShowCreateIngredient(false);
        await addDoc(ingredientCollection, dataInsert);
        alert("Thêm thành công");
        props.fetchData()
        props.fetchListIngredient()
      }
    } catch (error) {
      console.error("Error creating material:", error);
    }
  };

  return (
    <Modal
      title="Thêm mới nguyên liệu"
      open={props.isShowCreateIngredient}
      onCancel={() => props.setIsShowCreateIngredient(false)}
      destroyOnClose
      footer={[
        <button
          form={"createIngredient"}
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
        validationSchema={validateCreateIngredient}
        onSubmit={(values) => {
          createNewIngredient(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form id="createIngredient" className="flex flex-col gap-4 py-6">
            {/* Product name */}
            <section className="flex justify-between gap-2 items-center">
              <p className="w-2/4">Tên nguyên liệu</p>
              <div className="flex flex-col gap-1 w-full">
                <Input
                  className="w-full"
                  onChange={(event) => {
                    setFieldValue("ingredientName", event.target.value);
                  }}
                />
                <ErrorMessage
                  name="ingredientName"
                  component="p"
                  className="text-error text-xs"
                />
              </div>
            </section>
            {/* Material */}
            <section className="flex justify-between gap-2 items-center">
              <p className="w-2/4">Đơn vị</p>
              <div className="flex flex-col gap-1 w-full">
                <Select
                  className="w-full"
                  showSearch
                  placeholder="Vui lòng chọn đơn vị"
                  defaultValue={props.listMaterial[0].value}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={props.listMaterial}
                  onChange={(event) => {
                    console.log("🚀 ~ file: CreateIngredientModal.js:117 ~ CreateIngredientModal ~ event:", event)
                    setFieldValue("materialName", event);
                  }}
                />
                <ErrorMessage
                  name="materialName"
                  component="p"
                  className="text-error text-xs"
                />
              </div>
            </section>
            {/* Quantity */}
            <section className="flex justify-between gap-2 items-center">
              <p className="w-2/4">Số lượng ban đầu</p>
              <div className="flex flex-col gap-1 w-full">
                <InputNumber
                  min={1}
                  defaultValue={1}
                  className="w-full"
                  onChange={(event) => {
                    setFieldValue("originalQuantity", event);
                  }}
                />
                <ErrorMessage
                  name="originalQuantity"
                  component="p"
                  className="text-error text-xs"
                />
              </div>
            </section>
            {/* Quantity */}
            <section className="flex justify-between gap-2 items-center">
              <p className="w-2/4">Số lượng thiểu</p>
              <div className="flex flex-col gap-1 w-full">
                <InputNumber
                  min={1}
                  defaultValue={1}
                  className="w-full"
                  onChange={(event) => {
                    setFieldValue("limitQuantity", event);
                  }}
                />
                <ErrorMessage
                  name="limitQuantity"
                  component="p"
                  className="text-error text-xs"
                />
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default CreateIngredientModal;
