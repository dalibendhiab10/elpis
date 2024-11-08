# Use a Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy and install dependencies for elpis-back
COPY elpis-back/package*.json ./elpis-back/
RUN cd elpis-back && npm install

# Copy and install dependencies for elpis-front
COPY elpis-front/package*.json ./elpis-front/
RUN cd elpis-front && npm install

# Copy all project files
COPY . .

# Copy environment variables for backend and frontend
WORKDIR /app/elpis-back
COPY elpis-back/.env .env

WORKDIR /app/elpis-front
COPY elpis-front/.env .env

# Set working directory to elpis-back and expose its port
WORKDIR /app/elpis-back
EXPOSE 4000

# Set working directory to elpis-front and expose its port
WORKDIR /app/elpis-front
EXPOSE 3000

# Start both backend and frontend in parallel
CMD ["sh", "-c", "cd /app/elpis-back && npm start & cd /app/elpis-front && npm build"]
