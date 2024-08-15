import express from "express"
import { PrismaClient } from "@prisma/client";
import { hospitalRouter } from "./routes/hospitalRoutes.js";
import { inventoryRouter } from "./routes/inventoryRoute.js";
import { doctorRouter } from "./routes/doctorRoute.js";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.listen(process.env.BACKEND_PORT,()=>{
    console.log("running")
})

app.use("/api/hospital",hospitalRouter)
app.use("/api/inventory",inventoryRouter)
app.use("/api/doctor",doctorRouter)


app.post("/test",async (req,res)=>{
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
    await prisma.inventory.deleteMany({

    })
    res.json({success:true,message:"Successfully Deleted"})
})

