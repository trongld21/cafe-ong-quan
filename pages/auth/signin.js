import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/admin");
    }
  };
  return (
    <div>
      <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Sign in
              </h1>
            </div>
            <div className="m-7">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    value={userInfo.email}
                    onChange={({ target }) =>
                      setUserInfo({ ...userInfo, email: target.value })
                    }
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    value={userInfo.password}
                    onChange={({ target }) =>
                      setUserInfo({ ...userInfo, password: target.value })
                    }
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                {/* <p className="text-sm text-center text-gray-400">
                  Don't have an account yet?{" "}
                  <a
                    href="#!"
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >
                    Sign up
                  </a>
                  .
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
