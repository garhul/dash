import * as mqtt from 'mqtt';
import { getConfig } from '../../config';
import { getTaggedLogger } from '../logger';
const logger = getTaggedLogger('MQTT');

export interface MQTTHandler {
  topic: string;
  fn: (topic: string, payload: string) => void;
}

let client: mqtt.MqttClient | null = null;

function init(handlers: MQTTHandler[]): mqtt.MqttClient {
  const mqttClient = mqtt.connect(getConfig('mqtt.broker') as string);

  mqttClient.on('connect', () => {
    logger.info(`Connected to mosquitto broker on ${getConfig('mqtt.broker') as string}`);

    handlers.forEach(h => {
      mqttClient.subscribe(h.topic, (err: unknown) => {
        if (err) {
          logger.error(err);
          throw err;
        }
        logger.info(`Subscribed to topic ${h.topic}`);
      });
    });

    mqttClient.on('error', (err) => {
      logger.error(err);
    });

    mqttClient.on('message', (topic, message) => {
      // logger.debug(`Received |${message.toString()}| on topic: ${topic}`);

      const hndlr = handlers.find((h) => h.topic === topic);

      if (hndlr === undefined) {
        logger.error(`No handler registered for topic ${topic}`);
        return;
      }

      hndlr.fn(topic, message.toString());
    });
  });

  client = mqttClient;
  return client;

  // eventBus.addListener(busEvents.MQTT.PUBLISH, (data:unknown) => {
  //   logger.info(`Sending mqtt device at topic ${data.topic} payload ${JSON.stringify(data.payload)}`);

  //   if (typeof (data.payload) === 'object') {
  //     data.payload = JSON.stringify(data.payload);
  //   }  
  //   mqttClient.publish(data.topic, data.payload);
  // });
}

export function getClient(handlers: MQTTHandler[] = []): mqtt.MqttClient {
  if (client !== null && client.connected)
    return client;

  if (handlers === null) {
    logger.warn('MQTT client initialized without topics subscription');
  }

  return client = init(handlers);
}