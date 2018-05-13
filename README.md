# 2018 年深职院网页设计大赛作品

## 背景

因为主题是和美食相关，并且最近在观看一部也和主题相关的动画，所以为里面的主人公搭建了一个个人播客，用于分享制作美食的经验。

## 截图

## 技术栈

 - 前端：React + React Router + Antd + Axios
 - 后端：Fastify + Mongorito + Mongodb

本引用为同构应用，前端为 SPA 架构，支持 SSR，即服务端渲染。

## 开发模式

### 前端

```
npm run start // 热更新开发
npm run build // 打包前端应用
```

### 后端

```
npm run dev // 自动重启服务
npm run watch:server // 自动编译
npm run build:server // 打包后端应用
```

 > 后端开发需要同时运行`dev`和`watch:server`命令。

### .env 文件配置

```
DB_HOST=localhost:27017
DB_USER=root
DB_PASS=
SERVER_HOST=127.0.0.1
PORT=3001
SECRET=
```

## 部署应用

服务端需要安装最新版本的 NodeJS、NPM 和 Mongodb。需要配置相对于的环境变量，参考上方的 .env 文件配置。