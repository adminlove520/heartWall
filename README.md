# 照片墙项目
- @author: **Anonymous**
- @date: 2025-05-25
- @version: 1.0.0
## 项目简介
**only for you~**

## 功能说明
- 照片3D立体排列展示
- 点击照片居中并放大预览
- 自动轮播功能
- 背景音乐播放
- 樱花飘落特效

## 使用方法
1. 将照片放入`img`文件夹，重命名|source文件夹为BGM资源，按需添加|最后修改`index.html`中的图片路径和背景音乐路径
- 1.1、重名脚本：先全选重命名输入 `photo`,将[重命名脚本](./scripts/rename.bat)，移动至`img`文件夹，并双击运行
2. 打开`index.html`即可运行
3. 点击照片可放大预览并开始自动轮播
4. 再次点击预览区域可关闭预览
## TODO
- [x] 阿里云oss读取静态资源
- [x] CDN加速
- [x] 增加背景音乐循环

## Netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/ed1c8c85-90b2-443e-8a19-7ba2482748e2/deploy-status)](https://app.netlify.com/projects/loveyou521/deploys)
