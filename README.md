# 顾重の部落格

访问请移步[giantr.top](http://giantr.top)


## Fork说明

 *原作请至 [https://github.com/P233/3-Jekyll](https://github.com/P233/3-Jekyll)


## 使用

#### 设置 > `/_config.yml`

`_config.yml` 文件用来进行基本的网站信息,包括:_作者信息_、_站点信息_、_阅读处理_、_服务器选项_、_默认模版_、_侧边栏过滤器_、_输出url_、_评论_、_google analytics 设置_ 和 _Build settings_，可依据各注释项进行个性化修改。

#### 样式 >　`/css/main.sass`

样式相关的 Sass 变量都存储在 `/css/main.sass` 文件中，修改这个文件可以满足大部分样式定制的需求。建议首先修改 `$gradient-start` 与 `$gradient-end` 两个变量，给自己的博客使用独一无二的侧边栏背景；
其他部分样式文件在`/_sass`文件夹内。

#### 文章 > `/_post`
按照 _yyyy-mm-dd-name.md_ 命名的文件会显示在侧边栏中；`/index.md`文件为主页默认展示内容。

#### 资源 >　`/_assets`
站内的图片、音频、视频等静态资源可存储在这里。

#### 其他
`/_includes`文件夹内为页面公用模版文件,`/_layouts`文件夹内为文章布局模版文件,`/_sass-cache`和`/_site`文件夹(若有)内为缓存文件,不需理会；
部分功能，如：评论、google analytics、社交账号等功能需另外注册或开启相关服务，使用过程中需注意。



