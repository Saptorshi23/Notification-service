# Notification Service

## Overview

This project is a simple Notification Service built using **Node.js** and **Express.js**. It allows sending notifications to users via three different channels:

- **Email**
- **SMS**
- **In-app notifications**

The service provides two main API endpoints:

1. **Send a Notification** (`POST /notifications`) — to send a notification to a user.
2. **Get User Notifications** (`GET /users/{id}/notifications`) — to retrieve all notifications sent to a specific user.

### Bonus Features

- The system uses **RabbitMQ** as a message queue to handle notification processing asynchronously.
- It implements **retry logic** to handle failed notification deliveries automatically.

---

## Setup Instructions

Follow these steps to get the project up and running on your local machine:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally or access to a MongoDB cloud instance
- [RabbitMQ](https://www.rabbitmq.com/download.html) installed and running locally or accessible remotely

---

### Steps to Run

1. **Clone the repository**

```bash
git clone https://github.com/Saptorshi23/Notification-service.git
cd Notification-service
```
