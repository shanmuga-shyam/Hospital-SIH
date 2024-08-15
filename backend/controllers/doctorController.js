import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const doctorRegister = async(req,res) =>{
    const {name,contact,email,availableSlots,departmentId,hospitalId,password} = req.body;
    try{
    const newDoctor = await prisma.doctors.create({
        name:name,
        contact:contact,
        email:email,
        password:password,
        active:true,
        departmentId:departmentId,
        hospitalId:hospitalId
    })
    res.json({success:true,data:newDoctor})
    }catch(err){
        console.log(err)
        res.json({success:false,message:err})
    }
}

const doctorLogin = async(req,res) =>{
    const {email,password} = req.body;
    



}


export {doctorRegister}