import {MongoClient} from "mongodb";
import {Constants} from "./constants.js";


var mongoUri = `mongodb://${Constants.MONGODB_USER}:${Constants.MONGODB_PASSWORD}@${Constants.MONGODB_HOST}:${Constants.MONGODB_PORT}`;
// Create a new client and connect to MongoDB
const dbclient = new MongoClient(mongoUri);

const database = dbclient.db(Constants.MONGODB_DB);
const mongoClient = database.collection(Constants.MONGODB_COLLECTION);


export default mongoClient;
