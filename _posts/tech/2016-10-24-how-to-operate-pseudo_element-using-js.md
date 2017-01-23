---
layout: post
title: 如何使用JS操纵伪元素
date: '2016-10-24 16:10:06 +0800'
categories: 技术
tags: JavaScript
keywords: JavaScript操纵伪元素
description: 何为伪元素，JavaScript如何操纵伪元素，如何改变伪元素的 content 值？
---

对于对伪类与伪元素的描述，可参见[css2.1 Selectors](https://www.w3.org/TR/CSS2/selector.html#pseudo-elements)：

>CSS introduces the concepts of pseudo-elements and pseudo-classes  to permit formatting based on information that lies outside the document tree.

这直译过来就是：css引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。

<div class="picture-bg animated bounceInLeft">
<p class='change-color'>Operate Pseudo-element</p>
<p class='change-color'>Using JavaScript</p>
</div>

**伪类** 用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。虽然它和普通的css类相似，可以为已有的元素添加样式，但是它只有处于dom树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

**伪元素** 譬如::before和::after伪元素，用于在CSS渲染中向元素的头部或尾部插入内容，它们不受文档约束，也不影响文档本身，只影响最终样式。这些添加的内容不会出现在DOM中，仅仅是在CSS渲染层中加入。它不存在于文档中，所以JS无法直接操作它。而jQuery的选择器都是基于DOM元素的，因此也并不能直接操作伪元素。那该怎样操作伪元素的样式呢？为此总结整理一篇，以备查用。

## 有哪些伪元素

到目前为止 (@2016-10) 伪元素有七个，分别列之于下：

> :first-letter：向文本的第一个字母添加特殊样式。　
:first-line:　向文本的首行添加特殊样式。　
:before：在元素之前添加内容。　
:after：在元素之后添加内容。　
::placeholder：匹配占位符的文本，只有元素设置了placeholder属性时，该伪元素才能生效。
::selection：CSS伪元素应用于文档中被用户高亮的部分（比如使用鼠标或其他选择设备选中的部分）　
::backdrop(处于试验阶段)：用于改变全屏模式下的背景颜色，全屏模式的默认颜色为黑色。该伪元素只支持双冒号的形式

## 获取伪元素的属性值

获取伪元素的属性值可以使用window.getComputedStyle()方法，获取伪元素的CSS样式声明对象。然后利用getPropertyValue方法或直接使用键值访问都可以获取对应的属性值。

>**语法：** window.getComputedStyle(element[, pseudoElement])
**参数：**
1. element（Object）：伪元素的所在的DOM元素；
2. pseudoElement（String）：伪元素类型。可选值有：”:after”、”:before”、”:first-line”、”:first-letter”、”:selection”、”:backdrop”；

譬如示例如下：

```
// CSS代码
<style type="text/css">
#jadeId:before {
    content: "hello nicejade!";
    display: block;
    width: 100px;
    height: 100px;
    background: red;
}
</style>

// HTML代码
<div id="jadeId"></div>

// JS代码
<script type="text/javascript">
var myIdElement = document.getElementById("jadeId"),
    beforeStyle = window.getComputedStyle(myIdElement, ":before");
console.log(beforeStyle); // [CSSStyleDeclaration Object]
console.log(beforeStyle.width); // 100px
console.log(beforeStyle.getPropertyValue("width")); // 100px
console.log(beforeStyle.content); // "hello nicejade!"
</script>
```

对于如上还可以补充的是：

1. getPropertyValue()和直接使用键值访问，都可以访问CSSStyleDeclaration Object。它们两者的区别有：

>
- 对于float属性，如果使用键值访问，则不能直接使用getComputedStyle(element, null).float，而应该是cssFloat与styleFloat；
- 直接使用键值访问，则属性的键需要使用驼峰写法，如：style.backgroundColor；
- 使用getPropertyValue()方法不可以驼峰书写形式（不支持驼峰写法），例如：style.getPropertyValue(“border-top-color”)；
- getPropertyValue()方法在IE9+和其他现代浏览器中都支持；在IE6~8中，可以使用getAttribute()方法来代替；

2. 伪元素默认是”display: inline”。如果没有定义display属性，即使在CSS中显式设置了width的属性值为固定的大小如”100px”，但是最后获取的width值仍是”auto”。这是因为行内元素不能自定义设置宽高。解决办法是给伪元素修改display属性为”block”、”inline-block”或其他。


## 更改伪元素的样式

### 法1. 更换class来实现伪元素属性值的更改：

```
// CSS代码
.red::before { content: "red"; color: red; }
.green::before { content: "green"; color: green; }

// HTML代码
<div class="red">内容内容内容内容</div>

// jQuery代码
$(".red").removeClass('red').addClass('green');
```

### 法2. 使用CSSStyleSheet的insertRule来为伪元素修改样式：

```
document.styleSheets[0].addRule('.red::before','color: green'); // 支持IE

document.styleSheets[0].insertRule('.red::before { color: green }', 0); // 支持非IE的现代浏览器
```

### 法3. 在<head>标签中插入<style>的内部样式：

```
var style = document.createElement("style");
document.head.appendChild(style); sheet = style.sheet;
sheet.addRule('.red::before','color: green'); // 兼容IE浏览器

heet.insertRule('.red::before { color: green }', 0); // 支持非IE的现代浏览器

// 亦可以使用 JQuery:
$('<style>.red::before{color:green}</style>').appendTo('head');
```

## 修改伪元素的content的属性值

### 法1. 使用CSSStyleSheet的insertRule来为伪元素修改样式

```
var latestContent = "新修改的内容";
document.styleSheets[0].addRule('#jadeId::before','content: "' + latestContent + '"');  // 兼容IE浏览器

document.styleSheets[0].insertRule('#jadeId::before { content: "' + latestContent + '" }', 0); // 支持非IE的现代浏览器
```

### 法2. 使用DOM元素的 data-\* 属性来更改content的值

```
// CSS代码
.jadeId::before {
    content: attr(data-attr);
    color: red;
}

// HTML代码
<div class="jadeId" data-attr="jadeId">nciejade.io</div>

// JacaScript代码
$('.jadeId').attr('data-attr', '新修改的内容');
```

## 其他小小建议

1. 伪元素的 `content` 属性很强大，可以写入各种字符串和部分多媒体文件。但是伪元素的内容只存在于CSS渲染树中，并不存在于真实的DOM中。所以为了SEO优化，最好不要在伪元素中包含与文档相关的内容。
2. 修改伪元素的样式，建议使用通过更换class来修改样式的方法。因为其他两种通过插入行内CSSStyleSheet的方式是在JavaScript中插入字符代码，不利于样式与控制分离；而且字符串拼接易出错。
3. 修改伪元素的content属性的值，建议使用利用DOM的 `data-\*` 属性来更改。

---

相关参考文章：  
- [使用JS控制伪元素的几种方法](http://www.dengzhr.com/frontend/css/797)     
- [总结伪类与伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)      
