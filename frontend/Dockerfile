# Frontend Dockerfile
FROM node:slim

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .


# Expose port 3000
EXPOSE 3000

CMD ["npm", "run", "dev"]
