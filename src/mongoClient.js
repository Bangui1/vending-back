import {MongoClient} from "mongodb";


var mongoUri = 'mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT;
// Create a new client and connect to MongoDB
const dbclient = new MongoClient(mongoUri);

const database = dbclient.db(process.env.MONGODB_DB);
const mongoClient = database.collection(process.env.MONGODB_COLLECTION);


export default mongoClient;
