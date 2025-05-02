import {connect} from "@/dbConfig/dbConfig"
import { getTokenDetails } from "@/helpers/getTokenDetails"
import User from "@/models/userSchema"
import { NextRequest,NextResponse } from "next/server"




export async function GET(request:NextRequest){
    try {
        const userId = await getTokenDetails(request)
        const user = await User.findOne({_id:userId}).select("-password")
        return NextResponse.json({
            message:"user fetched successfully",
            success:true,
            user
        })
    } catch (error) {
        console.log("error to fetch user details",error)
    }
}