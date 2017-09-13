---
title:  "弹性布局中实现文本text-overflow"
data:   2017-09-13
categories: 技术
tags:   flex text-overflow webkit-box
---


## CSS实现单行、多行文本溢出显示省略号（…）

#### 单行文本的溢出显示省略号: 

{% highlight css linenos %}
  width: 100px;
  /* 溢出隐藏 */
  overflow: hidden;
  /* 文本溢出显示效果 */
  text-overflow:ellipsis;
  /* 强制文本不换行 */
  white-space: nowrap;
{% endhighlight %}

#### 多行文本溢出显示省略号(1):

{% highlight css linenos %}
  /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical;
  /* 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性 */
  -webkit-line-clamp: 3;
  overflow: hidden;
{% endhighlight %}

**兼容性: 因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；**

#### 多行文本溢出显示省略号(2):

{% highlight css linenos %}
  p {
      position: relative; 
      line-height: 20px; 
      max-height: 40px;
      overflow: hidden;
  }
  p::after {
    content: "..."; 
    position: absolute; 
    bottom: 0; 
    right: 0; 
    padding-left: 40px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
  }
{% endhighlight %}

### 注意
1. 将height设置为line-height的整数倍，防止超出的文字露出。
2. 给p::after添加渐变背景可避免文字只显示一半。
3. 由于ie6-7不显示content内容，所以要添加标签兼容ie6-7（如：<span>…<span/>）；兼容ie8需要将::after替换成:after。

#### 结合flex布局

因容器宽度自使用, 使用text-overflow会出现问题

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="minimum-scale=1.,maximum-scale=1.0,initial-scale=1.0,user-scalable=no">

    <title>Title</title>

    <style>
        .app * {
            margin: 0;
            padding: 0;
        }

        .app, .remark {
            display: flex;
        }

        .left, .right, .tel {
            flex-shrink: 0;
        }

        .middle {
            flex-grow: 1;
            margin: 0 10px;
        }

        .addr {
            flex-grow: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
    </style>
</head>
<body>
<div class="app">
    <div class="left">居左定宽</div>
    <div class="middle">
        <h2 class="title">独占一行</h2>
        <div class="remark">
            <span class="addr">自适应, 空间不足则文本省略显示,可将控制台打开调整宽度测试</span>
            <span class="tel">居右,完全显示且不换行</span>
        </div>
    </div>
    <div class="right">居右定宽</div>
</div>
</body>
</html>
{% endhighlight %}








