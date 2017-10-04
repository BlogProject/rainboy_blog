## 说明

使用后台上传

 - [x] 文章单个上传
 - [x] 文章全部上传
 - [ ] 图片单个上传
 - [ ] 图片全部上传

默认配置:

```
位置:
~/.config/rainboyblog/config.yml
```

配置样式:

```
# 文件的地址
base_path:/home/rainboy/myblogdata
server:http://blog.rainboy.cc
token:
```

参数:


```
命令 rb

 -h,--help 帮助
--------

-u --update  更新文章
-g --git     上传到git
```

遍历_article 文件夹,过滤掉_draft_开头的文件,后缀不是.md的文件,上传文件信息,返回是增加还是更新

rb
rb -u filename1 filename2

删:

_del_文件下,

rb --del 遍历删除,返回是不是册了,还是原来已经删了

rb --del filename 删除指定

## 图片上传


```
rbi rainboy_blog_i

 -f 强制上传
 指定上传

 rbi all 遍历所有的图片,一个一个上传,如果server有这个图片,就不上传
 rbi -f all 遍历所有的图片,一个一个上传,如果server有这个图片,覆盖
 rbi -d 删除服务端的所有图片
 rbi filename1 filename2 filename3 一个一个上传指定文件
 rbi -f  filename1 filename2 filename3 一个一个上传指定文件,覆盖
```
