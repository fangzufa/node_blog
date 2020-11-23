# Blog nodejs 开发博客系统


## main    分支 不使用任何框架  
使用nginx反向代理实现联调  


## express 分支 使用 express-generator 脚手架  
http://localhost:3000/html/index.html  


## koa2    分支 使用 koa2 脚手架  
node 版本大于8.0
http://localhost:3000/html/index.html  


## pm2 线上环境分支  
pm2 进程守护，启动多进程，日志记录




> 切换分支后需删除 node_modules 文件夹 重新 install

```sh
npm install
npm run serve
```