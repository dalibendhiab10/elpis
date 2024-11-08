# Use a Node.js image
FROM node:18

# Set the working directory for the app
WORKDIR /app

# Copy and install dependencies for elpis-back
COPY elpis-back/package*.json ./elpis-back/
RUN cd elpis-back && npm install

# Copy and install dependencies for elpis-front
COPY elpis-front/package*.json ./elpis-front/
RUN cd elpis-front && npm install

# Copy all project files
COPY . .

# Build the frontend (React) app for production
WORKDIR /app/elpis-front
RUN npm run build  # This builds the React app into the 'build' directory

# Copy environment variables for backend and frontend
WORKDIR /app/elpis-back
COPY elpis-back/.env .env

WORKDIR /app/elpis-front
COPY elpis-front/.env .env

# Expose the backend port
WORKDIR /app/elpis-back
EXPOSE 4000

# Expose the frontend port (optional since React will be served via Nginx or externally)
WORKDIR /app/elpis-front
EXPOSE 3000

# Start both backend and frontend in parallel
CMD ["sh", "-c", "cd /app/elpis-back && npm start  & tail -f /dev/null"]
