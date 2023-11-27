import {MongoClient} from "mongodb";
import {Constants} from "./constants.js";


// Create a new client and connect to MongoDB
const dbclient = new MongoClient(Constants.MONGODB_URI);

const database = dbclient.db(Constants.MONGODB_DB);
const mongoClient = database.collection(Constants.MONGODB_COLLECTION);


export default mongoClient;
