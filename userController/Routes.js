const { Practice, Appointment } = require('../practiceModel');
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')
const insertUser = async (req, res) => {
try 
  {
      let key = process.env.SECRET_KEY;
      let userAppointments = req.body.appointments;
      let appointments = [];
      for (const appointment of userAppointments) {
        let newAppointment = new Appointment({
          name: appointment.name,
          email: appointment.email,
          password: appointment.password,
          token: jwt.sign({ email: appointment.email }, key, { expiresIn: '1h' }),
        });
        appointments.push(newAppointment);
      }
        let newUser = new Practice({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        street: req.body.street,
        city: req.body.city,
        zipCode: req.body.zipCode,
        role: req.body.role,
        loggedInTime: req.body.loggedInTime,
        token: jwt.sign({ email: req.body.email }, key, { expiresIn: '1h' }),
        appointments: appointments,
      });
      const savedUser = await newUser.save();
      return res.json(savedUser);
    } catch (error) {
      console.log('Error', error);
      return res.json({ error: 'Failed to insert user' });
    }
  };
  const updateUser = async (req, res) => {
    try {
      const updatePractice = await Practice.findById(req.params.id).populate('appointments');
      updatePractice.name = req.body.name;
      updatePractice.email = req.body.email;
      updatePractice.password = req.body.password;
      updatePractice.street = req.body.street;
      updatePractice.city = req.body.city;
      updatePractice.zipCode = req.body.zipCode;
      updatePractice.role = req.body.role;
      updatePractice.loggedInTime = req.body.loggedInTime;
      if (req.body.appointments && Array.isArray(req.body.appointments)) {
        for (const [index, updatedAppointment] of req.body.appointments.entries()) {
          if (index < updatePractice.appointments.length) {
            updatePractice.appointments[index].name = updatedAppointment.name;
            updatePractice.appointments[index].email = updatedAppointment.email;
            updatePractice.appointments[index].password = updatedAppointment.password;
            await updatePractice.appointments[index].save();
          } else {
            const newAppointment = new Appointment({
              name: updatedAppointment.name,
              email: updatedAppointment.email,
              password: updatedAppointment.password,
            });
            updatePractice.appointments.push(newAppointment);
          }
        }
      }
      const updatedPractice = await updatePractice.save();
     return res.json(updatedPractice);
    } catch (err) {
      console.log("Error is", err);
     return res.json({ error: "Failed to update data" });
    }
  };  
const deleteUser = async (req, res) => {
    console.log(req.params.id)
  try {
    const deletedPractice = await Practice.findByIdAndDelete(req.params.id);
    if (!deletedPractice) {
      return res.json({ error: 'Practice not found' });
    }
   return res.json({ message: 'Practice deleted successfully' });
  } catch (error) {
    console.log("Error", error);
    return res.json({ error: 'Failed to delete practice' });
  }
};
const getUser = async (req, res) => {
    try {
      const models = await Practice.findById(req.params.id);
      if (!models || models.length === 0) {
        return res.status(400).json({ message: "Records not found" });
      } else {
        return res.status(200).json({ models });
      }
    } catch (err) {
      console.log("Error is", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const loginUser = async (req, res) => {
    try {
      console.log("Heyyyyyyyyyyyyy",req)
      const email = req.body.email;
      const password=req.body.password;  
      const user = await Practice.findOne({ email });
      if (!user) {
        return res.json({ error: 'User not found.' });
      }
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.json({ error: 'Invalid password.' });
      }
      return res.json({ token: user.token, message: 'Login successful.' });    
    } 
    catch (err) {
      console.log("Error is", err);
     return res.json({ error: "There is some issues" });
    }
  };
module.exports = {
  insertUser,
  updateUser,
  getUser,
  deleteUser,
  loginUser
};