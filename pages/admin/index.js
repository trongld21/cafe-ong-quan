import { useSession } from "next-auth/react";
import Link from "next/link";

function Index() {
  const { data: session } = useSession();

  if (!session) {
    return <div>You need to be signed in to access this page.</div>;
  }
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Trang quản lý tiệm cà phê Ông Quan</h1>
      <div className="w-10/12 flex flex-col p-4">
        <Link href="/admin/thu-chi" className="p-4 border w-fit rounded-lg bg-green-500 text-white">Quản Lý Thu Chi</Link>
      </div>
    </>
  );
}

export default Index;
