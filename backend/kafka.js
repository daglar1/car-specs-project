const { Kafka, Partitioners } = require('kafkajs');

const TOPIC = 'car-views';

const kafka = new Kafka({
  clientId: 'car-backend',
  brokers: [process.env.KAFKA_BROKER],
  retry: { initialRetryTime: 1000, retries: 10 },
});

const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
const consumer = kafka.consumer({ groupId: 'car-views-group' });

// Connects to Kafka, creates the topic and starts listening for view events
async function startKafka(pool) {
  // Create the topic if it does not exist yet
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [{ topic: TOPIC, numPartitions: 1, replicationFactor: 1 }],
  });
  await admin.disconnect();

  await producer.connect();

  // Consumer: every "car viewed" message increases the view count in the database
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      await pool.query('UPDATE cars SET views = views + 1 WHERE id = $1', [event.carId]);
      console.log('View counted for car', event.carId);
    },
  });

  console.log('Kafka connected');
}

// Producer: sends a "car viewed" message to Kafka
async function sendCarViewed(carId) {
  await producer.send({
    topic: TOPIC,
    messages: [{ value: JSON.stringify({ carId: carId, viewedAt: new Date().toISOString() }) }],
  });
}

module.exports = { startKafka, sendCarViewed };