"use client"
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.post("/api/users/me");
    console.log(res.data.data);
    setData(res.data.data._id);
  };

  const logOut = async () => {
    try {
      await axios.post ("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logOut}>Logout</button>
      <button className="bg-green-500 my-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>getUser detail</button>
    </div>
  );
}
