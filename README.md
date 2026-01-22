# Email Microservice

A production-oriented **Email Microservice** built with **Node.js**, designed to send transactional emails **asynchronously** using a **queue-based architecture**.  
The service is scalable, reliable, and follows real-world backend engineering best practices.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [API Documentation](#api-documentation)
- [Validation Rules](#validation-rules)
- [Queue & Worker Design](#queue--worker-design)
- [Retry & Failure Handling](#retry--failure-handling)
- [Running the Service](#running-the-service)
- [Error Handling Strategy](#error-handling-strategy)
- [Security Considerations](#security-considerations)
- [Scalability & Extensibility](#scalability--extensibility)
- [Future Enhancements](#future-enhancements)
- [Conclusion](#conclusion)

---

## Overview

The **Email Microservice** is a standalone backend service responsible for **sending transactional emails asynchronously**.  
Instead of sending emails directly within the API request, the service places email requests into a **Redis-backed queue** and processes them using a **background worker**.

This design ensures:
- Non-blocking APIs
- Reliability through retries
- Better scalability
- Clean separation of concerns

---

## Key Features

- REST API for email submission
- Asynchronous processing using a queue
- Background worker for email delivery
- Automatic retries with exponential backoff
- Secure configuration using environment variables
- Input validation
- Clean, scalable project structure

---

## Architecture

### High-Level Flow


### Why This Architecture?

| Problem | Solution |
|------|--------|
| Slow email delivery | Asynchronous processing |
| API blocking | Queue-based design |
| Temporary failures | Automatic retries |
| Scalability needs | Multiple workers |
| Reliability | Redis-backed jobs |

---

## Technology Stack

| Component | Technology |
|--------|-----------|
| Runtime | Node.js |
| Web Framework | Express.js |
| Email | Nodemailer |
| Queue | BullMQ |
| Message Broker | Redis |
| Validation | Joi |
| Config Management | dotenv |
| Containerization (optional) | Docker |

---

## Project Structure
email-microservice/  
│  
├── src/  
│ ├── config/  
│ │ ├── mail.config.js  
│ │ └── queue.config.js  
│ │  
│ ├── routes/  
│ │ └── email.routes.js  
│ │  
│ ├── services/  
│ │ └── email.service.js  
│ │  
│ ├── validators/  
│ │ └── email.validator.js  
│ │  
│ ├── workers/  
│ │ └── email.worker.js  
│ │  
│ └── app.js  
│  
├── server.js  
├── .env  
├── .gitignore  
├── package.json  
└── README.md  

---

## Environment Configuration

All sensitive data is managed using environment variables.

### `.env` Example

PORT=3000  
EMAIL_USER=your_service_email@gmail.com  
EMAIL_PASS=your_app_password  

> ⚠️ **Never commit the `.env` file to version control.**

---

## API Documentation

### Health Check

**Endpoint**
GET /health

**Response**
200 OK
Email Service is running

---

### Send Email

**Endpoint**
POST /api/email/send

**Headers**
Content-Type: application/json

**Request Body**
```json
{
  "to": "user@example.com",
  "subject": "Welcome",
  "message": "Your account has been created"
}
```
**Success Response**
202 Accepted
```json
{
  "success": true,
  "message": "Email request accepted for processing"
}
```
**Validation Error Response**
400 Bad Request

```json
{
  "success": false,
  "message": "\"to\" must be a valid email"
}
```
## Validation Rules

| Field |	Rule |
| ----- | ------ |
| to |	Required, valid email |
| subject |	Required, 3–100 characters |
| message |	Required, non-empty |

Validation is enforced using Joi before jobs are added to the queue.
---

## Queue & Worker Design
### Queue
- Queue Name: email-queue
- Backed by Redis
- Jobs processed asynchronously

### Worker
- Runs as a separate Node.js process
- Consumes jobs from Redis
- Sends emails using SMTP
- Retries automatically on failure

>Each process loads environment variables independently.

---

## Retry & Failure Handling
### Retry Configuration
| Setting |	Value |
| ------- | ----- |
|Attempts|5|
|Backoff Type|Exponential|
|Initial Delay|2000 ms|
|Completed Jobs|Removed|
|Failed Jobs|Retained|

### Why Retry are Important
- SMTP throttling
- Temporary network issues
- DNS resolution failures  

Retries ensure emails are not silently lost.

---

## Running the Service
### Prerequisites
- Node.js (v18+ recommended)
- Redis (Docker recommended)
- Gmail App Password (for development)

### Steps
1. Start Redis(Docker)
```bash
docker run -d --name redis-email -p 6379:6379 redis
```
2. Install Dependencies
```bash
npm install
```
3. Start API Server
```bash
node server.js
```
4. Start Worker
```bash
node src/workers/email.worker.js
```
> Both processes must be running simultaneously.
---

## Error Handling Strategy
|Scenario|Handling|
|-|-|
|Invalid input|	400 response|
|SMTP failure|	Automatic retry|
|Permanent failure	|Job retained|
|Missing credentials|	Worker fails early|
|Redis unavailable|	API fails fast|

---
## Security Considerations
- No credentials in source code
- Secrets managed via environment variables
- Dedicated service email account
- Async processing prevents API abuse
- Rate limiting can be added if required
---
## Scalability & Extensibility
This microservice supports:
- Horizontal scaling of workers
- Switching email providers (SES, SendGrid)
- HTML email templates
- Dead Letter Queue (DLQ)
- Docker & Kubernetes deployment
- Centralized logging and monitoring

---
## Future Enhancements
- HTML email templates with variables
- Provider abstraction layer
- Authentication on API endpoints
- Rate limiting
- Metrics & monitoring
- Docker Compose setup
- CI/CD pipeline integration
---
## Conclusion
This Email Microservice demonstrates:
- Asynchronous processing
- Reliability through retries
- Secure configuration management
- Clean and maintainable codebase

It is suitable for integration into any microservice-based system and can be scaled independently.
