import amqp from "amqplib";

let channel = null;

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST || "localhost",
            port: process.env.RABBITMQ_PORT || 5672,
            username: process.env.RABBITMQ_USER || "admin",
            password: process.env.RABBITMQ_PASS || "admin123",
        });

        channel = await connection.createChannel();
        console.log("✅ Connected to RabbitMQ");

        // Optional: handle app close
        process.on("exit", async () => {
            if (channel) await channel.close();
            await connection.close();
        });

    } catch (error) {
        console.error("❌ RabbitMQ connection error:", error);
        process.exit(1);
    }
};

const publishToQueue = async (queueName, data) => {
    if (!channel) {
        console.error("❌ Channel is not established. Call connectToRabbitMQ first.");
        return;
    }

    try {
        await channel.assertQueue(queueName, { durable: true });

        channel.sendToQueue(
            queueName,
            Buffer.from(JSON.stringify(data)),
            { persistent: true }
        );

        console.log(`📤 Message sent to queue: ${queueName}`);
    } catch (error) {
        console.error("❌ Error publishing to queue:", error);
    }
};

export {
    connectToRabbitMQ,
    publishToQueue,
};
