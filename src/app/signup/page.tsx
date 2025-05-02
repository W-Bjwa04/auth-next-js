"use client"
import React, { useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
export default function SignUpPage(){

    const router = useRouter()  // navigate the user to the login page after signup 

    const [user,setUser] = React.useState({
        username:"",
        email:"",
        password:""
    })

    const [buttonDisabled,setbuttonDisabled] = React.useState(true)


    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setbuttonDisabled(false)
        }else{
            setbuttonDisabled(true)
        }
    },[user])

    const onSignUp = async ()=>{
        try{
            setLoading(true)

            const response = await axios.post("/api/users/signup",user)
            console.log("User Created Successfully",response.data)
            router.push("/login")

        }
        catch(error){
            // set up the react toast later 
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const [loading,setLoading] = React.useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    {
                        loading ? "Processing" : "Sign Up"
                    }
                </h1>
                
                <div className="space-y-4">
            
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
                    <input 
                    
                    value={user.username}

                    onChange={ (event)=>{
                        setUser({...user,username:event.target.value})
                    }}
                    
                    id="username" type="text" placeholder="Enter username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

       
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

              
                <button className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                onClick={onSignUp}
                >
                    {
                        buttonDisabled ? "No SignUp":"Signup"
                    }
                </button>
                </div>

                <Link className="text-blue-600 hover:underline" href="/login">Go To Login Page</Link>
            </div>
        </div>

    )
}

