const config = {
    PORT: 3001,
    MONGODB_URI: 'mongodb://localhost:27017/unangpahina_books',
    RABBITMQ_URL: 'amqp://admin:admin@localhost:5672/',
    
    // RabbitMQ Configuration
    EXCHANGE_NAME: 'book.exchange',
    QUEUE_NAME: 'book.queue',
    
    // Routing Keys
    ROUTING_KEYS: {
        STOCK_UPDATED: 'book.stock.updated',
        BOOK_CREATED: 'book.created',
        BOOK_UPDATED: 'book.updated'
    }
};

module.exports = config; 