import express from "express"
import { PrismaClient } from "@prisma/client";
import { hospitalRouter } from "./routes/hospitalRoutes.js";
import { inventoryRouter } from "./routes/inventoryRoute.js";
import { doctorRouter } from "./routes/doctorRoute.js";
import { sendOTP, verifyotp } from "./middleware/auth.js";
import cors from "cors"

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());
app.listen(process.env.BACKEND_PORT,()=>{
    console.log("running")
})

app.use("/api/hospital",hospitalRouter)
app.use("/api/inventory",inventoryRouter)
app.use("/api/doctor",doctorRouter)
app.post("/api/sendotp",sendOTP)
app.post("/api/verifyotp",verifyotp)


app.post("/api/test",async (req,res)=>{
    try{
        const newData = await prisma.hospital.create({
            data:{
                name:req.body.name
            }
        })
        res.json({success:true,message:newData})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err});
    }
})

app.delete("/delete",async(req,res)=>{
    await prisma.hospitals.deleteMany({

    })
    res.json({success:true,message:"Successfully Deleted"})
})