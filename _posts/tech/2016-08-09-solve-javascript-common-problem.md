---
layout: post
title: Javascript常见问题及解决办法
date: 2016-08-09 18:18:06 +0800
categories: 技术
tags: JavaScript
keywords: JavaScript,js合并对象
description: 整理记录下Javascript常见问题及解决办法
---

### js如何将两个对象合并成一个对象？
```
//ES2015(ES6)
Object.assign(); //node(4.0以上)环境、有babel转换可直接用；
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };
var o4 = { a: 4 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。

var obj2 = Object.assign(o1, o2, o4);
console.log(obj2); // { a: 3, b: 2 }
console.log(o1);  // { a: 3, b: 2 }
//注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
```
可参见[Object-assign@MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 或 [Object-assign@ruanyifeng](http://es6.ruanyifeng.com/#docs/object#Object-assign)。

#### **Profile**：
```
if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
        throw new TypeError("Cannot convert first argument to object");
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) continue;
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
        }
      }
      return to;
    }
  });
}
```

### Javascript中的去掉字符串(String)中空行

```
String.prototype.removeBlankLines = function () {
	return this.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
}

<!-- 测试用例(es6语法) -->
var testStr = `1 2 3 4 4 5

 			   9 8 8 7 6 5

 			   666


`
console.log(testStr.removeBlankLines())


测试结果，输出如下：
1 2 3 4 4 5
 			   9 8 8 7 6 5
 			   666

```

### 隐藏/改变滚动条的边线
```
#container::-webkit-scrollbar {
    background: transparent;
}

#container:hover::-webkit-scrollbar {
    background: lightyellow;
}
```
参见：[Chrome下滚动条隐藏 不是 overflow那种形式](https://segmentfault.com/q/1010000000204586)

### 设置下拉选择(select)默认值（不可选）

```js
<select v-model="selectedCity" class="select-city" name="" >
    <option value="-1" disabled="disabled" selected = "selected">请选择城市</option>
    <option v-for="(index, itemValue) in cityList" value="{{ index }}">
        {{ itemValue }}
    </option>
</select>
```

### js可以设置网页默认为横屏状态吗？
首先，横竖屏状态是无法用程序控制的，但是，解决方案还是有的：

>1. 打开页面时通过 `window.orientation` 可以判断网页是横屏还是竖屏，如果是竖屏，给整个页面添加样式 `transform: rotate(90deg);` 这样，你的页面就显示横屏的效果了。
2. 用户看到横屏效果，第一反应是旋转手机，这个时候你可以通过window.orientationchange来捕获这个事件，然后再把transform的rotate变回0即可。
总的来说，结合`window.orientationchange`和`window.orientation`可以灵活的对网页进行变换。

参见 [js可以设置网页默认为横屏状态吗？](https://segmentfault.com/q/1010000002793002?_ea=209862)

### JS实现页面全屏
设置页面全屏，鉴于考虑浏览器兼容性，可以Coding Like This：

```
function launchFullScreen(element) {  
   if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}
```

退出全屏:

```
function cancelFullScreen() {  
   if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}  
```

以上可参见:
@MDN [全屏模式切换](https://developer.mozilla.org/zh-CN/docs/DOM/Using_fullscreen_mode)
@张鑫旭 [HTML5全屏API在FireFox/Chrome中的显示差异](http://www.zhangxinxu.com/wordpress/2012/10/html5-full-screen-api-firefox-chrome-difference/)
@小胡子哥 (Barret Lee)[让你的页面瞬间全屏](http://www.cnblogs.com/hustskyking/p/javascript-fullscreen.html#2885642).


### How to detect when a page exits fullscreen?

```
if (document.addEventListener)
{
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function exitHandler()
{
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null)
    {
        /* Run code on exit */
    }
}

//If U Use Jquery, U Can Do Like This:
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange',exitHandlerFunc);
```

以上可参见：
@MDN [全屏模式切换](https://developer.mozilla.org/zh-CN/docs/DOM/Using_fullscreen_mode)
@StackOverFlow [How to detect when a page exits fullscreen?](http://stackoverflow.com/questions/10706070/how-to-detect-when-a-page-exits-fullscreen)

### 禁止手机自带键盘弹出
近期做时间段输入框，用到了 `rome.js`库，然而这个在手机端 **input** 会调起原生输入法，额，这个嘛.... 给文本框设置只读属性即可解此问题 `readonly="readonly"`。

1. Div来代替，然后监听focus事件 将值同时赋给div和隐藏的input。
2. 将文本框设为只读（ readonly="readonly"），这样可以阻止输入事件就不会跳出键盘，同时给文本框添加一个focus事件。

### 给tbody加垂直滚动条
1，把tbody设置成display:block，然后就对其高度设置一个固定值，overflow设置成auto。

2，把thead的tr设置成display:block。

3，因为都设置成block所以要给td手动添加宽度。

4，考虑到 tbody 产生了滚动条，这时会影响tbody以及thead的宽度，可以采用针对tbody设置`::-webkit-scrollbar`进行解决。

### JavaScript实现精准倒计时
```
this.intervalId = setTimeout(countDownStart, 1000)

var _That = this;
function countDownStart(){
    count++
    var offset = new Date().getTime() - (startTime+ count*1000)
    var nextTime = 1000 - offset;
    nextTime = (nextTime < 0) ? 0 : nextTime
    _That.time--
    if(_That.time < 0){
        clearInterval(this.intervalId)
    }else{
        _That.convertToHms( _That.time )
        _That.intervalId = setTimeout(countDownStart, nextTime)
    }
}
```
可参见 [JS实现活动精确倒计时](http://www.xuanfengge.com/js-realizes-precise-countdown.html)

### JavaScript加载图片及404处理
[JS针对图片加载及404处理](http://www.xuanfengge.com/js-image-loading-and-404.html)

### JavaScript随机函数Math.random
[js随机函数Math.random()](http://www.xuanfengge.com/analysis-on-the-js-function-math-random.html)

---

### 前端性能优化之道
[前端性能优化指南](http://www.xuanfengge.com/5757.html)

### 前端组件化之路
[2015前端组件化框架之路](https://github.com/xufei/blog/issues/19)

[致我们终将组件化的Web](http://www.alloyteam.com/2015/11/we-will-be-componentized-web-long-text/)
