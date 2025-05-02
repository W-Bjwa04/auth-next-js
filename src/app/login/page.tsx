"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"



export default function LoginPage(){
    const router = useRouter()
    const [user,setUser] = React.useState({
        email:"",
        password:""
    })

    const [buttonDisabled,setbuttonDisabled] = React.useState(true)


    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setbuttonDisabled(false)
        }else{
            setbuttonDisabled(true)
        }
    },[user])

    const onLogin = async ()=>{
        try {
            setLoading(true)
            
            const response = await axios.post("/api/users/login",user)
            console.log("User login successfully")
            router.push("/profile")
        } catch (error) {

            console.log("Login Falied",error)

            // setup the toast later 
            
        } finally{
            setbuttonDisabled(false)
        }
    }

    const [loading,setLoading] = React.useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
                {
                    loading ? "Processing":"Login"
                }
            </h1>
            
            <div className="space-y-4">
        
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                <input 
                value = {user.email}
                onChange={(event)=>{
                    setUser({...user,email:event.target.value})
                }}
                
                id="email" type="email" placeholder="Enter email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

  
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                <input 
                 value={user.password}
                 onChange={(event)=>{
                     setUser({...user,password:event.target.value})
                 }}
                id="password" type="password" placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

          
            <button 
            
            onClick = {onLogin}
            
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                {
                    buttonDisabled ? "No Login":"Login"
                }
            </button>
            </div>

            <Link className="text-blue-600 hover:underline" href="/signup">Go To SignUP Page</Link>
        </div>
    </div>

    )
}