const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));


// router.get('/',function(req,res){
//     console.log("aaaaa")
//     res.sendFile(path.join(__dirname+'/public'));
//     //__dirname : It will resolve to your project folder.
//     console.log("bbbbbb")
//});


router.get('/move', (req, res) => {
     res.json({m:"test"});
 });

 app.use('/', router);
app.listen( 3000);

console.log('Running at Port 3000');