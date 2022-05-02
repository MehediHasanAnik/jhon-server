const express = require('express')
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// anik
// LOr2IrO08K0hNgL8


const uri = "mongodb+srv://anik:LOr2IrO08K0hNgL8@cluster0.kwelj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('emaJhon').collection('products');

        app.get('/product', async (req, res) => {

            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {};
            const cursor = serviceCollection.find(query);
            let products;
            if (page || size) {
                products = await cursor.skip(page * size).limit(size).toArray();
            }
            else {
                products = await cursor.toArray();
            }

            res.send(products);
        })
        app.get('/productCount', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const count = await serviceCollection.estimatedDocumentCount();
            res.send({ count });
        })
        // use post to get product by ides ba keys
        app.post('/productByKeys', async (req, res) => {
            const keys = req.body;

            const ids = keys.map(id => ObjectId(id));
            const query = { _id: { $in: ids } }
            const cursor = serviceCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);

        })

    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello anik!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})