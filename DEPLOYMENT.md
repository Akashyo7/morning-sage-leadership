# 🚀 Deployment Guide

This guide covers deploying the Morning Sage Leadership AI Agent to various platforms.

## 🐳 Docker Deployment

### Local Docker

```bash
# Build the image
docker build -t morning-sage-leadership .

# Run with environment file
docker run -p 3141:3141 --env-file .env morning-sage-leadership

# Or run with inline environment variables
docker run -p 3141:3141 \
  -e GROQ_API_KEY=your_key_here \
  -e VOLTAGENT_PUBLIC_KEY=your_public_key \
  -e VOLTAGENT_SECRET_KEY=your_secret_key \
  morning-sage-leadership
```

### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  morning-sage:
    build: .
    ports:
      - "3141:3141"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
      - VOLTAGENT_PUBLIC_KEY=${VOLTAGENT_PUBLIC_KEY}
      - VOLTAGENT_SECRET_KEY=${VOLTAGENT_SECRET_KEY}
      - NODE_ENV=production
    volumes:
      - ./data:/app/.voltagent
    restart: unless-stopped
```

Run with: `docker-compose up -d`

## ☁️ Cloud Platforms

### Railway

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Configure Environment Variables**
   ```
   GROQ_API_KEY=your_groq_api_key
   VOLTAGENT_PUBLIC_KEY=your_voltagent_public_key
   VOLTAGENT_SECRET_KEY=your_voltagent_secret_key
   NODE_ENV=production
   ```

3. **Deploy**
   - Railway will automatically build and deploy
   - Your app will be available at `https://your-app.railway.app`

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Go to Vercel dashboard
   - Add environment variables in Settings

### DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Create new app from GitHub

2. **Configure Build Settings**
   ```yaml
   name: morning-sage-leadership
   services:
   - name: api
     source_dir: /
     github:
       repo: your-username/morning-sage-leadership
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: GROQ_API_KEY
       value: your_groq_api_key
       type: SECRET
     - key: NODE_ENV
       value: production
   ```

### AWS (ECS/Fargate)

1. **Build and Push to ECR**
   ```bash
   # Create ECR repository
   aws ecr create-repository --repository-name morning-sage-leadership

   # Get login token
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com

   # Build and tag
   docker build -t morning-sage-leadership .
   docker tag morning-sage-leadership:latest your-account.dkr.ecr.us-east-1.amazonaws.com/morning-sage-leadership:latest

   # Push
   docker push your-account.dkr.ecr.us-east-1.amazonaws.com/morning-sage-leadership:latest
   ```

2. **Create ECS Task Definition**
   ```json
   {
     "family": "morning-sage-leadership",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "256",
     "memory": "512",
     "executionRoleArn": "arn:aws:iam::your-account:role/ecsTaskExecutionRole",
     "containerDefinitions": [
       {
         "name": "morning-sage-leadership",
         "image": "your-account.dkr.ecr.us-east-1.amazonaws.com/morning-sage-leadership:latest",
         "portMappings": [
           {
             "containerPort": 3141,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "NODE_ENV",
             "value": "production"
           }
         ],
         "secrets": [
           {
             "name": "GROQ_API_KEY",
             "valueFrom": "arn:aws:secretsmanager:us-east-1:your-account:secret:groq-api-key"
           }
         ]
       }
     ]
   }
   ```

### Google Cloud Run

1. **Build and Deploy**
   ```bash
   # Enable required APIs
   gcloud services enable run.googleapis.com
   gcloud services enable cloudbuild.googleapis.com

   # Deploy
   gcloud run deploy morning-sage-leadership \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NODE_ENV=production \
     --set-secrets GROQ_API_KEY=groq-api-key:latest
   ```

## 🔧 Production Configuration

### Environment Variables

Essential production environment variables:

```env
# Required
GROQ_API_KEY=your_groq_api_key
NODE_ENV=production

# Optional but recommended
VOLTAGENT_PUBLIC_KEY=your_voltagent_public_key
VOLTAGENT_SECRET_KEY=your_voltagent_secret_key
PORT=3141
LOG_LEVEL=info

# Database (if using external database)
DATABASE_URL=your_database_url
```

### Health Checks

The agent exposes health check endpoints:

- `GET /health` - Basic health check
- `GET /ready` - Readiness check

Configure your load balancer/orchestrator to use these endpoints.

### Monitoring

1. **VoltOps Console**
   - Set up monitoring at https://console.voltagent.dev
   - Configure alerts and dashboards

2. **Application Logs**
   - Logs are output to stdout in JSON format
   - Configure log aggregation (ELK, Splunk, etc.)

3. **Metrics**
   - Agent performance metrics
   - Tool usage statistics
   - Workflow execution times

### Security

1. **API Keys**
   - Store in secure secret management (AWS Secrets Manager, etc.)
   - Rotate keys regularly
   - Use least-privilege access

2. **Network Security**
   - Use HTTPS in production
   - Configure proper CORS settings
   - Implement rate limiting

3. **Container Security**
   - Use non-root user in container
   - Scan images for vulnerabilities
   - Keep base images updated

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Railway
        uses: railwayapp/railway-deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: morning-sage-leadership
```

## 📊 Scaling Considerations

### Horizontal Scaling

- The agent is stateless (except for memory storage)
- Can run multiple instances behind a load balancer
- Consider shared memory storage for multi-instance deployments

### Vertical Scaling

- Monitor memory usage (LibSQL database grows over time)
- CPU usage depends on model complexity and request volume
- Recommended minimum: 512MB RAM, 0.25 CPU cores

### Database Scaling

- Default LibSQL is file-based (single instance)
- For multi-instance: use external database
- Consider memory cleanup strategies for long-running instances

## 🆘 Troubleshooting

### Common Issues

1. **Memory Database Locked**
   ```bash
   # Remove lock file
   rm .voltagent/memory.db-wal
   rm .voltagent/memory.db-shm
   ```

2. **Port Already in Use**
   ```bash
   # Change port in environment
   export PORT=3142
   ```

3. **API Key Issues**
   ```bash
   # Verify API key
   curl -H "Authorization: Bearer $GROQ_API_KEY" https://api.groq.com/openai/v1/models
   ```

### Logs and Debugging

- Enable debug logging: `LOG_LEVEL=debug`
- Check VoltOps Console for detailed execution traces
- Monitor container logs for errors

---

Need help with deployment? Check the [main README](./README.md) or open an issue!