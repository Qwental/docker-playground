# Three Stage Docker

Stages planned:
1. deps
2. test
3. production

Build test stage:
docker build --target test -t web-app:test .

Build production:
docker build -t web-app:prod .
