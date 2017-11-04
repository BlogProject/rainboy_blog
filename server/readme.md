## 后台设计

只需要通过web-api 就可以完成交互

只有一个article的DB的cellection

如果一个文章是系列文章,它应该和同系列的文章在同一个文件夹

| api                 | methods | 作用                     |
|---------------------|---------|--------------------------|
| /article?fliter     | get     | 得到文件列表             |
| /article/:id        | get     | 得到一个上传的文章       |
| /article/opt/upload | post    | 上传/更新一个文章        |
| /article/cst        | get     | 得到文章的分类,系列,标签 |
| /image/upload       | post    | 上传图片                 |

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

```js
  _id:{ type:String, unique:true ,default:shorid.generate},
  title:String, //标题
  category:{type:Array,defalut:[]},//分类
  content:String,
  summary:String,//摘要
  md5:String,
  visits:{   //浏览数量 type:Number, default:0 }, 
  tags:[],
  hidden:{ type:Boolean, default:false },
  date:{type:Date,default:Date.now},
  update:{type:Date, default:Date.now },
  series:{type:String,default:''}
})
```


## 文章样式

_draft_文章标题.md

如果文章是以`_draft_`,那表明这个文章是一个草稿.


```
---
_id: rJ7FnyMBb
title: readme
date: 2017-07-11 14:16
series: 系列文章
summary:
category:
    - 分类 
tags:
    - tag 
---


# markdown

```



## api设计


### 文章上传

api:`/article/opt/upload`
method:`post`
需要key

接收一个json数据,json的格式为

```js
{
    _id:唯一的标识,字符串
    title:标题
    categorey:[]
    content: 原文件解析后的markdown部分
    md5:原文件的md5值
    tags:[] 标签数组
    hidden: 是否隐藏
    series: 哪个系列文章
}
```

更新文章成功后会返回json数据:

```js
{
    status:0,
    doc:doc
}
```
 
这个api同样可以用来更新文章,

### 得到某一个文章

api:`/artilce/:id`
method:`get`

其中`:id`为文章的`_id`标识,返回的json数据数据为:

```js
{
    status:0,
    doc:doc //doc为文章的json格式数据
}
```

如果文件不存在:

```js
{
    status:-1,
    message:"not found"
}
```

### 得到文件列表

api:`article?tags=your_tag&category=your_category&series= your_series`
method:`get`

全部参数

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

### 得到所有的文章的分类和系列和tags

api:`article/opt/cst`

返回数据

```js
{
    status:0,
    category: 分类数组
    tags: 标签数组
    series: 系列数组
}
```

### 图片上传

api: `/image/upload`
method:`post`

只接受的`multipart/form-data`的数据,且图片的`key`为`file`,一次只能上传一个文件,上传到`images`目录,文件名会保侍为原文件名,如果`images`下面已经有同名文件,将会替换且不会提醒.

上传成功后返回的json数据为:

```json
{
    "status":0,
    "message":"ok"
}
```


