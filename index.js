const express = require('express');
const app = express();
const port = process.env.PORT||8000;
const db = require('./config/mongoose');

app.use(express.json());
app.use('/',require('./router/index'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
