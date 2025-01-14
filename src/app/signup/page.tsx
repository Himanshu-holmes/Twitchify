"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        type="text"
        placeholder="username"
      />
      <label htmlFor="username">email</label>
      <input
        className="p-2 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="username"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="text"
        placeholder="email"
      />
      <label htmlFor="username">password</label>
      <input
        className="p-2 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="username"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        placeholder="password"
      />
      <button onClick={onSignUp} className="p-2 rounded-lg focus:outline-none focus:border-gray-600 bg-black border border-gray-100 my-2">{
        buttonDisabled ? "No signup" : "Signup"}</button>
        <Link href={"/login"}>Visit login page</Link>
    </div>
  );
}
export default SignUp;
