const config = {
    PORT: 3002,
    MONGODB_URI: 'mongodb://localhost:27017/unangpahina_users',
    RABBITMQ_URL: 'amqp://admin:admin@localhost:5672/',
    
    // JWT Configuration
    JWT_SECRET: 'your-super-secret-jwt-key-for-unangpahina',
    JWT_EXPIRY: '24h',
    
    // RabbitMQ Configuration
    EXCHANGE_NAME: 'user.exchange',
    QUEUE_NAME: 'user.queue',
    
    // Routing Keys
    ROUTING_KEYS: {
        USER_CREATED: 'user.created',
        USER_UPDATED: 'user.updated'
    },
    
    // User Roles
    ROLES: {
        USER: 'user',
        ADMIN: 'admin'
    }
};

module.exports = config; 