const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


//midileware
app.use(cors());
app.use(express.json());


app.get('/',(req, res)=>{
    res.send('Collage Server is available')
})
app.listen(port, ()=>{
    console.log(`Collage Server is running on port ${port}`)
})