<!--
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:12:40
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-04 09:56:25
-->

`DATABASE_URL="file:./dev.db"`

nest-cli 添加
`"generateOptions": { "spec": false }`
取消生成测试文件

创建新资源
npx nest g resource name
npx nest g re name

创建本地 sqlite 连接
npx prisma init --datasource-provider sqlite

创建生成器
npx prisma migrate dev --name init

生成数据库
npx prisma db push

生成拦截器
npx nest g in all-response

异常捕获
npx nest g f any-expection

创建中间件
npx nest g mi validata-data

部署到 vercel 1.需要安装@vercel/node
2.vercel.json 添加以下代码
`{ "version": 2, "name": "blog-server", "builds": [ { "src": "dist/main.js", "use": "@vercel/node" } ], "routes": [ { "src": "/(.*)", "dest": "dist/main.js" } ] }`
3.npm run build
4.npx vercle login
5.npx vercel --prod

#### 发布问题

修改 prisma 下的 schema.prisma 的数据库类型
每次重新生成 prisma
修改 build 为`"build": "prisma generate && nest build",`
pub:` "pub": "npm run build && npx vercel --prod "`

### 多个环境 env

使用不同的 env 文件
`dotenv -e .env`
`dotenv -e .env.local`

### 关于 prisma

##### 从头开始，连接新数据库

plantscale 为例
``
generator client {
provider = "prisma-client-js"
previewFeatures = ["referentialIntegrity"]
}

datasource db {
provider = "mysql"
url = env("DATABASE_URL")
referentialIntegrity = "prisma"
}
``

schema.prisma 中添加 model 运行`npx prisma migrate dev --name init`将数据模型映射到数据库架构，将清除数据库所以内容

###### 连接现有数据库

plantscale 为例
`
generator client {
provider = "prisma-client-js"
previewFeatures = ["referentialIntegrity"]
}

datasource db {
provider = "mysql"
url = env("DATABASE_URL")
referentialIntegrity = "prisma"
}
`

1.`npx prisma db pull`拉取已有的数据架构，并修改 schame 的 model;

2.`npx prisma db push`推送本地 model 到数据库创建修改表

### localtunnel

###### 本地端口映射

全局安装
`npm install -g localtunnel`
快速开始
`npx localtunnel --port 8000`
自定义域名
`npx localtunnel --port 8000 --subdomain \*\*`
