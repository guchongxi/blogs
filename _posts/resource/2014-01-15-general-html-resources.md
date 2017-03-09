---
layout: post
title: HTML 常用资源
category: 资源
tags: HTML
keywords: HTML
description:
---

## 常用属性

### 在link中可能会出现media=screen的情况
这个属性是确定在哪种情况下使用这个link的css文件，screen是指输出到屏幕，而print用于打印

### 在meta中增加viewport选项
viewport的作用是告诉浏览器，目前的装置情况。

    <meta name="viewport" content="width=device-width;initial-scale=1.0">

- width:数字或device-width   设置宽度
- height:数字或device-width    设置高度
- initial-scale:最小0.25，最大5   初始缩放
- minimum-scale:最小0.25，最大5   最小缩放
- maximum-scale:最小0.25，最大5   最大缩放
- user-scalable:1或0(yes or no)  是否允许用户缩放

### 在meta中增加http-equiv选项
作用是告诉浏览器以什么版本内核来渲染页面

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

- IE: ie浏览器 edge 最新内核渲染
- chrome: 谷歌浏览器 1 最新内核渲染
