
import mqtt from 'mqtt';
import fs from "fs";
import mongoClient from "./src/mongoClient.js";
import express from "express";


const app = express();
const port = 8080;


const mqttOptions = {
    host: 'ec2-52-70-127-255.compute-1.amazonaws.com',
    port: 8883,
    protocol: 'mqtts',
    ca: [fs.readFileSync('src/ca-root-cert.crt')],
    rejectUnauthorized: true,
}

const client = mqtt.connect(mqttOptions);



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/vending', async (req, res) => {
    try {
        const docs = await mongoClient.find({}).toArray();
        res.json(docs);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
})

client.on('connect', () => {
    console.log('Connected to MQTT Broker');
});

client.subscribe("vending/+")
client.on('message', (topic, message) => {
    const topicId = topic.split('/')[1]
    console.log(topicId)

    const doc = {
        topic: topicId,
        message: message.toString(),
        date: new Date()
    }
    mongoClient.insertOne(doc).then((result) => {
        const ackTopic = `vending/ack/${topicId}`
        client.publish(ackTopic, "OK")
    }).catch((error) => {
        console.log(error)
    })
})

client.on('error', (error) => {
    console.log(`error: ${error}`);
})

