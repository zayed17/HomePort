#!/bin/bash

# Start the client service
echo "Starting client service..."
cd client
npm run dev &

# Start the user service
echo "Starting user service..."
cd "../User services"
npm start &

# Start the property service
echo "Starting property service..."
cd ../property
npm start &

# Start the admin service
echo "Starting admin service..."
cd ../admin
npm start &

# Wait for all background processes to finish
wait