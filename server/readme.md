## 后台设计

只需要通过web-api 就可以完成交互

只有一个article的DB的cellection

如果一个文章是系列文章,它应该和同系列的文章在同一个文件夹


```
|---- _articles 发布的文章
 |---- series_name1 同系列的文章在一个文件夹
 |---- 容易记的名字 有关的文章在一个容易记,分类的文件夹下
 |----  _draft_文章标题.md 草稿文件
|---- images 图片
|---- _del_ 删除的文件



```

## model设计

article

```
  _id:{ type:String, unique:true ,default:shorid.generate},
  title:String, //标题
  category:String,//分类
  content:String,
  summary:String,//摘要
  md5:String,
  visits:{   //浏览数量 type:Number, default:0 }, 
  tags:[],
  hidden:{ type:Boolean, default:false },
  ctime:{type:Date,default:Date.now},
  update:{type:Date, default:Date.now },
  series:{type:String,default:''}
})
```


## 文章样式

_draft_文章标题.md

如果文章是以`_draft_`

```
---
_id: rJ7FnyMBb
title: readme
date: 2017-07-11 14:16
update: 2017-07-11 14:16
series: 系列文章
summary:
categories:
    - 分类 
tags:
    - tag 
---


# markdown

```

### 图片上传

`_images`文件夹下的图片上传

 - 读取图片的名字,列表
 - 在web_server下不存在图片文件,并返回一个列表
 - 通过_server返回的列表,批量上传图片


返回列表样式:

```
{
    'path-key':md5
}
```

## api设计

| api                      | methods | 作用                                    |
|--------------------------|---------|-----------------------------------------|
| /article?fliter          | get     | 得到文件列表                            |
| /article/:id             | get     | 得到一个上传的文章                      |
| /article/opt/upload      | post    | 上传/更新一个文章                       |
| /article/opt/isExit?_id= | get     | 某个文章是否存在,用于是否上传和更新文章 |
| /images/list             | get     | 图片文件列表                            |
| /images/upload           | post    | 批量上传图片                            |
| /images/clearall         | get     | 删除server上的所有图片                  |


## 文章列表

参数

 - page
 - pageSize
 - tags
 - series=''
 - category
 - sort=1

返回数据

```json
{
  "count":10,
  "page":1,
  "pageSize":10,
  "totalPage":1,
  "data":[]
}
```
