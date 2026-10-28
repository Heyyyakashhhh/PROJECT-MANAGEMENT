import {DB_NAME} from "../../constant.js"
import mongoose from "mongoose"

const connectDB =(async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
         console.log(`\n🔗 mongodb connected: ${connectionInstance.connection.host}`);
    } catch (error) {
          console.log(`\n error: ${error.message}`);
        process.exit(1);
    }
})

export default connectDB