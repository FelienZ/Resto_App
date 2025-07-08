const express = require('express');
const port = 3000;
const fs = require('fs/promises');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const id = require('./utils/idGenerator');
const session = require('express-session');
const bcrypt = require('bcrypt');

//middleware built-in json parse req
app.use(express.json());

//middleware built-in static asset
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(expressLayouts);

//middleware parsing data form HTML
app.use(express.urlencoded({ extended: true }));
//middleware session

require('dotenv').config();
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

//DB
const dbConnect = require('./database/db');
const User = require('./models/User');
const Reviews = require('./models/Reviews');
const Order = require('./models/Orders');
dbConnect();

app.get('/', async (req, res)=>{
  // res.status(200).sendFile(path.join(__dirname, 'resto.html'))
  const filePath = path.join(__dirname, 'data', 'menu.json');
  // const testiPath = path.join(__dirname, 'data', 'testimonials.json');
  const review = await Reviews.find();
  const menu = JSON.parse(await fs.readFile(filePath, 'utf-8'));
  // const testimonials = JSON.parse(await fs.readFile(testiPath, 'utf-8'));
  res.render('resto', {
    layout: 'layouts/main',
    title: 'Resto App',
    menu,
    user: req.session.user,
    // testimonials,
    review,
    pageTitle: 'Resto App' });
});

app.get('/review', async (req, res)=>{
  // res.status(200).sendFile(path.join(__dirname, 'customer.html'));
  // const testiPath = path.join(__dirname, 'data', 'testimonials.json');
  // const testimonials = JSON.parse(await fs.readFile(testiPath, 'utf-8'));
  const review = await Reviews.find();
  res.render('review', {
    layout: 'layouts/main',
    title: 'Customer Pages',
    user: req.session.user,
    // testimonials,
    review,
    pageTitle: 'Customer Pages' });
});

app.post('/checkout', async (req, res)=>{
  const { nama, jumlah, hargaTotal  } = req.body;
  const users = req.session.user;
  try {
    const createdAt = new Date().toISOString();
    if (users != undefined){
      const userData = await User.findOne({ email : req.session.user.email });
      const idUser = userData._id;
      const newOrders = new Order({
        id: idUser,
        userName: req.session.user.name,
        name: nama,
        totalItem: jumlah,
        totalPrice: hargaTotal,
        createdAt,
      });
      await newOrders.save();
      res.status(201).json({
        message: 'Berhasil Memesan!',
        type: 'success'
      });
    }
  } catch (err){
    console.error('Error saat post', err);
    res.status(500).json({
      message: 'Gagal menyimpan review',
      type: 'error' });

  }
});

app.post('/review', async (req, res)=>{
  const { comment, rating } = req.body;
  if (!comment || !rating){
    return res.status(400).json({
      message: 'Silahkan Isi Form dulu',
      type: 'error'
    });
  }
  try {
    const userData = await User.findOne({ email: req.session.user.email });
    const idUser = userData._id;
    const createdAt = new Date().toISOString();
    const newReview = new Reviews({
      id: idUser,
      name: req.session.user.name,
      rating: Number(rating),
      comment,
      createdAt
    });
    await newReview.save();
    res.status(201).json({
      message: 'Berhasil Menambahkan!',
      type: 'success'
    });
  } catch (err){
    console.error('Error saat post', err);
    res.status(500).json({
      message: 'Gagal menyimpan review',
      type: 'error' });
  }
});
app.get('/menu', async (req, res)=>{
  // res.status(200).sendFile(path.join(__dirname, 'menu.html'));
  const filePath = path.join(__dirname, 'data', 'menu.json');

  const menu = JSON.parse(await fs.readFile(filePath, 'utf-8'));
  res.render('menu', {
    layout: 'layouts/main',
    title: 'Menu Pages',
    user: req.session.user,
    menu,
    pageTitle: 'Menu Pages' });
});

