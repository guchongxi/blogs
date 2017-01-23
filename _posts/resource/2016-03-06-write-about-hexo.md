---
layout: post
title: Hexo使用纪实
category: 资源
tags: Hexo
keywords: Hexo
description: 纪录下Hexo搭建书写Blog时，遇到的问题以及解决方案等。
---

自15年初开始采用 `Hexo` 写Blog([www.jeffjade.com](http://www.jeffjade.com))，异常的方便简洁。但是偶尔也会遇到一些问题。本着学以致用的原则，也没专门去对 `Hexo`作更深入的了解；所以这里记载下使用 `Hexo`时遇到的一些问题以及解决办法。

## Hexo解决：fatal: multiple stage entries for merged file "xxx"
近期在使用Hexo发布一篇 [新编码神器Atom使用纪要](http://www.jeffjade.com/2016/03/03/2016-03-02-how-to-use-atom/#) 文章时，遇到一个问题：

>fatal: multiple stage entries for merged file "xxx"

对于这个问题，网上得出的答案，是关于 `git`提交时的。一般解决办法是：

```shell
rm .git/index  
git add -A  
git commit -a  
```
而 `Hexo` 的方便之处，在于将Git操作封装在Hexo中了，比如：

```shell
Hexo s(server)  
Hexo g(generate)  
Hexo d(deploy)  
```

折腾一番发现，这个相比原生 `Git`，是将向仓库提交的东西，放在了 `.deploy_git`隐藏文件下了，所以只需要如下这样即可：

```shell
rm .git/index  
hexo clean
hexo g  
hexo d  
```
