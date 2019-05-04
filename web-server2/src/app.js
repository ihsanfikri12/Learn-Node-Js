const path = require('path');
const geocode = require ('./utils/geocode.js');
const forecast = require ('./utils/forecast.js');
const express = require('express');
const hbs = require('hbs');

const app = express();

const publicPath = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicPath));

app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialspath);

app.get('',(req,res) =>{
    res.render('index',{
        title:'wheater app',
        name: 'Ihsanul FIkri'
    });
});

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'about me',
        name: 'Ihsanul FIkri'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help us',
        name: 'Ihsanul FIkri'
    });
})

app.get('/wheater', (req,res) =>{
    if(!req.query.address) {
        return res.send({ 
            error : "you don't request anything"
        });
    }

    geocode(req.query.address,(err,{latitude,longitude,location} = {})=>{
        if(err){
            return res.send(err);
        } 
        
        forecast(latitude,longitude,(err,forecastData)=>{
            if(err){
                return res.send(err);
            } else {
                res.send({
                    location,
                    forecastData,
                    address: req.query.address
                });
               
            }
        });
});

    // res.send({
    //     forecast: "it's Snowing",
    //     location: "Jakarta",
    //     address: req.query.address
        
    // });
});

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send('file error');
    }
    console.log(req.query.search);
    res.send( {
        products : []
    })
}
)
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ihsanul Fikri',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ihsanul Fikri',
        errorMessage: 'Page not found.'
    })
})

app.listen(4000,()=>{
    console.log('server is running');
})