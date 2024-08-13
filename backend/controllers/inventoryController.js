import { InventoryCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const add = async(req,res) =>{
    console.log("HI")
    const {itemName,category,quantity,price,reorderLevel,lastOrderDate,expiryDate} = req.body;
    try{
        let categoryType = "";
        if(category === "Medicine") categoryType = InventoryCategory.Medicine;
        else if(category === "Surgical_Tools") categoryType = InventoryCategory.Surgical_Tools;
        else categoryType = InventoryCategory.Others
        const newMedicine = await prisma.inventory.create({
            data:{
                itemName,
                category:categoryType,
                quantity:parseInt(quantity),
                price:parseFloat(price),
                reorderLevel: parseInt(reorderLevel),
                lastOrderDate:new Date(lastOrderDate),
                stockBatches:[{
                    quantity:parseInt(quantity),
                    expiryDate:new Date(expiryDate)
                }],
                hospitalId : req.headers.id
            }
        })
        res.json({success:true,data:newMedicine})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err})
    }
}
const patientBuys = async(req,res)=>{
    const {contact,patientName,items} = req.body;
    try{
        let purchased = [];
        let reOrderLevelDecreased = [];
        let no_quantity = []
        for(const item of items){
            const  {itemId,quantity} = item;
            const inventoryItem = await prisma.inventory.findUnique({
                where:{
                    id:itemId
                },select:{
                    quantity:true,
                    reorderLevel:true
                }
            })
            if(!inventoryItem){
                return res.json({success:false,message:"No Such Item",itemId:itemId})
            }
            if(item.quantity < quantity){
                no_quantity.push(itemId);
            }
            const updatedItem = await prisma.inventory.update({
                where:{
                    id:itemId
                },data:{
                    quantity: inventoryItem.quantity - quantity
                }
            })
            if(updatedItem.quantity <= updatedItem.reorderLevel){
                reOrderLevelDecreased.push(itemId)
            }
        }
        res.json({success:true,message:"Successfully updated all the items",reOrder:reOrderLevelDecreased,Lessquantity:no_quantity})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err})
    }
}
const listInventory = async(req,res)=>{
    try{
        const items = await prisma.inventory.findMany({
            select:{
                id:true,
                itemName:true,
                price:true,
                reorderLevel:true
            }
        })
        res.json({success:true,data:items})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err});
    }
}

const editExistingItem = async(req,res)=>{
    const {items} = req.body;
    try{
        for(const item of items){
            const {itemId,quantity2,reorderLevel,lastOrderDate,expiryDate} = item;
            const inventoryItem = await prisma.inventory.findUnique({
                where:{
                    id:itemId
                }
            })
            const existingBatch = inventoryItem.stockBatches.find(batch =>{
                if(new Date(batch.expiryDate).getTime() === new Date(expiryDate).getTime()){
                    batch.expiryDate = new Date(expiryDate).getTime();
                }
            })
            if(existingBatch){
                
            }
        }
    }catch(err){
        console.log(err);
        res.json({success:false,message:err})
    }
}
export {add,listInventory,patientBuys,editExistingItem}