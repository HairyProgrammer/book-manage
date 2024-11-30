# 微信小程序图书管理系统  

## 软件架构  
- **数据库**: 使用 MySQL 管理，创建了一个数据库和 `book` 表以及 `users` 表。  
- **后端**: 本地后端使用 Node.js，在初始化后端文件夹后，在 `server.js` 文件中编写端口路由。  
- **开发工具**: 使用微信开发者工具。  

## 使用说明  

1. 首先下载 MySQL，并创建一个数据库，添加两个表，表的属性已在 `sql.txt` 文件中给出，选择性向里面添加数据。  
2. 下载 Node.js，在后端文件夹 (`my-backend`) 中的 `server.js` 文件里将数据库换成自己的配置。然后回到 `my-backend` 所在目录，在路径框中输入 `cmd` 并打开命令行窗口，输入 `node server.js`（如果 Node.js 没设置环境变量，这里会报错）。成功执行后会显示 `Server is running`。  
3. 在微信开发者工具中只导入文件夹 `wx`即可，`back-end` 文件夹是用来存放本地 API 代码的。  
4. 为了实现登录功能，可能会遇到 `onload` 的问题，热门页面可能无效，不过问题不大；部分冗余代码存在，但不影响运行，可以选择性优化。  

## 功能说明  

1. 两种登录身份，可注册。  
2. 在书库中可以完成所有图书的信息浏览。  
3. 提供图书的增删改查功能（尚未完善）。  
4. 分类页面可以实现关键字搜索和按类别查找，界面美化尚未做到位。


