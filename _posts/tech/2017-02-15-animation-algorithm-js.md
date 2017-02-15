---
title:  "缓动动画JS"
date:   2017-02-15
categories: 技术
tags: animation algorithm js
---

>文章转载自 [分享一个即插即用的私藏缓动动画JS小算法](http://www.zhangxinxu.com/wordpress/?p=5875)

{% highlight js %}
// requestAnimationFrame的兼容处理
if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17);
    };	
}
Math.easeout = function (A, B, rate, callback) {
    if (A == B || typeof A != 'number') {
        return;    
    }
    B = B || 0;
    rate = rate || 2;
    
    var step = function () {
        A = A + (B - A) / rate;
        
        if (A < 1) {
            callback(B, true);
            return;
        }
        callback(A, false);
        requestAnimationFrame(step);    
    };
    step();
};
{% endhighlight %}

其中：
* A是起始位置；
* B是目标位置；
* rate是缓动速率；
* callback是变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）；

{% highlight js %}
var doc = document.body.scrollTop? document.body : document.documentElement;
Math.easeout(doc.scrollTop, 0, 4, function (value) {
    doc.scrollTop = value;
});
{% endhighlight %}












