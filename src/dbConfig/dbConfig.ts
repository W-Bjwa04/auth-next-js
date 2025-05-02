import mongoose, { connection } from "mongoose"

const connect = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI!)  // ! tell it will be handled by user if not available becuase this is ts 
        const connection = mongoose.connection 

        // fire up multiple events of the mongoose 

        connection.on('connected',()=>{
            console.log("MongoDb Connected Successfully");
            
        })

        connection.on("error",(err)=>{
            console.log("MongoDb Connection Failed.Make Sure Database is connected");
            console.log(err);

            process.exit()
            
        })
    } catch (error) {
        console.log("Something Went Wrong");
        console.log(error);
    }
}

export {connect}