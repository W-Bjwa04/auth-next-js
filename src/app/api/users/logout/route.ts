import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userSchema"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


export  async function GET(request:NextRequest){

    try {
        const response = NextResponse.json(
            {
                message:"Logout Successfull",
                success:true
            }
             )
            // set the cookies to empty 

            response.cookies.set("token","",
                {
                    httpOnly:true
                }
            )

            return response
        
    } catch (error:any) {
        return NextResponse.json({
            "message":error,
            success:false
        },{status:400})
    }

}