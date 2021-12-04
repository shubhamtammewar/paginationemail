const express= require('express');
const User= require('../models/user.model');
const transporter= require('../configs/mail')
const router=express.Router();

router.post("/register",async (req,res)=>{
    try {
        const user=await User.create(req.body);
        if (user.role==="student") { 
            var message = {
                from:"abc@server.com",
                to: user.email,
                subject:`Welcome to ABC system ${user.first_name} ${user.last_name}`,
                text:`Hi ${user.first_name}, Please confirm your email address`,
              };
              transporter.sendMail(message);
              var arr=["a@a.com", "b@b.com", "c@c.com", "d@d.com", "e@e.com"];
           
                  var message1={
                    from:"abc@server.com",
                    to:arr,
                    subject :`${user.first_name} ${user.last_name} has registered with us`,
                    text :`Please welcome ${user.first_name} ${user.last_name}`,
                  }
                  transporter.sendMail(message1);
              
        } 
        return  res.status(201).json(user);
    }  catch (e) {
        return res.status(500).json({status: 'failed',message: e.message});
    }
})
router.get('/',async (req,res)=>{
    try {
         const page=req.query.page || 1;
         const size=req.query.size || 2;
         const skip=(page-1)*size;
        const users=await User.find({role:"student"}).skip(skip).limit(size).lean().exec();
       const totalpages=Math.ceil((await User.find({role:"student"}).countDocuments())/size);
       return res.json({users,totalpages});
    }  catch (e) {
        return res.status(500).json({status: 'failed',message: e.message});
    }
});
module.exports=router;