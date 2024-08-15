import {  PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import validator from "validator"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


const hospitalRegister = async (req,res)=>{
    try{
        const {name,location,contact,email,password,type,city,state} = req.body;
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Email doesnot exist"});
        }
        if(password.length < 8){
            return res.json({success:false,message:"Password isn't strong"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt)
        const newHospital = await prisma.hospitals.create({
            data:{
                name,
                location,
                contact,
                email,
                 type: type === 'Private' ? HospitalType.Private : HospitalType.Government,
                city,
                state,
                password:hashedPass
            }
        })
        const token = createToken(newHospital.id)
        console.log(token)
        res.json({success:true,message:newHospital,token:`Bearer ${token}`})
    }catch(err){
        console.log(err);
        res.json({success:false,message:err});
    }
}
const hospitalLogin = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const Hospital = await prisma.hospitals.findUnique({
            where:{
                email:email
            }
        })
        if(!Hospital){
            return res.json({success:false,message:"Hospital Email not found"})
        }
        const match = await bcrypt.compare(password,Hospital.password)
        if(!match){
            return res.json({success:false,message:"Invalid crediantails"})
        }
        const token = await createToken(Hospital.id);
        res.json({success:true,token:`Bearer ${token}`})
    }catch(err){
        console.log(err);
        res.json({success:false,message:err});
    }
}

export {hospitalRegister,hospitalLogin}