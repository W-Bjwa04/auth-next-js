import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userSchema"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import {sendmail} from "@/helpers/sendmail"

connect()  // connect to the database 

export async function POST(request:NextRequest){
    try {
        // req.body data 
        const reqBody = await request.json()

        const {username,email,password} = reqBody
        console.log(reqBody);


        // validations 

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User Already Exits"},{status:400})
        }

        // generate the hash password 

        const salt = await bcryptjs.genSalt(10)  // 10 rounds for salt 

        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        // send the verification email 

        await sendmail({email,emailType:"VERIFY",userId:savedUser._id})


        return NextResponse.json({
            message:"user created successfully",
            success:true,
            savedUser
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}