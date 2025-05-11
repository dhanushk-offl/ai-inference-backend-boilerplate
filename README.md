# AI Inference Backend: Full Stack with Node.js, Python, Redis, and Docker

This project provides a **full-stack AI inference API** using **Node.js**, **Python (Hugging Face)** for machine learning inference, **Redis** for caching, and **Docker** for easy deployment. It also includes a simple **React frontend** to interact with the API.

---

## Project Overview

* **Node.js (Express)**: Handles the API layer and caching via Redis.
* **Python (Flask)**: Runs a pre-trained Hugging Face sentiment analysis model.
* **Redis**: Caches repeated requests for faster responses.
* **React (Vite)**: Frontend to interact with the backend AI API.

---

## 🏗️ Project Structure

```
ai-inference-backend/
│
├── node-api/                # Express backend
│   ├── index.js             # API logic
│   ├── runPython.js         # Python communication
│   ├── redisClient.js       # Redis client setup
│   └── Dockerfile           # Docker config for Node.js
│
├── python-inference/        # Flask AI inference service
│   ├── app.py               # Flask API
│   ├── model.py             # Hugging Face model setup
│   └── Dockerfile           # Docker config for Python
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── App.jsx          # Main component
│   │   └── main.jsx         # Entry point
│   ├── index.html           # HTML entry point
│   ├── package.json         # React app config
│   └── Dockerfile           # Docker config for React
│
├── docker-compose.yml       # Docker Compose to orchestrate services
└── README.md                # Project documentation (this file)
```

---

## 🚀 Deployment Instructions

### Prerequisites

* **Docker** and **Docker Compose** installed on your machine.
* Make sure **port 5000** is open for Node.js API, **port 6000** for the Python inference service, and **port 6379** for Redis.

### Steps to Deploy

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd ai-inference-backend
   ```

2. **Build and start the containers:**

   Use **Docker Compose** to build and run all services:

   ```bash
   docker-compose up --build
   ```

3. **Access the application:**

   * Frontend (React): [http://localhost:5173](http://localhost:5173)
   * Backend API (Node.js): [http://localhost:5000](http://localhost:5000)

4. **Stop the application:**

   When you’re done, stop the containers with:

   ```bash
   docker-compose down
   ```

---

## ⚙️ Customization

### 1. **Model Selection (Python)**

To use a different model for inference, update the `python-inference/model.py` file. Replace the model pipeline like so:

```python
# Load a different pre-trained model
model = pipeline('your-new-task', model="your-model-name")
```

If you're switching from sentiment analysis to something like **text classification** or **image processing**, make sure your Python `predict` function can handle the new input/output format accordingly.

### 2. **Frontend Customization (React)**

You can modify the frontend to suit your needs. For example, change the text area to accept different types of data or create multiple buttons for different API routes.

* Edit the `frontend/src/App.jsx` file.
* Change how `axios` is called to match your new API endpoints or input formats.

### 3. **API Rate Limiting**

In the **Node.js API**, you can adjust the rate limiting rules by modifying the `rateLimit` settings in `node-api/index.js`:

```js
const limiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 30  // Max 30 requests per minute
});
```

This helps avoid overloading your model with too many requests.

### 4. **Redis Caching**

The caching strategy can be customized by modifying the logic in `node-api/index.js`. For example, you can set different expiration times (`EX`) for different types of requests:

```js
await redis.set(key, JSON.stringify(result), 'EX', 3600); // Set cache expiry to 1 hour
```

### 5. **Environment Variables**

You can configure various environment variables, such as Redis connection details or model types, by using a `.env` file. To integrate `.env`, you’d need to use the `dotenv` package in Node.js:

```bash
npm install dotenv
```

Then, load variables in `node-api/index.js`:

```js
require('dotenv').config();
```

---

## 📊 System Architecture Workflow


```mermaid
graph LR
    A[Frontend (React)] -->|POST /predict| B[Node.js API]
    B -->|Call Python API| C[Python Inference (Flask)]
    C -->|Model Processing| D[Sentiment Analysis (Hugging Face)]
    D -->|Return result| C
    C -->|Cache result| E[Redis]
    E -->|Return result from cache| B
    B -->|Return Response| A

    style A fill:#e2f7ff,stroke:#005f73,stroke-width:2px
    style B fill:#f0e5de,stroke:#bc2a8d,stroke-width:2px
    style C fill:#a8dadc,stroke:#005f73,stroke-width:2px
    style D fill:#fff,stroke:#2f4f4f,stroke-width:2px
    style E fill:#f7c7b3,stroke:#ff7a00,stroke-width:2px
```

### Description of the Workflow:

1. **Frontend (React)**: User inputs text for sentiment analysis.
2. **Node.js API**: API receives input, checks Redis for cache, and calls the Python API if no cached result.
3. **Python Inference**: The Flask service processes the text using Hugging Face's sentiment analysis model.
4. **Redis**: Caches the result for fast future retrieval.
5. **Return**: The result (sentiment label and confidence score) is returned to the frontend.

---

## ☁️ Cloud Platforms for Free Deployment

If you don’t want to self-host this on your own hardware, here are a few free cloud platforms you can use:

### 1. **[Heroku](https://www.heroku.com/)**

* Free tier available (though limited to 550 hours/month).
* Easy to deploy Docker containers.
* Ideal for smaller apps and quick demos.

### 2. **[Vercel](https://vercel.com/)**

* Perfect for deploying frontend apps.
* Integrates seamlessly with React (Vite or Next.js).
* Free tier available with unlimited personal projects.

### 3. **[Render](https://render.com/)**

* Free tier for web services and static sites.
* Supports Docker deployments.
* Great for small to medium-sized projects.

### 4. **[Fly.io](https://fly.io/)**

* Free tier available with 3 shared CPUs.
* Can deploy Docker containers directly.
* Global deployment (good for latency-sensitive applications).

### 5. **[Railway](https://railway.app/)**

* Another free platform for deploying Docker containers.
* Supports Node.js, Python, and Redis seamlessly.
* Great for quick deployment with GitHub integrations.

---

## 🖥️ Self-Hosting Ideas

If you're looking to **self-host** this application, you can run it on your own hardware or a VM. Here are some ideas for self-hosting:

### 1. **Raspberry Pi**

* Cost-effective and energy-efficient.
* Install Docker and run all services on it.

### 2. **DigitalOcean Droplet** (Starting at \$5/month)

* Affordable cloud hosting.
* You can install Docker and deploy everything manually.

### 3. **Old Laptop/PC**

* Repurpose an old machine as a home server.
* Install Docker and run the services using Ubuntu or any lightweight Linux distro.

### 4. **VMware or VirtualBox**

* Host it on your local machine using a virtual machine.
* Ideal for testing or small-scale hosting without a dedicated server.

---

## 📚 Conclusion

This setup demonstrates how to build a real-time AI inference system with caching and a smooth user interface. The combination of **Node.js**, **Python**, **Redis**, and **Docker** ensures scalability and performance.

* Use **Redis** to speed up repeated requests.
* **Hugging Face models** provide powerful AI capabilities with minimal setup.
* **Docker** makes deployment easy across different environments.

For detailed learning, check out the full article on how to **[build this AI app](https://medium.com/@your-article-link)**.

---
