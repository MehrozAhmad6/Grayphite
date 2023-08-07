// const mongoose = require('mongoose');
// const bcrypt =require('bcrypt')
// const loginSchema = new mongoose.Schema({
//     email: { type: String,unique:true, required: true },
//     password: { type: String, required: true},
// });
// loginSchema.pre('save', async function (next){
//     try{
//       const salt = await bcrypt.genSalt(10)
//       const hashedPassword =await bcrypt.hash(this.password,salt)
//       this.password=hashedPassword;
//       next();
//     }
//     catch(err)
//     {
//       console.log("Error is ",err)
//     }
// })

// const Practice = mongoose.model('Login', practiceSchema);

// module.exports = Practice;