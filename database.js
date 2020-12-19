//creating instance of mongodb client
const {MongoClient} = require('mongodb');

//storing url of database, initializing mongodb client
const uri = "mongodb+srv://Aarushi:aarushi@cluster0.j38qr.mongodb.net/Businesses?retryWrites=true&w=majority";
    const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });

    /*await client.connect();  
    await listDatabases(client);
    await findOneDocByName(client, "Sample"); 

    
    var result2=[];*/
    //app.use(cors()) // Use this after the variable declaration

    var result='';

async function main(){
    
    try{
      await client.connect();  //connecting to client database
      console.log("connected");
      await listDatabases(client);  //list all databases
      await findOneDocByName(client, "Aarushi's Lemonade Stand");   //find entry by name
      //await findOne()
      //await createDoc(client, {name: "abc", location: "def", hours: "ghi", content: "jkl" })  //insert entry to database
      await findAll(client);    //find all entries in database
      //find entries by a particular feature
      await findManyDocsByFeature(client, "name", "Aarushi's Lemonade Stand");
      await findManyDocsByFeature(client, "hours", "M-S : 9:00 am - 6:00 pm CST");
      await findManyDocsByFeature(client, "tags", "color");
      //result2 = await parseDocs(client);
      result= await parseDocs(client);
      console.log("result="+result);
    } catch (e){
        console.error(e);
    } finally {
        //await client.close();
    }
}
main().catch(console.error);

//list all databases
async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
}

//insert new entry to database
async function createDoc(client, newDoc){
    const result = await client.db("Businesses").collection("Local Businesses").insertOne(newDoc);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

//find entry by name
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

//find all entries by specific feature
async function findManyDocsByFeature(client, feature, docFeature){
    if (feature == "name") {
        console.log("before obtaining result");
    const result = await client.db("Businesses").collection("Local Businesses").find({ name: docFeature})
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
    } else if (feature == "location") {
        console.log("before obtaining result");
    const result = await client.db("Businesses").collection("Local Businesses").find({ location: docFeature})
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
    } else if (feature == "hours") {
        console.log("before obtaining result");
    const result = await client.db("Businesses").collection("Local Businesses").find({ hours: docFeature})
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
    } else if (feature == "tags") {
        console.log("before obtaining result");
    const result = await client.db("Businesses").collection("Local Businesses").find({ tags: docFeature})
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
    
}

//parse all entries in database
async function parseDocs(client){
    let ENTRIES = [];
    console.log("in func");
    const list = await client.db("Businesses").collection("Local Businesses").find().forEach(function(doc)
    {
        let entry= ENTRIES.push({name: doc.name, location: doc.location, hours: doc.hours, content: doc.content, tags: doc.tags });
    })
    console.log("in func 2");
    //console.log(entry);
    console.log(ENTRIES);
    //console.log(result);
    return ENTRIES;
    //return result;
}

//find all entries in database
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
var cors = require('cors');
const { create } = require('domain');

var app = express();
var port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getAllEntries', (req, res) => {
    client.connect();  
    listDatabases(client);
    //findOneDocByName(client, "USA");
    console.log(result);
    console.log("hi1");
    //result2= parseDocs(client);
    //console.log(result2);
    //console.log("hi2");
    //console.log(result+"hi");
    //console.log("result is not null");
  //res.send({ info: result2});
  res.send({info: result});
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));