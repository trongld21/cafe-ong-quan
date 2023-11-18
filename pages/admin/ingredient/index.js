import {
    Button,
    Input,
    Modal,
    Table
} from "antd";
import {
    addDoc,
    collection,
    getDocs,
    query,
    where
} from "firebase/firestore";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import CreateIngredientModal from "../../../components/Modal/CreateIngredientModal";
import CreateWarehouseModal from "../../../components/Modal/CreateWarehouseModal";
import { validateCreateMaterial } from "../../../constant";
import { firestore } from "../../../firebase";
  const { TextArea } = Input;
  
  const column = [
    {
      title: "Tên nguyên liệu",
      dataIndex: "ingredientName",
      render: (ingredientName) => <p>{ingredientName}</p>,
    },
    {
      title: "Tên đơn vị",
      dataIndex: "materialName",
      render: (materialName) => <p>{materialName}</p>,
    },
    {
      title: "Số lượng ban đầu",
      dataIndex: "originalQuantity",
      render: (originalQuantity) => <p>{originalQuantity}</p>,
    },
    {
      title: "Số lượng hiện tại",
      dataIndex: "currentQuantity",
      render: (currentQuantity) => <p>{currentQuantity}</p>,
    },
  ];
  
  export default function WareHouse() {
    const [data, setData] = useState();
    const [isShowMaterial, setIsShowMaterial] = useState(false);
    const [isShowWareHouseModal, setIsShowWareHouseModal] = useState(false);
    const [isShowCreateIngredient, setIsShowCreateIngredient] = useState(false);
    const [listMaterial, setListMaterial] = useState(null);
    const [listProduct, setListProduct] = useState([]);
  
    const createMaterial = async (values) => {
      try {
        const materialCollection = collection(firestore, "material");
  
        // Kiểm tra xem có document nào có materialName trùng không
        const querySnapshot = await getDocs(
          query(
            materialCollection,
            where("materialName", "==", values.materialName)
          )
        );
  
        if (!querySnapshot.empty) {
          // Nếu có document trùng, hiển thị thông báo và không thêm mới
          alert("Tên vật liệu đã tồn tại trong database.");
        } else {
          // Nếu không có document trùng, thêm mới vào database
          setIsShowMaterial(false);
          await addDoc(materialCollection, values);
          alert("Thêm thành công");
          getMaterialList();
        }
      } catch (error) {
        console.error("Error creating material:", error);
      }
    };
  
    const getMaterialList = async () => {
      try {
        const materialCollection = collection(firestore, "material");
        const querySnapshot = await getDocs(materialCollection);
  
        const materialList = [];
        querySnapshot.forEach((doc) => {
          // Lấy dữ liệu từ mỗi document và thêm vào danh sách
          materialList.push({
            value: doc.data().materialName,
            label: doc.data().materialName,
          });
        });
        setListMaterial(materialList);
      } catch (error) {
        console.error("Error getting material list:", error);
        throw error;
      }
    };
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "ingredient"));
        const queryResult = querySnapshot.docs.map((doc) => doc.data());
        setData(queryResult);
      } catch (error) {
        console.error("Lỗi khi tải danh sách giao dịch:", error);
      }
    };
  
    const fetchListIngredient = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "ingredient"));
        const queryResult = querySnapshot.docs.map((doc) => ({
          value: doc.id,
          label: doc.data().ingredientName,
        }));
        setListProduct(queryResult);
      } catch (error) {
        console.error("Lỗi khi tải danh sách giao dịch:", error);
      }
    };
  
    useEffect(() => {
      getMaterialList();
      fetchData();
      fetchListIngredient();
    }, []);
  
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
                  <div className="flex flex-col gap-1 w-full">
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
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <Button onClick={() => setIsShowMaterial(true)}>Thêm đơn vị</Button>
            <Button onClick={() => setIsShowWareHouseModal(true)}>
              Xuất nhập kho
            </Button>
            <Button onClick={() => setIsShowCreateIngredient(true)}>
              Thêm mới nguyên liệu
            </Button>
          </div>
          <Table
            columns={column}
            dataSource={data}
            size="middle"
            pagination={{ pageSize: 31 }}
          />
        </div>
  
        <CreateIngredientModal
          isShowCreateIngredient={isShowCreateIngredient}
          setIsShowCreateIngredient={setIsShowCreateIngredient}
          listMaterial={listMaterial}
          fetchData={fetchData}
          fetchListIngredient={fetchListIngredient}
        />
  
        <CreateWarehouseModal
          listProduct={listProduct}
          isShowWareHouseModal={isShowWareHouseModal}
          setIsShowWareHouseModal={setIsShowWareHouseModal}
          fetchData={fetchData}
        />
      </AdminLayout>
    );
  }
  