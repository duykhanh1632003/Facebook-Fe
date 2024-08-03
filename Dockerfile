# Sử dụng image node chính thức để build ứng dụng
FROM node:20 as build

# Đặt thư mục làm việc cho giai đoạn build
WORKDIR /app

# Sao chép tệp package.json và package-lock.json để cài đặt phụ thuộc
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng cho môi trường production
RUN npm run build

# Sử dụng image nginx chính thức để phục vụ ứng dụng
FROM nginx:alpine

# Copy các tệp build của ứng dụng vào thư mục gốc của nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 để truy cập
EXPOSE 80

# Khởi động nginx khi container chạy
CMD ["nginx", "-g", "daemon off;"]
