echo "Starting client service..."
cd client
npm run dev &

echo "Starting user service..."
cd "../User services"
npm start &

echo "Starting property service..."
cd ../property
npm start &

echo "Starting admin service..."
cd ../admin
npm start &

wait