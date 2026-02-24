FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN useradd -m -u 1001 appuser

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

USER appuser

EXPOSE 8080

HEALTHCHECK CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8080')" || exit 1

CMD ["python", "app.py"]