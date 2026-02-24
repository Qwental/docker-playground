FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn package -DskipTests


FROM gcr.io/distroless/java17-debian11

WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

EXPOSE 8080

USER nonroot
ENTRYPOINT ["java","-jar","/app/app.jar"]