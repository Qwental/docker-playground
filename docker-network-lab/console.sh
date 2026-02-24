docker build -t network-api .

cd ..

docker network create --driver bridge front_net || true
docker network create --driver bridge back_net || true

docker run -d \
  --name db \
  --network back_net \
  -e POSTGRES_PASSWORD=postgres \
  postgres:15-alpine || true

docker run -d \
  --name api \
  --network front_net \
  network-api || true

docker network connect back_net api || true

echo "Starting frontend (nginx in front_net)..."
docker run -d \
  --name frontend \
  --network front_net \
  nginx:alpine || true
