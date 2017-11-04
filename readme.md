
## blog2

基于vue2.0的,对上一个基于vue1.0的版本,加上好用的iview组件库写给**Rainboy**自己用的Blog

## 安装

### 安装后台server

首先安装`docker`,参考阿里云的docker[安装方法](https://yq.aliyun.com/articles/29941)

安装`mongodb`

```
docker pull mongodb
```

安装blog_server:

```
# 修改token
echo 'your_token' > ./server/token.txt
cd ./server
docker build  ./ -t blog_server
# 运行
docker run -p 3000:3000 blog_server -d
```


## 使用

## 文章

### 文章的属性yml

开头如下的yml格式

```
_id:
title:
summary:
category:
 - category1
 - category2
tags:
 - tag1
 - tag2
hidden:
ctime:
series:
```


### 如何安排自己的文章存放方式

可以建立三个文件夹如下
```
post
draft
trash
```

同系列的文章,可以创建一个文件夹,放入同一个文件下

也可以根据分类来创建文件夹

```
category
|
--- series
```

## 设计思路


见`doc/`文件夹下

## scripts命令行工具

使用之前设定好自己的token

```
rb -u atirle1 article2 article3
rb -u //遍历base_dir下的所有md文件,然后提交
rb -i image1 image2 
rb -i 
```
