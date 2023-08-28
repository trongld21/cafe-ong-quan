import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(firestore, "categories"));
      const categoryList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    };
    fetchCategories();
  }, []);
  return (
    <header className="bg-[#e16262] text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">
            <img src="/assets/images/1.png" className="w-24 h-12" alt="logo" />
          </Link>
          <ul className="hidden md:flex space-x-4 ml-6">
            <li>
              <Link href="/">Trang Chủ</Link>
            </li>
            {/* <li>
              <Link href="#">Về Chúng Tôi</Link>
            </li> */}
            <li className="relative group">
              <Link href="#order">Sản Phẩm</Link>
              <ul className="absolute top-full w-64 px-4 -left-4 hidden group-hover:block rounded-lg bg-[#e16262] py-2 space-y-1 z-50">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link href="#order" className="hover:border-b">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* <li>
              <Link href="#">Liên Hệ</Link>
            </li> */}
          </ul>
        </div>
        <div className="md:hidden">
          <button
            className="text-white p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 bg-gray-800 w-full p-4">
              <ul className="space-y-2">
                <li>
                  <Link href="#">Home</Link>
                </li>
                <li>
                  <Link href="#">About</Link>
                </li>
                <li className="relative group">
                  <Link href="#">Services</Link>
                  <ul className="absolute top-full left-0 hidden group-hover:block bg-gray-700 text-sm py-2 space-y-1">
                    <li>
                      <Link href="#">Service 1</Link>
                    </li>
                    <li>
                      <Link href="#">Service 2</Link>
                    </li>
                    <li>
                      <Link href="#">Service 3</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
