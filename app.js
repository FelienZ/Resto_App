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
app.use(session({
  secret: 'app-resto-credentials',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

app.get('/', async (req, res)=>{
  // res.status(200).sendFile(path.join(__dirname, 'resto.html'))
  const filePath = path.join(__dirname, 'data', 'menu.json');
  const testiPath = path.join(__dirname, 'data', 'testimonials.json');
  const menu = JSON.parse(await fs.readFile(filePath, 'utf-8'));
  const testimonials = JSON.parse(await fs.readFile(testiPath, 'utf-8'));
  res.render('resto', {
    layout: 'layouts/main',
    title: 'Resto App',
    menu,
    user: req.session.user,
    testimonials,
    pageTitle: 'Resto App' });
});

app.get('/review', async (req, res)=>{
  // res.status(200).sendFile(path.join(__dirname, 'customer.html'));
  const testiPath = path.join(__dirname, 'data', 'testimonials.json');
  const testimonials = JSON.parse(await fs.readFile(testiPath, 'utf-8'));
  res.render('review', {
    layout: 'layouts/main',
    title: 'Customer Pages',
    user: req.session.user,
    testimonials,
    pageTitle: 'Customer Pages' });
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
  const akun = await(fs.readFile(path.join(__dirname, 'data', 'register.json')));
  const data = JSON.parse(akun);
  const user = data.find((d) => d.email == email);
  if (!user){
    return res.status(404).json({
      message: 'Akun Tidak Ditemukan!',
      type: 'error'
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    return res.status(404).json({
      message: 'Password Salah!',
      type: 'error'
    });
  }

  req.session.user = {
    name: user.name,
    email: user.name
  };

  res.status(200).json({
    message: 'Login berhasil',
    type: 'success'
  });
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
  const filePath = path.join(__dirname, 'data', 'register.json');
  const users = JSON.parse(await (fs.readFile(filePath, 'utf-8')));
  const isExist = users.find((u) => u.email == email);
  if (isExist) {
    return res.status(400).json({
      message: 'Email Sudah Dipakai!',
      type: 'error'
    });
  }
  const hashed = await bcrypt.hash(password, 5);
  users.push({ name, email, password: hashed });
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  res.status(201).json({
    message: 'Berhasil Daftar!',
    type: 'success'
  });
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