app.post('/menu', async (req, res)=>{
  try {
    try {
      const filePath = path.join(__dirname, 'data', 'menu.json');
      const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
      const newId = id;
      const { pic, menuName, price } = req.body;
      const newData = {
        id:newId,
        pic: pic,
        menuName: menuName,
        price: price
      };
      if (typeof(pic) !== 'string' || typeof(menuName) !== 'string' || typeof(price) !== 'number' || pic.trim() == '' || menuName.trim() == '' || price <1){
        res.status(400).send({ message: 'Invalid Data!' });
        return;
      }
      data.push(newData);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      res.status(201).send({ message: 'Successfully Added' });
    } catch (zero){
      const data = [];
      const filePath = path.join(__dirname, 'data', 'menu.json');
      const newId = id;
      const { pic, menuName, price } = req.body;
      const newData = {
        id: newId, pic, menuName, price
      };
      if (typeof(pic) !== 'string' || typeof(menuName) !== 'string' || typeof(price) !== 'number' || pic.trim() === '' || menuName.trim() === '' || price <1){
        res.status(400).send({ message: 'Invalid Data!' });
        return;
      }
      data.push(newData);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      res.status(201).send({ message: 'Successfully Added' });
    }
  } catch (err){
    res.status(404).send({ message: 'Not Found!' });
  }
});

app.post('/login', async (req, res)=>{
  const { email, password } = req.body;
  if (!email || !password){
    return res.status(400).json({
      message: 'Mohon Isi Data dengan Benar!',
      type: 'error'
    });
  }
  // const akun = await(fs.readFile(path.join(__dirname, 'data', 'register.json')));
  // const data = JSON.parse(akun);
  // const user = data.find((d) => d.email == email);
  const entity = await User.findOne({ email });
  if (!entity){
    return res.status(404).json({
      message: 'Akun Tidak Ditemukan!',
      type: 'error'
    });
  }
  try {
    const isMatch = await bcrypt.compare(password, entity.password);
    if (!isMatch){
      return res.status(404).json({
        message: 'Password Salah!',
        type: 'error'
      });
    }

    req.session.user = {
      name: entity.name,
      email: entity.email
    };

    res.status(200).json({
      message: 'Login berhasil',
      type: 'success'
    });
  } catch (err){
    console.error(err);
    res.status(500).send({ message: 'Gagal Login!', type: 'error' });
  }

});

app.post('/register', async (req, res) =>{
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Mohon Isi Data Dengan Benar!',
      type: 'error'
    });
  }
  if (password.length < 5) {
    return res.status(400).json({
      message: 'Password Minimal 5 karakter!',
      type: 'error'
    });
  }
  // const filePath = path.join(__dirname, 'data', 'register.json');
  // const users = JSON.parse(await (fs.readFile(filePath, 'utf-8')));
  // const isExist = users.find((u) => u.email == email);

  const isExist = await User.findOne({ email });
  if (isExist) {
    return res.status(400).json({
      message: 'Email Sudah Dipakai!',
      type: 'error'
    });
  }
  try {
    const hashed = await bcrypt.hash(password, 5);
    // users.push({ name, email, password: hashed });
    // await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    const newUser = new User({
      name: name,
      email: email,
      password: hashed
    });

    await newUser.save();
    res.status(201).json({
      message: 'Berhasil Daftar!',
      type: 'success'
    });
  } catch (err){
    console.error(err);
    res.status(500).send({ message: 'Gagal Registrasi!', type: 'error' });
  }
});

app.get('/logout', (req, res)=>{
  req.session.destroy((err)=>{
    if (err) res.status(500).json({
      message: 'Gagal Logout!',
      type: 'error'
    });
    res.status(200).json({
      message: 'Berhasil Logout!',
      type: 'success'
    });
  });
});

app.use('/', (req, res) =>{
  res.status(404).send({ message: 'Page Not Found' });
});
app.listen(port, '0.0.0.0', ()=>{
  console.log(`Server Run at http://localhost:${port}`);
});