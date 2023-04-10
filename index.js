
    const express = require('express');//Using express
    
    const PORT = process.env.PORT || 8000;//Deciding on a PORT to work with

    const server = express();//Using the server of the PORT

    server.use(express.json()); //Use express on this server


    server.use(`/api/use`, require('./Routes/use'))//This is the server that we will use in this Routes
      
    server.listen(PORT,() => { //Listen if there is a problem occure when it update everytime you cahnge something
        console.log(`http://localhost:${PORT}`);   
   });
     
