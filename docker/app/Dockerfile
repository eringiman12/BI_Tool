# Stage 1: Build the React app
FROM node:latest
RUN mkdir /api
# 作業ディレクトリを設定
WORKDIR /app/main

# # package.json と package-lock.json をコピー
# COPY package*.json ./

# # 依存関係をインストール
# RUN npm install

# # アプリケーションソースコードをコピー
# COPY . .

# # Reactアプリをビルド
# RUN npm run build

# # Stage 2: Serve the app using Nginx
# FROM nginx:stable-alpine

# # Nginxのデフォルト設定を削除
# RUN rm -rf /usr/share/nginx/html/*

# # ビルドされたファイルをNginxの公開ディレクトリにコピー
# COPY --from=build /app/build /usr/share/nginx/html

# # Nginxの設定ファイルを必要に応じて上書き（オプション）
# # COPY nginx.conf /etc/nginx/nginx.conf

# # コンテナを起動時に公開するポート
# EXPOSE 80

# # Nginxを起動
# CMD ["nginx", "-g", "daemon off;"]