const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

router.post('/signup', (req, res) =>{
    const { name, email , password } = req.body
    if(!name || !email || !password){
        return res.status(422).json({ error: 'Plase fill the all fields' })
    }
    User.findOne({email})
    .then((savedUser) =>{
        if(savedUser){
            return res.status(422).json({ error: 'This email is already exsist' })
        }

        const token = jwt.sign({ name, email, password },process.env.JWT_SECRET_KEY, { expiresIn: '20m' })

        const data = {
            from: 'noreply@gmail.com',
            to: email,
            subject: 'Pixelphant',
            html: `<button>${process.env.CLIENT_URL}/active/${token}</button>`
        };
        mg.messages().send(data, function (error, body) {
            if(error){
                return res.status(400).json({ error: 'Something went wrong' })
            }
            return res.status(200).json({ message: 'Check email & active account' })
        });
        bcrypt.hash(password, 15)
        .then(hashedpassword=>{
            const user = new User({
                name,
                email,
                password:hashedpassword
            })
            user.save()
            .then(user=>{
                res.status(200).json({ message: 'Signup successfully' })
            })
        })

    }).catch(err=>{
        console.log(err)
    })
})

router.post('/signin', (req, res) =>{
    const { email, password } = req.body
    if(!email || !password){
        return res.status(422).json({error: 'Plase fill the all fields' })
    }
    User.findOne({email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({ error: 'Invalid email and password' })
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // return res.status(200).json({ message: 'Signin successfully' })
               const token = jwt.sign({ _id:savedUser._id },process.env.JWT_SECRET_KEY)
               const { name, email, _id } = savedUser
               res.json({ token, user:{ name, email, _id } })
            }
            else{
                return res.status(422).json({ error: 'Invalid email and password' })
            }
        })
    }).catch(error=>{
        console.log(error)
    })
})


module.exports = router