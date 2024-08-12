import { InventoryCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const add = async(req,res) =>{
    console.log("HI")
    const {itemName,category,quantity,price,reorderLevel,lastOrderDate,expiryDate} = req.body;
    try{
        const categoryType = "";
        if(category === "Medicine") categoryType = InventoryCategory.Medicine;
        else if(category === "Surgical_Tools") categoryType = InventoryCategory.Surgical_Tools;
        else categoryType = InventoryCategory.Others
        const newMedicine = await prisma.inventory.create({
            data:{
                itemName,
                category:categoryType,
                quantity:parseInt(quantity),
                price:parseFloat(price),
                reorderLevel,
                lastOrderDate,
                expiryDate,
                hospitalId : req.headers.id
            }
        })
        res.json({success:true,data:newMedicine})
    }
    catch(err){
        res.json({success:false,message:err})
    }

}

export {add}