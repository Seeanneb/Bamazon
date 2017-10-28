var mysql  = require('mysql');
var prompt = require('prompt');
var bodyParser = require('body-parser')
var express = require('express')

var connection = mysql.createConnection({
  host     : 'localhost',
  post     : '3306',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db'
});
 
connection.connect();
console.log("Here are all the products you can buy!") 
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log(results);

  prompt.start();
  console.log("what product would you like to purchase? (by ID)")
  prompt.get(['item_ID'], function (err, result) {
    console.log('Command-line input received:');
    console.log('Item_ID: ' + result.item_ID);

    var userId = result.item_ID;
	var sql1    = 'SELECT * FROM products WHERE item_id = ' + connection.escape(userId);
	connection.query(sql1, function (error, results1, fields1) {
	if (error) throw error;
	console.log(results1)

	console.log("how many would you like to purchase? ")
	prompt.get(['item_qty'], function (err, result1){
		var userQty = result1.item_qty;
		var sql2 = 'SELECT stock_quantity FROM products WHERE item_id = ' + connection.escape(userId);
		connection.query(sql2, function(error, results2, fields2){
		if (error) throw error
		console.log(userQty)
		console.log(results2)
		JSON.stringify(results2)
		console.log(.stock_quantity)
			if (userQty <= results2) { console.log ("ok")}
			if (userQty >  results2) { console.log ("oh no")}	

	  });		
	 })
    });
   });



  // connection.end();
});
 // connection.end();
 

	