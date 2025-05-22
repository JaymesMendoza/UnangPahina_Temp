# UnangPahina - Books Ecommerce Platform

UnangPahina is a modern, microservices-based ecommerce platform specialized in book sales. The platform provides a seamless experience for users to browse, purchase, and manage their book orders.

## System Architecture

The system is built using a microservices architecture, consisting of the following services:

### Backend Services
- **Book Microservice**: Manages book catalog, inventory, and book-related operations
- **User Microservice**: Handles user authentication, profiles, and user management
- **Cart Microservice**: Manages shopping cart operations and temporary storage
- **Order Microservice**: Processes and manages order fulfillment

### Messaging Architecture
The microservices communicate asynchronously using RabbitMQ message broker:
- **Event-Driven Communication**: Services publish events when state changes occur
- **Message Queues**: Ensures reliable message delivery between services
- **Dead Letter Queues**: Handles failed message processing
- **Message Types**:
  - Commands: Direct service-to-service requests
  - Events: Broadcast state changes to interested services
  - Queries: Request-response patterns for data retrieval

### Frontend
- React-based single-page application providing a responsive and intuitive user interface

## Technology Stack

### Backend
- Node.js/Express.js for microservices
- MongoDB for data persistence
- Redis for caching
- RabbitMQ for inter-service communication
  - amqplib for RabbitMQ client
  - Message serialization using JSON
  - Retry mechanisms for failed messages
  - Message TTL and expiration policies

### Frontend
- React.js + Vite
- Redux for state management
- Material-UI for components
- Axios for API communication

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/UnangPahina.git
```

2. Set up RabbitMQ:
```bash
# Using Docker
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management

# Or install locally
# Windows: https://www.rabbitmq.com/install-windows.html
# Linux: sudo apt-get install rabbitmq-server
# macOS: brew install rabbitmq
```

3. Set up each microservice by following their respective README files in:
   - backend/_bookMicroservice
   - backend/_userMicroservice
   - backend/_cartMicroservice
   - backend/_orderMicroservice

4. Set up the frontend application by following the instructions in the frontend directory.

## Project Structure

```
UnangPahina/
├── backend/
│   ├── _bookMicroservice/    # Book catalog and inventory management
│   ├── _cartMicroservice/    # Shopping cart operations
│   ├── _orderMicroservice/   # Order processing and management
│   └── _userMicroservice/    # User authentication and management
└── frontend/                 # React-based client application
```

## Message Exchange Patterns

1. **Direct Exchange**:
   - Service-to-service communication
   - Command patterns (e.g., process payment, update inventory)

2. **Topic Exchange**:
   - Event broadcasting
   - Pattern-based routing (e.g., order.*, user.*)

3. **Fanout Exchange**:
   - System-wide notifications
   - Cache invalidation

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.