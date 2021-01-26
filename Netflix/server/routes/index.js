const express = require('express')
const router = express.Router()
const passport = require('passport')
const Auth = require('../models/Auth')
const { GoogleAuth  } = require('google-auth-library')

router.post('/api/v1/auth/google', async(req, res) =>{
        const { token } = req.body
        console.log(token)
        const client = new GoogleAuth(process.env.GOOGLE_CLIENT_ID)
        const ticket = await client.verifyIdToken({
            idToken: token,
            client
        });
        const { name, email, picture } = ticket.getPayload();  
        const user = await Auth.upsert({ 
            where: { email: email },
            update: { name, picture },
            create: { name, email, picture }
        })
        res.status(201)
        res.json(user)
})

router.post('/', (req, res) =>{
    res.send('this is home page')
})

router.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callbackurl', passport.authenticate('google', { failureRedirect: '/signin' }),
function(req, res) {
    res.redirect('/')
})

module.exports = router