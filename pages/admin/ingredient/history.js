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
import { formatDateTime, validateCreateMaterial } from "../../../constant";
import { firestore } from "../../../firebase";
  const { TextArea } = Input;
  
  const column = [
    {
      title: "Ngày",
      dataIndex: "date",
      render: (date) => <p>{formatDateTime(date)}</p>,
    },
    {
      title: "Tên người nhập",
      dataIndex: "staffName",
      render: (staffName) => <p>{staffName}</p>,
    },
    {
      title: "Phương thức",
      dataIndex: "category",
      render: (category) => <p>{category}</p>,
    },
    {
      title: "Tên nguyên liệu",
      dataIndex: "ingredientName",
      render: (ingredientName) => <p>{ingredientName}</p>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (quantity) => <p>{quantity}</p>,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      render: (note) => <p>{note}</p>,
    },
  ];
  
  export default function WareHouse() {
    const [data, setData] = useState();
    const [isShowWareHouseModal, setIsShowWareHouseModal] = useState(false);
    const [listProduct, setListProduct] = useState([]);
  
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "ingredientHistory"));
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
      fetchData();
      fetchListIngredient();
    }, []);
  
    return (
      <AdminLayout>
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <Button onClick={() => setIsShowWareHouseModal(true)}>
              Xuất nhập kho
            </Button>
          </div>

          <Table
            columns={column}
            dataSource={data}
            size="middle"
            pagination={{ pageSize: 31 }}
          />
        </div>
  
        <CreateWarehouseModal
          listProduct={listProduct}
          isShowWareHouseModal={isShowWareHouseModal}
          setIsShowWareHouseModal={setIsShowWareHouseModal}
          fetchData={fetchData}
        />
      </AdminLayout>
    );
  }
  