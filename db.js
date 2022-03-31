const express = require('express');
const app = express()
const mysql = require('mysql2');
const Sequelize = require('sequelize');

var sequelize = new Sequelize('orderbook', 'root','root12345',{host:"localhost",port:3306,dialect:"mysql"});

const sql = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root12345',
    database: 'orderbook',
    insecureAuth : true
});

sql.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });


const buy = sequelize.define('buy', { id: {type:DataTypes.Integer,primaryKey:true} , qty: Sequelize.STRING,price: Sequelize.STRING,total_price: Sequelize.STRING });


app.get('/notes', function(req, res) {
  buy.findAll().then(notes => {
    console.log(notes)
    return res.json(notes);
  });
});