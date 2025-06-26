# Build Stage
FROM node:alpine AS builder

ARG VITE_API_URL
ENV VITE_API_URL=https://api.etter.app

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve
FROM node:alpine

RUN npm install serve --g

WORKDIR /frontend
COPY --from=builder /frontend/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]