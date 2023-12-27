import mongoose from "mongoose";

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
    }catch (error) {
        throw new Error ("Conexion fallida!");
    }
};

export default connect;