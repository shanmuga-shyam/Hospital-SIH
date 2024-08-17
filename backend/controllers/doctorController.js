import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import validator from "validator";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const doctorRegister = async(req,res) =>{
    console.log(req.body)
    const {name,contact,email,departmentId,hospitalId,password} = req.body;
    try{
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Email doesnot exist"});
        }
        if(password.length < 8){
            return res.json({success:false,message:"Password isn't strong"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt)
        const newDoctor = await prisma.doctors.create({
            data:{
                name:name,
            contact:contact,
            email:email,
            password:hashedPass,
            active:true,
            departmentId:departmentId,
            hospitalId:hospitalId
            }
        })
        const token = createToken(newDoctor.id)
        res.json({success:true,token:`Bearer ${token}`})
    }catch(err){
        console.log(err)
        res.json({success:false,message:err})
    }
}


const doctorLogin = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const doctor = await prisma.doctors.findUnique({
            where:{
                email:email
            },select:{
                password:true
            }
        })
        if(!doctor){
            res.json({success:false,message:"Email not found"})
        }
        const passVerify = await bcrypt.compare(password,doctor.password);
        if(!passVerify){
            res.json({success:false,message:"Invalid Crediantials"})
        }
        const token = createToken(doctor.id);
        res.json({success:true,token:`Bearer ${token}`})
    }catch(err){
        console.log(err);
        res.json({success:false,message:err})
    }
}


export {doctorRegister,doctorLogin}