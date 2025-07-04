const mongoose = require('mongoose');
require('dotenv').config();

async function DBConnect(){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Berhasil Terkoneksi Dengan MongoDB');
  } catch (err){
    console.error('Gagal Terkoneksi Dengan MongoDB', err.message);
  }
}

module.exports = DBConnect;