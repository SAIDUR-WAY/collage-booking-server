const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


//midileware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ie2mpcl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    
    
    const collageCollection = client.db('collageDb').collection('collages')

    
    app.get('/collages', async (req, res) => {
        result = await collageCollection.find().toArray();
        res.send(result)
    })

    app.get('/collages/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = {_id: new ObjectId(id)}
    const result = await collageCollection.findOne(query);
    res.send(result);
    })

    app.get('/research', async (req, res) => {
      const query = {name: "website"};
      const result = collageCollection.find().project({college_name: true, research_link: true});
      // console.log(result)
      const result2 = await result.toArray();
      res.send(result2)
    })
    app.get('/reviews', async (req, res) => {
      const query = {name: "reviews"};
      const result = collageCollection.find().project({reviews: true});
      // console.log(result)
      const result2 = await result.toArray();
      res.send(result2)
    })

    app.get('/collage', async (req, res) => {
      const  searchTerm  = req.query.search;
      const query = {college_name: {$regex: searchTerm, $options: 'i'}};
      const result = await collageCollection.find(query).toArray();
      res.send(result)

    })
   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req, res)=>{
    res.send('Collage Server is available')
})
app.listen(port, ()=>{
    console.log(`Collage Server is running on port ${port}`)
})