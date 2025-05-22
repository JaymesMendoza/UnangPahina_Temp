const config = {
    PORT: 3004,
    MONGODB_URI: 'mongodb://localhost:27017/unangpahina_orders',
    RABBITMQ_URL: 'amqp://admin:admin@localhost:5672/',
    
    // RabbitMQ Configuration
    EXCHANGE_NAME: 'order.exchange',
    QUEUE_NAME: 'order.queue',
    
    // Routing Keys
    ROUTING_KEYS: {
        ORDER_CREATED: 'order.created',
        ORDER_STATUS_CHANGED: 'order.status.changed'
    },
    
    // Order Status
    ORDER_STATUS: {
        PENDING: 'pending',
        CONFIRMED: 'confirmed',
        COMPLETED: 'completed'
    }
};

module.exports = config; 