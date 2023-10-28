import { Button, Input, Modal } from "antd";
import AdminLayout from "../../components/Layout/AdminLayout";
import { useState } from "react";
import { ErrorMessage, Formik, Form } from "formik";
import { firestore } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { validateCreateMaterial } from "../../constant";

export default function WareHouse() {
  const [isShowMaterial, setIsShowMaterial] = useState(false);

  const createMaterial = async (values) => {
    try {
      console.log(values);
      const materialCollection = collection(firestore, "material");
      setIsShowMaterial(false);
      await addDoc(materialCollection, values);
      alert("Thêm thành công");
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:183 ~ handleSubmitExpend ~ error:",
        error
      );
    }
  };

  return (
    <AdminLayout>
      <Modal
        title="Thêm đơn vị cho sản phẩm"
        open={isShowMaterial}
        onCancel={() => setIsShowMaterial(false)}
        destroyOnClose
        footer={[
          <button
            form={"CreateMaterialForm"}
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
          initialValues={{ materialName: "" }}
          validationSchema={validateCreateMaterial}
          onSubmit={(values) => {
            return createMaterial(values);
            // return handleSubmitExpend(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form id="CreateMaterialForm">
              <div className="flex justify-between gap-2 items-center py-6">
                <p className="w-2/4">Nhập tên đơn vị</p>
                <Input
                  className="w-full"
                  onChange={(event) => {
                    setFieldValue("materialName", event.target.value);
                  }}
                />
                <ErrorMessage
                  name="materialName"
                  component="p"
                  className="text-error text-xs"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <Button onClick={() => setIsShowMaterial(true)}>Thêm đơn vị</Button>
    </AdminLayout>
  );
}
