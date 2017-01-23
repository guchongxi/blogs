---
layout: post
title: 处理高亮JavaScript代码随记
date: 2016-06-18 17:33:33 +0800
categories: 技术
tags: JavaScript
keywords: highlight,JavaScript
description: 记录下给 http://nicejade.github.io/jade/vue-jade-components-demo.html#/ 折腾给JavaScript高亮历程；
---

在尝试开源 `Vue Common Components` 时候，同时也为其做相关 **Demo** 以及 **Instructions** ————[Vue Common Components Desc and  Example](http://nicejade.github.io/jade/vue-jade-components-demo.html#/) 这个本身采用 **vue** 以及 **vue-router** 实现之。这其中必然涉及到代码示例，因此有特写了一个组件以承载 **Demo** 中js代码。仅仅能承载，必然是需要将其高亮处理的；鉴于时间问题，自然就会选择使用固有的轮子；这里就记录下使用轮子中得一些心得。

网络上充盈着各种 “高性能JavaScript代码高亮插件”；搜索过程中有首先选取了[Highlight](https://highlightjs.org/) (PS: 用的是[Bootstrap中文网开源项目免费 CDN 服务](http://www.bootcdn.cn/))，故此使用之Like This：

```
<head>
<link rel="stylesheet" href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css">
</head>

<body>
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
</body>
```

这样本没有什么问题的；可所用到的页面本就一个，只是用了 **vue-router** 来切换页面显示。而 highlight 对于页面代码高亮的处理方式，目测没有监听到Url地址hash部分变化；如此，当切换到新页面时候，新页面的代码就不会高亮；找了其相关APi，并未能，找见类似处理方案；只能采取如此如下办法：

```
<script>
window.onhashchange = function(){
	location.reload()
	hljs.initHighlightingOnLoad();
};
</script>
```
这其中使用了 **onhashchange**，这是一个HTML 5新增的事件，当#值发生变化时，就会触发这个事件。IE8+、Firefox 3.6+、Chrome 5+、Safari 4.0+支持该事件。如此，虽然可以了，可是也每次切换路由，就得刷新下这个url地址，十分破坏体验。又是一番搜索之后，找见了[SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/)，只因为从搜索情况来看，它提供了处理类似需求的API，所以就有了如下用法：

```
<head>
<link href="http://cdn.bootcss.com/SyntaxHighlighter/3.0.83/styles/shCoreFadeToGrey.min.css" rel="stylesheet">
</head>

<script src="http://cdn.bootcss.com/SyntaxHighlighter/3.0.83/scripts/shCore.min.js"></script>
<script src="http://cdn.bootcss.com/SyntaxHighlighter/3.0.83/scripts/shBrushJScript.min.js"></script>

<script>
SyntaxHighlighter.all();
SyntaxHighlighter.highlight();

window.onhashchange = function(){
	SyntaxHighlighter.all();
	SyntaxHighlighter.highlight();
};
</script>
```

不过使用它的时候，略有点麻烦，需要为承载代码的dom节点添加对应的 class（brush: js）,因此所写的代码高亮组件 template 部分就是这样的了;不过这也不麻烦，就暂且如此处理了。

```
<template lang='jade'>
    pre#pre-wrapper(class="brush: js") ｛ { { codeString ｝} }
    hr
</template>
```
