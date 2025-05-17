# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Đảm bảo encoding UTF-8
ENV LANG=C.UTF-8
RUN npm run build

# Production stage
FROM nginx:alpine
# Đảm bảo encoding UTF-8
ENV LANG=C.UTF-8
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]