FROM python:3.11-slim

# Install Node.js and libsndfile
RUN apt-get update && apt-get install -y \
    curl \
    libsndfile1 \
    libatomic1 \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Install Node dependencies
COPY package*.json .
RUN npm ci --omit=dev

# Copy source
COPY server ./server

EXPOSE 3000
CMD ["node", "server/index.js"]
