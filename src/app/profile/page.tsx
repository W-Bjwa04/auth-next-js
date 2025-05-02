"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"


export default function ProfilePage() {
  const [user,setUser]:any = React.useState("no-user")
  const router = useRouter()


  // function for fetch the user details 

  const getUser = async ()=>{
    const response:any = await axios("/api/users/me")
    console.log(response)

    const userLoggedIn = response?.data.user
    setUser(userLoggedIn)
  }

  useEffect(()=>{
    getUser()
  },[])

  const onLogout = async ()=>{
    try {
       const response = await axios.get("/api/users/logout")
       console.log("logout successfull",response.data)
       // set the toast 
       // redirect to the login page
       router.push("/login")

    } catch (error:any) {
      console.log("Error while logout",error)
      // set up the toast later 
    }
  }


  return (
          <div className="flex flex-col justify-between h-screen bg-gray-100">
        {/* Logout Button (Top Right) */}
        <div className="flex justify-end p-4">
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        {/* Centered Welcome Message */}
        <div className="flex flex-col items-center justify-center flex-1 space-y-4">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-800">Welcome </span>
            <span className="ml-2 text-white p-2 bg-green-500 rounded">
              {user ? user.username : "no-user"}
            </span>
          </h1>
        </div>
      </div>

  );
}
