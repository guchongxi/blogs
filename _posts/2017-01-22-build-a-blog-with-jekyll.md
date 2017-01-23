---
title:  "Github Pages + Jekyll 创建博客"
date:   2017-01-22
categories: 技术
tags: jekyll GitHub Pages
---
`转载自`[http://playingfingers.com/2016/03/26/build-a-blog/](http://playingfingers.com/2016/03/26/build-a-blog/)

>人生道路上布满了坑，于是有了人生导师。
美丽的地球上布满了坑，于是有了Google Earth。
使用Github Pages搭建独立博客的过程中布满了坑，所以有了这篇指南


### Github Pages + Jekyll 方案  

#### 优点：
_Github免费托管源文件，自动编译符合Jekyll规范的网站。
引入版本管理，修改网站更加安全方便。
支持 Markdown ，编写具有优美排版的文章。_  

#### 不足：
_需要学习一些基础的Git命令。
若要自己全权制作主题的话需要懂一点网页开发。
由于生成的是静态网页，若要使用动态功能，如评论功能（下文解决），则要使用第方服务。_

### 关于域名
域名购买方面就不做过多介绍，网上都有很多(如：[万网](https://wanwang.aliyun.com))，主要讲一下域名配置(以阿里万网为例)。
设置DNS - 进入阿里域名控制台，选择需要使用的域名
![](/assets/img/2017-01-22/1.png)
点击修改DNS
![](/assets/img/2017-01-22/2.png)
修改域名服务器地址为：`F1G1NS1.DNSPOD.NET` 和 `F1G1NS2.DNSPOD.NET`
设置好后进入[DNSPod](http://www.dnspod.cn)
注册账号后邓丽进入域名解析,点击"添加域名"
![](/assets/img/2017-01-22/3.png)
添加好之前购买的域名，点击你的域名进入记录管理。按照下图添加每条记录。
![](/assets/img/2017-01-22/4.png)
前两条A型记录值 192.30.252.153 和 192.30.252.154 是GitHub的服务器地址，可以在[这里](https://help.github.com/articles/troubleshooting-custom-domains/#dns-configuration-errors)查到。
NS类型记录是默认不可变的。
CNAME类型的记录值填写 `{username}.github.io`
Tip: 用你的Github用户名替换上面的 `{username}`

### 关于Git
Git环境安装及基本配置请查看，这里不再赘述
在git的个人主页中c创建一个新的项目库 Repository name设置为 `{username}.github.io`
这个库的名称就是你在[github pages](https://pages.github.com/)中的主页地址

#### 绑定域名
  接下来让你能用之前购买的域名来访问你的网站。
  在你的代码仓库中创建`CNAME`文件,修改文件内容为之前设置的域名，这样你就可以用自己的域名访问你的Github Pages啦！

### 进阶：安装Jekyll本地编译环境
  每次修改了本地文件，都要至少经过三个命令和服务器延迟刷新才能看到修改的效果，是不是有点疼？
  如果你觉得“疼！” 那么这部分就是你的解药。

#### 环境安装
  >本文主要介绍windows环境下的安装，Mac和Linux环境下可以使用自带的包管理器进行安装，可参考[这篇文章](http://www.cnblogs.com/daguo/p/4097263.html)。

  1.安装 [Ruby](http://rubyinstaller.org/downloads/)
  ![](/assets/img/2017-01-22/5.png)

  **注意：这里一定要勾选添加到环境变量PATH！ install-ruby-02**
  ![](/assets/img/2017-01-22/6.png)

  2.安装 [RubyGems](https://rubygems.org/pages/download)

  windows下下载ZIP格式较为方便，下好后解压到本地任意路径，下面以 `{unzip-path}` 代替你解压的路径。 打开windows的cmd终端（按win+R快捷键打开“运行”，输入cmd，确定），输入命令:
  {% highlight cmd %}
  $ cd {unzip-path}  //如果你没有解压在C盘，windows的终端切换到其他盘需要写为 cd /d {unzip-path}
  $ ruby setup.rb
  {% endhighlight %}

  3.安装Jekyll

  在终端里输入
  {% highlight cmd %}
  $ gem install jekyll
  {% endhighlight %}

  4.安装jekyll-paginate

  在终端里输入
  {% highlight cmd %}
  $ gem install jekyll-paginate
  {% endhighlight %}
  如遇到以下错误，说明网络不通：
  {% highlight cmd %}
  ERROR:  While executing gem ... (Gem::RemoteFetcher::FetchError)
  Errno::ECONNRESET: An existing connection was forcibly closed by the remote host.
  {% endhighlight %}
  这时候有三种解决方法：

  1. 等天气好的时候再来
  2. 架梯子
  3. [推荐] 更换为[Ruby China](https://gems.ruby-china.org/)源，点进去会有详细的设置方法。  
  
#### 开启本地实时预览  
  上一小节的安装都完成以后，在终端中输入命令
  {% highlight cmd %}
  $ cd {local repository} // {local repository}替换成你的本地仓库的目录
  $ jekyll serve
  {% endhighlight %}
  1.如遇到以下错误，在仓库文件 `_config.yml` 中加入一句 `gems:jekyll-paginate` 即可。
  {% highlight cmd %}
  Deprecation: You appear to have pagination turned on, but you haven't included the `jekyll-paginate` gem. Ensure you have `gems: [jekyll-paginate]` in your configuration file.
  {% endhighlight %}
  2.如遇到以下错误
  {% highlight cmd %}
  jekyll 3.1.2 | Error:  Permission denied - bind(2) for 127.0.0.1:4000
  {% endhighlight %}
  说明有程序在占用这个本地端口，这时候输入命令
  {% highlight cmd %}
  $ netstat -ano
  {% endhighlight %}
  可以看到如下进程与所占用端口的对应情况，找到本地地址为 127.0.0.1:4000 的记录，看到该条记录的PID为6668 (当然你的和我的不一样)。
   ![](/assets/img/2017-01-22/7.png)

  输入命令
  {% highlight cmd %}
  $ tasklist /svc /FI "PID eq 6668"
  {% endhighlight %}
  该进程的名称就会显示出来:
  ![](/assets/img/2017-01-22/8.png)

  打开windows的任务管理器，结束它：
  ![](/assets/img/2017-01-22/9.png)

  再次运行 `jekyll serve` 就可以了。

  如果一切顺利，通过在浏览器地址栏输入 `http://localhost:4000/` 回车就已经可以看到自己网站的模样啦。

  只要 `jekyll serve` 服务开着，你的本地仓库文件有任何更新，本地网站刷新都能马上看到，欧耶！










