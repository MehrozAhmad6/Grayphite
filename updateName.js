const express = require('express');
const route = express.Router();
const model = require('./practiceModel');
route.use(express.json());
update = () => {
  route.post('/update/:id', async (req, res) => {
    console.log("Byeeeeeeeeee")
    try {
      const practice = await model.findByIdAndUpdate(req.params.id);
      let updatedName = req.body.name;
      let updatedmail = req.body.email;
      let updatedPassword = req.body.password;
      let updatedAddress = { 
        updatedStreet: req.body.address.street,
        updatedCity: req.body.address.city,
        updatedZipcode: req.body.address.zipCode,
      };
      let updatedRole = req.body.role;  
      let updatedLoggedInTime = req.body.loggedInTime;  
      practice.name = updatedName;
      practice.email = updatedmail;
      practice.password = updatedPassword;
      practice.address = updatedAddress;
      practice.street=updatedStreet;
      practice.city=updatedCity;
      practice.zipCode=updatedZipcode;
      practice.role = updatedRole;
      practice.loggedInTime = updatedLoggedInTime;
      const updatedPractice = await practice.save();
      res.json(updatedPractice);
    } catch (err) {
      console.log("Error is", err);
      res.status(500).json({ error: "Failed to update data" });
    }
  });
};

module.exports = update;
