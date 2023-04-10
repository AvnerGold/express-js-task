const storeItems = require('../db/stores.json');
const express = require('express');
const UserRouter = express.Router();


//GET all the stores in the json file
UserRouter.get('/store',async(req,res)=>{
    try {
        let stores = storeItems;
        res.status(200).json(stores)//just print in thunder client

    } catch (error) {//catch the error
        res.status(500).json({error: "You probably a problem with your Json file start from there"})
    }
    
})

UserRouter.get('/:id',async(req,res)=>{
    let {id} = req.params
    let stores = storeItems;

   console.log(stores);
   
        let storeId = stores.find((u)=> u.id == id)

        if (storeId) {
          res.status(200).json(storeId)
        }
        else{//There is no store like that in the array
            res.status(404).json({message: "store not found"})
        }

})


//Find the specific item from a a store and GET it
UserRouter.get('/:store/:itemId',async(req,res)=>{
    let itemId = req.params.itemId
    let storeName = req.params.store
 
  console.log(itemId,"id")
  
  let stores = storeItems;
  

    let Name = stores.find((u)=> u.storeName == storeName)
    if (Name) {
      
        let item = Name.items.find((s)=> s.itemId == itemId)
        console.log(item, "no");
        
        if (item) {
            res.status(200).json(item)
        }
        else{
            res.status(404).json({message: "item not found"})
        }
    }
    else{//There is no store like that in the array
        res.status(404).json({message: "store not found"})
    }

   

})


//Add a store the the array
UserRouter.post(`/add`, async (req,res) => {
   
    let stores = storeItems;
    try {
        //Get all the data from the body.req
        let {id,storeName,city,items: [{ itemId, itemName, itemPrice, itemPriceDiscount }]} = req.body;
        
        //Create a new array of store with the parameters you got from the body.req
        let newStore = {
            id,
            storeName,
            city,
            items: [
                { itemId, itemName, itemPrice, itemPriceDiscount }
            ]}

        //Push to stores the newstore that you got from the body.rew   
        stores.push(newStore)
           
        res.status(201).json(stores);
    } catch (error) {//catch the error
        res.status(500).json({error:"not working"})
    }
  
     
})


//Add a item product in the store
UserRouter.post(`/:store/items/add`, async (req,res) => {
 let {storeName} = req.params//get the store anem from params
 let allStores = storeItems//get the json file and use it
 let item  = allStores.find((u)=> u.storeName == storeName)//find in the array the store name

 //Get from request of body array 
 let newItem = {
    itemId, itemName, itemPrice, itemPriceDiscount
 } = req.body;
 
 //When you found the item push in the products the new item
 try {
    item.items.push(newItem);
    res.status(201).json(item);
 } catch (error) {//catch the error
    res.status(500).json({error:"not working"})
  } 
})

module.exports = UserRouter;