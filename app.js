const express = require('express');
const port = 3000;
const fs = require('fs/promises');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const id = require('./utils/idGenerator');

app.use(express.json());
app.use('/src', express.static(path.join(__dirname, 'src')))
app.use(expressLayouts)

app.set('view engine', 'ejs')

app.get('/', async(req, res)=>{
    // res.status(200).sendFile(path.join(__dirname, 'resto.html'))
    const filePath = path.join(__dirname, 'data', 'menu.json');
    const testiPath = path.join(__dirname, 'data', 'testimonials.json')
    const menu = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    const testimonials = JSON.parse(await fs.readFile(testiPath, 'utf-8'))
    res.render('resto', {
        layout: 'layouts/main' ,
        title: 'Resto App',
        menu,
        testimonials,
        pageTitle: 'Resto App'})
})

app.get('/review', async(req, res)=>{
    // res.status(200).sendFile(path.join(__dirname, 'customer.html'));
    const testiPath = path.join(__dirname, 'data', 'testimonials.json');
    const testimonials = JSON.parse(await fs.readFile(testiPath, 'utf-8'))
    res.render('review', {
        layout: 'layouts/main' ,
        title: 'Customer Pages' ,
        testimonials,
        pageTitle: 'Customer Pages'})
})

app.get('/menu', async (req, res)=>{
    // res.status(200).sendFile(path.join(__dirname, 'menu.html'));
    const filePath = path.join(__dirname, 'data', 'menu.json');

    const menu = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    res.render('menu', {
        layout: 'layouts/main',
        title: 'Menu Pages', 
        menu, 
        pageTitle: 'Menu Pages'})
})

app.post('/menu', async(req, res)=>{
    try{
        try{
            const filePath = path.join(__dirname, 'data', 'menu.json');
            const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
            const newId = id
            const { pic, menuName, price } = req.body
            const newData = {
                id:newId, 
                pic: pic,
                menuName: menuName,
                price: price
            }
            if(typeof(pic) !== 'string' || typeof(menuName) !== 'string' || typeof(price) !== 'number' || pic.trim() == '' || menuName.trim() == '' || price <1){
                res.status(400).send({message: `Invalid Data!`})
                return;
            }
            data.push(newData);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
            res.status(201).send({message: `Successfully Added`})
        }catch(zero){
            const data = [];
            const newId = id
            const { pic, menuName, price } = req.body
            const newData = {
                id: newId, pic, menuName, price
            }
            if(typeof(pic) !== 'string' || typeof(menuName) !== 'string' || typeof(price) !== 'number' || pic.trim() === '' || menuName.trim() === '' || price <1){
                res.status(400).send({message: `Invalid Data!`});
                return;
            }
            data.push(newData);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
            res.status(201).send({message: `Successfully Added`})
        }
    }catch(err){
        res.status(404).send({message: `Not Found!`})
    }
})

app.use('/', (req, res) =>{
    res.status(404).send({message: `Page Not Found`})
})
app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server Run at http://localhost:${port}`)
})