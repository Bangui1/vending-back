import {MongoClient} from "mongodb";


var mongoUri = 'mongodb://54.159.190.4:27017';
// Create a new client and connect to MongoDB
const dbclient = new MongoClient(mongoUri);

const database = dbclient.db('test');
const mongoClient = database.collection('message');


export default mongoClient;
