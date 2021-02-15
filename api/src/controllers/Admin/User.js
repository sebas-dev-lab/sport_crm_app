// Import  model
const User=require('../../models/Admin/User')
const Contact=require('../../models/Admin/Contact')

//** # Post function # */
exports.create_user= async (req, res)=>{
    const {name, user, password, type, dni, cuil_cuit, admin_name_center, last_name_admin, lat, log}=req.body

// Imput data control
    if(!name || !user || !password || !dni || !cuil_cuit || ! admin_name_center || !last_name_admin || !type) return res.status(404).json({msj: "Error to imput data"})

// Imput data selected control
    if(type!=='admin' || type!=='center') return res.status(404).json({msj: "Type error"})

// Default status=true. Then can change in update route. Transform log/lat to array

    let status= true
    let location=[]
    location.push(parseFloat(lat))
    location.puch(parseFloat(log))
    
// Find de contact data and add to user. 

    Contact.findOne({name_center: name}).then((contact)=>{

// Contol data contact
        if(!contact) return res.status(404).json({msj: 'No contact data'})

        const user= new User(name, user, password, type, dni, cuil_cuit, admin_name_center, last_name_admin, location, status, type, contact)
        await user.save()
        res.status(200).json({msj:'ok', user: user})
    })

}

// ** # Get all Users #
exports.get_all_users=(req, res)=>{
    User.find().then((allUsers)=>{
        if(!allUsers) res.status(400).json({msj:'Users could not be found'})
        res.status(200).json({msj: 'ok', users: allUsers})
    })
}

// ** # Get one user by code #
exports.get_user_code=async (req, res)=>{
    const code= req.params
    if(!code) return res.status(400).json({msj:'Code user error'})
    const user= await User.findOne({code: code})
    if(!user) return res.status(400).json({msj:'User can not be found'})
    res.status(200).json({msj:'ok', user: user})
}

// ** # Get one user by dni / cuil_cuit #
exports.get_user_data= async (req, res)=>{
    const data=req.body
    if(!data) res.status(400).json({msj:'No data'})
    const user_dni= await User.findOne({dni: data})
    if(!user_dni) {
        const user_cuil_cuit= await User.findOne({cuil_cuit: data})
        if (!user_cuil_cuit) return res.status(400).json({msj:'User can not be found'})
        res.status(200).json({msj:'ok', user: user_cuil_cuit})
    } else {
        res.status(200).json({msj:'ok', user: user_dni})
    }
}

//*** # Update data function #
exports.update_user=async(req, res)=>{
    const {code}=req.params
    const {name, user, password, type, dni_cuil_cuit, admin_name_center, last_name_admin, lat, log, status, type} = req.body

// Imput data control
    if(!name || !user || !password || !dni_cuil_cuit || ! admin_name_center || !last_name_admin || !type) return res.status(404).json({msj: "Error to imput data"})

let location=[]
location.push(parseFloat(lat))
location.push(parseFloat(log))

// Find and update user by code
const user= await User.findOneAndUpdate({ code: code}, {
    name, user, password, type, dni_cuil_cuit, admin_name_center, last_name_admin, location, status, type
})

// Control user
if(!user) return res.status(400).json({msj:'User can not be finded'})

return res.status(200).json({msj: 'ok'})
}

//** # Delete User function # */
exports.delete_user= async (req, res)=>{
    const {code}=req.params

// Find and delete user by code
    await User.deleteOne({code: code}, async(err, userDeleted)=>{
        if(err) {console.log(err)
    }

// Find if user was removed and control
    const user=await User.findOne({code: code})
    if(user) return res.status(400).json({msj:'User could not be deleted'})
    return res.status(200).json({msj:'ok'})
})

}