import amqp from "amqplib";
import nodemailer from "nodemailer";

export const startSendOtpConsumer = async () => { 
    try{
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST || "localhost",
            port: process.env.RABBITMQ_PORT || 5672,
            username: process.env.RABBITMQ_USER || "admin",
            password: process.env.RABBITMQ_PASS || "admin123",
        });
        const channel = await connection.createChannel();
        const queueName = "send-otp";
        await channel.assertQueue(queueName, {durable: true});
        console.log("✅ Mail Sservice consumer started, listening for otp emails");
        channel.consume(queueName, async (msg) => {
            if(msg){
                try{
                    const {to, subject, body} = JSON.parse(msg.content.toString());
                    const transporter = nodemailer.createTransport({
                        host: process.env.SMTP_HOST,
                        port: process.env.SMTP_PORT,
                        auth: {
                            user: process.env.SMTP_USER,
                            pass: process.env.SMTP_PASS,
                        },
                    });

                    await transporter.sendMail({
                        from: "Chat-app",
                        to,
                        subject,
                        text: body,
                    });
                    console.log(`Otp email sent to ${to}`);
                    channel.ack(msg);

                }catch(e){
                    console.error("Error processing otp email:", e);
                    // Optionally, you can nack the message or move it to a dead-letter queue
                    channel.nack(msg, false, false); // Discard the message
                }
            }
        });
        
    } catch (error) {
        console.error("RabbitMQ connection error:", error);
        process.exit(1);
    }
    }