
import mqtt from 'mqtt';
import fs from "fs";
import mongoClient from "./src/mongoClient.js";

const mqttOptions = {
    host: 'ec2-52-70-127-255.compute-1.amazonaws.com',
    port: 8883,
    protocol: 'mqtts',
    ca: [fs.readFileSync('src/ca-root-cert.crt')],
    rejectUnauthorized: true,
}

const client = mqtt.connect(mqttOptions);


client.on('connect', () => {
    console.log('Connected to MQTT Broker');
});

client.subscribe("vending/+")
client.on('message', (topic, message) => {
    const topicId = topic.split('/')[1]

    const doc = {
        topic: topicId,
        message: message.toString(),
        date: new Date()
    }
    mongoClient.insertOne(doc, (err, res) => {
        if (!err) {
            const ackTopic = `vending/ack/${topicId}`
            client.publish(ackTopic, "OK")
        }
        if (err) throw err;
        console.log("1 document inserted");
    });
})

client.on('error', (error) => {
    console.log(`error: ${error}`);
})

