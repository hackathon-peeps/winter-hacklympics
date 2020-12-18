const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://Aarushi:aarushi@cluster0.j38qr.mongodb.net/Businesses?retryWrites=true&w=majority";
    const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });

    /*await client.connect();  
    await listDatabases(client);
    await findOneDocByName(client, "Sample"); 

    var result='';
    var result2=[];*/
    //app.use(cors()) // Use this after the variable declaration

async function main(){
    
    try{
      await client.connect();  
      console.log("connected");
      await listDatabases(client);
      await findOneDocByName(client, "Aarushi's Lemonade Stand");
      await findAll(client);
      //result2 = await parseDocs(client);
    } catch (e){
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function createDoc(client, newDoc){
    const result = await client.db("Businesses").collection("Local Businesses").insertOne(newDoc);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function findOneDocByName(client, docName){
    console.log("before obtaining result");
    result = await client.db("Businesses").collection("Local Businesses").findOne({ name: docName });
    console.log("after obtaining result");
    if (result) 
    {
        console.log(`Found a match in the collection with the name '${docName}':`);
        console.log(result);
        return result;
    } 
    else 
    {
        console.log(`No match found with the name '${docName}'`);
    }
}

async function parseDocs(client){
    let COUNTRIES = [];
    console.log("in func");
    const list = await client.db("Businesses").collection("Local Businesses").find().forEach(function(doc)
    {
        let entry= COUNTRIES.push({name: doc.name, location: doc.location, hours: doc.hours, content: doc.content });
    })
    console.log("in func 2");
    //console.log(entry);
    console.log(COUNTRIES);
    //console.log(result);
    return COUNTRIES;
    //return result;
}

async function findAll(client){
    const result = await client.db("Businesses").collection("Local Businesses").find({})
        .sort({ name: 1 })
        .toArray()
        .then(items => {
    console.log(`Successfully found ${items.length} documents.`)
    return items
  });
    //findOne({ name: "USA" });

    console.log("All:");
    console.log(result);
    return result;
}


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
var port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    client.connect();  
    listDatabases(client);
    //findOneDocByName(client, "USA");
    //console.log(result);
    console.log("hi1");
    //result2= parseDocs(client);
    console.log(result2);
    //console.log("hi2");
    //console.log(result+"hi");
    //console.log("result is not null");
  res.send({ info: result2});
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));