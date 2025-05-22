const config = {
    PORT: 3003,
    MONGODB_URI: 'mongodb://localhost:27017/unangpahina_cart',
    RABBITMQ_URL: 'amqp://admin:admin@localhost:5672/',
    
    // RabbitMQ Configuration
    EXCHANGE_NAME: 'cart.exchange',
    QUEUE_NAME: 'cart.queue',
    
    // Routing Keys
    ROUTING_KEYS: {
        CART_UPDATED: 'cart.updated',
        CART_CHECKED_OUT: 'cart.checked.out'
    }
};

module.exports = config; 