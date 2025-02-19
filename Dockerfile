# Step 1: Use an official Node.js image as the base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build TypeScript files into JavaScript
RUN npm run build

# Step 7: Expose the application port (default for Node.js apps)
EXPOSE 3000

# Step 8: Run the application (start the built app)
CMD [ "npm", "start" ]
