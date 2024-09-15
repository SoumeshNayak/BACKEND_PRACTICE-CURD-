const express=require('express')
const app=express()
const path=require('path')
const userModel=require('./models/user')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"public")))

app.set("view engine" , "ejs")


app.get('/',(req,res)=>{
    res.render("index")
})

app.get('/users',(req,res)=>{
    res.render("users")
})
app.get('/back',(req,res)=>{
    res.redirect('/')
})
app.get('/read',async(req,res)=>{
    let allUsers=await userModel.find()
    res.render('users',{allUsers})
})
app.post('/create',async(req,res)=>{
let {username,email,image} = req.body;
let createdUser = await userModel.create({
        username,email,image
    })
    //res.send(createdUser)
    res.redirect('/read')
})

app.get('/delete/:id',async(req,res)=>{
    let delUser= await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect('/read')
})

app.get('/edit/:id',async(req,res)=>{
    let currentUser= await userModel.findOne({_id: req.params.id})
    res.render('edit',{currentUser})
})

app.post('/update/:id',async(req,res)=>{
    let {username,email,image} = req.body;
    await userModel.findOneAndUpdate({_id: req.params.id},{username,email,image},{new: true})
    res.redirect('/read')
})


app.listen(3000,()=>{
    console.log("Backend Stated");
    
})