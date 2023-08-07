const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
});
const practiceSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  street: { type: String, required: false },
  city: { type: String, required: false },
  zipCode: { type: String, required: false },
  role: { type: String, required: false },
  loggedInTime: { type: String },
  token: { type: String },
  appointments: [appointmentSchema],
});
practiceSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.log('Error is ', err);
    next(err);
  }
});
appointmentSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.log('Error is ', err);
    next(err);
  }
});
const Practice = mongoose.model('Practice', practiceSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = { Practice, Appointment };