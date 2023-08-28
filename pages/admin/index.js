import { useSession } from "next-auth/react";
import Link from "next/link";

function Index() {
  const { data: session } = useSession();

  if (!session) {
    return <div>You need to be signed in to access this page.</div>;
  }
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Hello admin!</h1>
      <div className="w-10/12 flex flex-col p-4">
        <Link href="/admin/category" className="py-4">Danh mục</Link>
        <Link href="/admin/product">Sản phẩm</Link>
      </div>
    </>
  );
}

export default Index;
