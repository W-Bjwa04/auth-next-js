import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userSchema"



connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){  // verification failed 
            return NextResponse.json(
            {error:"Invalid Token"},
            {status:400}
        )}


        user.isVerified = true 
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined 

        await user.save()

        return NextResponse.json({
            message:"email verification successfull",
            success:true
        })

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },
        {
            status:500
        }
    )
    }
}