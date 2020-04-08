const express = require('express');
const port=8000;
const app = express();
const db=require('./config/mongoose');
const controller=require('./controllers/uploadfile');


app.set('view engine','ejs');
app.set('views','./views');
app.get('/',controller.index);
app.post('/file/upload',controller.upload);
app.get('/readFile/:id',controller.readFile);
app.use(express.urlencoded());

app.listen(port,function(err){
    if(err){
        console.log("Error in running the server");
        return;

    }
    console.log("Server is running successfully at port: " ,port);

})