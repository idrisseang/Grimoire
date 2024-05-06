const User = require("../models/User")
const bcrypt= require("bcrypt")
const secretKey = require("../key")
const jwt = require("jsonwebtoken")


async function hashPassword(password) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

async function verifyPassword(password,hashedPassword){
    return await bcrypt.compare(password,hashedPassword)
}

function generateToken(id,secret){
    return jwt.sign(
        {userId:id},
        secret,
        {expiresIn:"1h"}
        
    )
}

exports.createUser = async (req, res) => { 
    const user = new User({ 
      email: req.body.email, 
      password: await hashPassword(req.body.password) 
    });
    await user.save() 
      .then(() => res.status(201).json({ message: 'Utilisateur inscrit !'}))
      .catch(error=> res.status(400).json({error}))
  }

  exports.loginUser = (req,res)=>{
    User.findOne({email: req.body.email})
    .then(
        async (user) => { 
            if(user){ 
                const matchPassword = await verifyPassword(req.body.password,user.password)
                if(matchPassword){  
                    const token = generateToken(user._id,secretKey)
                    res.json({userId: user._id, token})
                }else{ 
                    res.status(401).json({message: "Identifiants incorrects"}) 
                }
            }else{
                res.status(404).json({message: "Utilisateur introuvable"}) 
            }
        }
    )
    .catch(error => res.status(404).json({error}))

}