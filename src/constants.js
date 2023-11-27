import * as dotenv from 'dotenv';

dotenv.config();

export class Constants {
    static MONGODB_USER = process.env.MONGODB_USER || 'vending';
    static MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'vending';
    static MONGODB_HOST = process.env.MONGODB_HOST || 'secretIp';
    static MONGODB_PORT = process.env.MONGODB_PORT || '27017';
    static MONGODB_DB = process.env.MONGODB_DB || 'vending';
    static MONGODB_COLLECTION = process.env.MONGODB_COLLECTION || 'data';
    static MQTT_HOST = process.env.MQTT_HOST || 'secretIp';
    static MQTT_PORT = process.env.MQTT_PORT || '1883';
}
