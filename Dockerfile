FROM node:16 AS builder

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

WORKDIR /app

COPY package*.json ./

RUN npm install --registry=http://registry.npm.taobao.org

COPY . .

RUN npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM nginx:1.21.1

# 定义编码
ENV LC_ALL="C.UTF-8" LANG="C.UTF-8"

# Update timzone of container
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]