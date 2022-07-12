<!--
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:12:40
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-11 09:44:09
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
