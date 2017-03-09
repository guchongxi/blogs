---
title:  "使用Promise时的问题"
data:   2017-02-23
categories: 技术
tags:   js promise javascript
---

>文章转载自 [我们在promises的使用上存在问题](http://blog.csdn.net/fendouzhe123/article/details/46602451?locationNum=5&fps=1)

## promise主要用法背忘单
{% highlight js linenos %}
    // Promise.all is good for executing many promises at once
    Promise.all([
      promise1,
      promise2
    ]);

    // Promise.resolve is good for wrapping synchronous code
    Promise.resolve().then(function () {
      if (somethingIsNotRight()) {
        throw new Error("I will be rejected asynchronously!");
      } else {
        return "This string will be resolved asynchronously!";
      }
    });

    // execute some promises one after the other.
    // this takes an array of promise factories, i.e.
    // an array of functions that RETURN a promise
    // (not an array of promises themselves; those would execute immediately)
    function sequentialize(promiseFactories) {
      var chain = Promise.resolve();
      promiseFactories.forEach(function (promiseFactory) {
        chain = chain.then(promiseFactory);
      });
      return chain;
    }

    // Promise.race is good for setting a timeout:
    Promise.race([
      new Promise(function (resolve, reject) {
        setTimeout(reject, 10000); // timeout after 10 secs
      }),
      doSomethingThatMayTakeAwhile()
    ]);

    // Promise finally util similar to Q.finally
    // e.g. promise.then(...).catch().then(...).finally(...)
    function finally (promise, cb) {
      return promise.then(function (res) {
        var promise2 = cb();
        if (typeof promise2.then === 'function') {
          return promise2.then(function () {
            return res;
          });
        }
        return res;
      }, function (reason) {
        var promise2 = cb();
        if (typeof promise2.then === 'function') {
          return promise2.then(function () {
            throw reason;
          });
        }
        throw reason;
      });
    };
{% endhighlight %}


**问题:下面的4个promises有什么区别呢？**
{% highlight js linenos %}
doSomething().then(function () {
  return doSomethingElse();
});

doSomething().then(function () {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);
{% endhighlight%}

## 为什么要用promises？

如果你读过关于promises的一些文章，你经常会发现对[世界末日的金字塔](https://medium.com/@wavded/managing-node-js-callback-hell-1fe03ba8baf)这篇文章的引用，会有一些可怕的逐渐延伸到屏幕右侧的回调代码。<br/>
promises确实解决了这个问题，但它并不只是关乎于缩进。正如在优秀的演讲“[回调地狱的救赎](http://youtu.be/hf1T_AONQJU)”中所解释的那样，回调真正的问题在于它们剥夺了我们对一些像return和throw的关键词的使用能力。相反，我们的程序的整个流程都会基于一些副作用。一个函数单纯的调用另一个函数。<br/>
事实上，回调做了很多更加险恶的事情：它们剥夺了我们的堆栈，这些是我们在编程语言中经常要考虑的。没有堆栈来书写代码在某种程度上就好比驾车没有刹车踏板：你不会知道你是多么需要它，直到你到达了却发现它并不在这。<br/>
promises的全部意义在于它给回了在函数式语言里面我们遇到异步时所丢失的return，throw和堆栈。为了更好的从中获益你必须知道如何正确的使用promises。

## 如何使用Promise

每一个promise都会给你一个then()方法（或者catch，它们只是then(null,...)的语法糖）。这里我们是在then()方法的内部来看：
{% highlight js linenos %}
    somePromise().then(function () {
      // I'm inside a then() function!
    });
{% endhighlight %}

我们在这里能做什么呢？有三种事可以做：
*   返回另一个promise；
*   返回一个同步值（或者undefined）；
*   抛出一个同步错误。

就是这样。一旦你理解了这个技巧，你就明白了什么是promises。让我们一条条来说。
### 1、返回另一个promise
在promise的文档中这是一种常见的模式，正如上面的“组成式promise”例子中所看到的：
{% highlight js linenos %}
    getUserByName('nolan').then(function (user) {
      return getUserAccountById(user.id);
    }).then(function (userAccount) {
      // I got a user account!
    });
{% endhighlight %}

注意，我正在返回第二个promise－return是很关键的。如果我没有说返回，getUserAccountById()方法将会产生一个副作用，下一个函数将会接收undefined而不是userAccount。

### 2、返回一个同步值（或undefined）
返回undefined通常是一个错误，但是返回一个同步值则是将同步代码转化为promise代码的绝好方式。比如说有一个在内存里的用户的数据。我们可以这样做：
{% highlight js linenos %}
    getUserByName('nolan').then(function (user) {
      if (inMemoryCache[user.id]) {
        return inMemoryCache[user.id];    // returning a synchronous value!
      }
      return getUserAccountById(user.id); // returning a promise!
    }).then(function (userAccount) {
      // I got a user account!
    });
{% endhighlight %}

难道这不棒吗？第二个函数并不关心userAccount是同步还是异步获取的，第一个函数对于返回同步还是异步数据是自由的。
<br/><br/>
不幸的是，这存在一个很不方便的事实，在JavaScript技术里没有返回的函数默认会自动返回undefined，这也就意味着当你想返回一些东西的时候很容易不小心引入一些副作用。<br/>
为此，我把在then()函数里总是返回数据或者抛出异常作为我的个人编码习惯。我也推荐你这么做。

### 3、抛出一个同步错误
说到throw，promises可以做到更棒。比如为了避免用户被登出我们想抛出一个同步错误。这很简单：
{% highlight js linenos %}
    getUserByName('nolan').then(function (user) {
      if (user.isLoggedOut()) {
        throw new Error('user logged out!'); // throwing a synchronous error!
      }
      if (inMemoryCache[user.id]) {
        return inMemoryCache[user.id];       // returning a synchronous value!
      }
      return getUserAccountById(user.id);    // returning a promise!
    }).then(function (userAccount) {
      // I got a user account!
    }).catch(function (err) {
      // Boo, I got an error!
    });
{% endhighlight %}

如果我们的用户被登出了我们的catch()方法将接收到一个同步错误，而且任意的promises被拒绝它都将接收到一个同步错误。再一次强调，函数并不关心错误是同步的还是异步的。<br/>
这是非常有用的，因为它能够帮助我们在开发中识别代码错误。比如，在一个then()方法内部的任意地方，我们做了一个JSON.parse()操作，如果JSON参数不合法那么它就会抛出一个同步错误。用回调的话该错误就会被吞噬掉，但是用promises我们可以轻松的在catch()方法里处理掉该错误。

## 高级错误
好的，现在你已经学习了一个单一的技巧来使得promises变动极其简单，现在让我们来谈论一些边界情况。因为在编码过程中总存在一些边界情况。这些错误我把它们归类为高级错误，因为我只在一些对于promise非常熟悉的程序员的代码中发现。但是，如果我们想解决我在文章开头提出的疑惑的话，我们需要讨论这些高级错误。

### 高级错误＃1:不了解Promise.resolve()
正如我上面提到的，promises在封装同步代码为异步代码上是非常有用的。然而，如果你发现自己打了这样一些代码：
{% highlight js linenos %}
    new Promise(function (resolve, reject) {
      resolve(someSynchronousValue);
    }).then(/* ... */);
{% endhighlight %}

你可以使用Promise.resolve()来更简洁的表达：
{% highlight js linenos %}
    Promise.resolve(someSynchronousValue).then(/* ... */);
{% endhighlight %}

而且这在捕捉任意的同步错误上会难以置信的有用。它是如此有用，以致于我习惯于几乎将我所有的基于promise返回的API方法以下面这样开始：
{% highlight js linenos %}
    function somePromiseAPI() {
      return Promise.resolve().then(function () {
        doSomethingThatMayThrow();
        return 'foo';
      }).then(/* ... */);
    }
{% endhighlight %}

记住：对于被彻底吞噬的错误以致于不能debug的任意代码，做同步的错误抛出都是一个很好的选择。但是你把每个地方都封装为Promise.resolve()，你要确保后面你都会执行caotch()。
<br/><br/>
类似的，有一个Promise.reject()方法可以返回一个立即被拒绝的promise：
{% highlight js linenos %}
    Promise.reject(new Error('some awful error'));
{% endhighlight %}

### 高级错误＃2:catch()并不和then(null,...)一摸一样
我在上面说过catch()只是一个语法糖。下面两个代码片段是等价的：
{% highlight js linenos %}
    somePromise().catch(function (err) {
      // handle error
    });

    somePromise().then(null, function (err) {
      // handle error
    });
{% endhighlight %}

然而，这并不意味着下面两个片段也是等价的：
{% highlight js linenos %}
    somePromise().then(function () {
      return someOtherPromise();
    }).catch(function (err) {
      // handle error
    });

    somePromise().then(function () {
      return someOtherPromise();
    }, function (err) {<a target=_blank href="http://mochajs.org/" target="_blank">点击打开链接</a>
      // handle error
    });
{% endhighlight %}

如果你疑惑为什么它们不是等价的，思考第一个函数抛出一个错误会发生什么：
{% highlight js linenos %}
    somePromise().then(function () {
      throw new Error('oh noes');
    }).catch(function (err) {
      // I caught your error! :)
    });

    somePromise().then(function () {
      throw new Error('oh noes');
    }, function (err) {
      // I didn't catch your error! :(
    });
{% endhighlight %}

这会证明，当你使用then(resolveHandler,rejectHandler)格式，如果resolveHandler自己抛出一个错误rejectHandler并不能捕获。<br/>
基于这个原因，我已经形成了自己的一个习惯，永远不要对then()使用第二个参数，并总是优先使用catch()。一个例外是当我写异步的Mocha测试的时候，我可能写一个测试来保证错误被抛出：
{% highlight js linenos %}
    it('should throw an error', function () {
      return doSomethingThatThrows().then(function () {
        throw new Error('I expected an error!');
      }, function (err) {
        should.exist(err);
      });
    });
{% endhighlight %}

说到这，[Mocha](http://mochajs.org/)和[Chai](http://chaijs.com/)是测试promise API的友好的组合。[pouchdb-plugin-seed](https://github.com/pouchdb/plugin-seed)项目有很多你可以入手的[简单的测试](https://github.com/pouchdb/plugin-seed/blob/master/test/test.js)。

### 高级错误＃3:promises vs promise工厂
我们假定你想要一个接一个的，在一个序列中执行一系列的promise。就是说，你想要Promise.all()这样的东西，不会并行的执行promises。<br/>
你可能会单纯的这样写一些东西：
{% highlight js linenos %}
    function executeSequentially(promises) {
      var result = Promise.resolve();
      promises.forEach(function (promise) {
        result = result.then(promise);
      });
      return result;
    }
{% endhighlight %}

不幸的是，它并不会按你所期望的那样工作。你传递给executeSequentially()的promises会并行执行。<br/>
之所以会这样是因为其实你并不想操作一个promise的数组。每一个promise规范都指定，一旦一个promise被创建，它就开始执行。那么，其实你真正想要的是一个promise工厂数组：
{% highlight js linenos %}
    function executeSequentially(promiseFactories) {
      var result = Promise.resolve();
      promiseFactories.forEach(function (promiseFactory) {
        result = result.then(promiseFactory);
      });
      return result;
    }
{% endhighlight %}

我知道你在想什么：“这个Java程序员到底是谁，为什么他在谈论工厂？“不过一个promise工厂是很简单的，它只是一个返回一个promise的函数：
{% highlight js linenos %}
    function myPromiseFactory() {
      return somethingThatCreatesAPromise();
    }
{% endhighlight %}

这为什么能工作呢？它能工作是因为一个promise工厂并不会创建promise直到它被要求这么做。它的工作方式和then函数相同－实际上它们是同一个东西。<br/>
如果你在看上面的executeSequentially()函数，并且假定myPromiseFactory在result.then()内部被取代，那么希望你能灵光一闪。那时，你将实现promise启蒙（译者注：其实此时就是相当于执行：onePromise.then().then()...then()）。

### 高级错误＃4:好吧，假设我想要获取两个promises的结果将会怎样？
通常，一个promise是依赖于另一个promise的，但是这里我们想要两个promise的输出。例如：
{% highlight js linenos %}
    getUserByName('nolan').then(function (user) {
      return getUserAccountById(user.id);
    }).then(function (userAccount) {
      // dangit, I need the "user" object too!
    });
{% endhighlight %}

如果想成为优秀的JavaScript开发者并避免世界末日的金字塔，我们可能在一个更高的的作用域中存储一个user对象变量：
{% highlight js linenos %}
    var user;
    getUserByName('nolan').then(function (result) {
      user = result;
      return getUserAccountById(user.id);
    }).then(function (userAccount) {
      // okay, I have both the "user" and the "userAccount"
    });
{% endhighlight %}

这也能达到目的，但是我个人觉得这有点拼凑的感觉。我推荐的做法：放手你的偏见并拥抱金字塔：
{% highlight js linenos %}
    getUserByName('nolan').then(function (user) {
      return getUserAccountById(user.id).then(function (userAccount) {
        // okay, I have both the "user" and the "userAccount"
      });
    });
{% endhighlight %}

至少，临时先这么干。如果缩进成为一个问题，你可以做JavaScript开发者一直以来都在做的事情，提取函数为一个命名函数：
{% highlight js linenos %}
    function onGetUserAndUserAccount(user, userAccount) {
      return doSomething(user, userAccount);
    }

    function onGetUser(user) {
      return getUserAccountById(user.id).then(function (userAccount) {
        return onGetUserAndUserAccount(user, userAccount);
      });
    }

    getUserByName('nolan')
      .then(onGetUser)
      .then(function () {
      // at this point, doSomething() is done, and we are back to indentation 0
    });
{% endhighlight %}

随着你的promise代码变得更加复杂，你可能发现你自己在抽取越来越多的函数为命名函数。我发现这样会形成非常美观的代码，看起来会像是这样：
{% highlight js linenos %}
    putYourRightFootIn()
      .then(putYourRightFootOut)
      .then(putYourRightFootIn)
      .then(shakeItAllAbout);
{% endhighlight %}

这就是promises。
### 高级错误＃5:promises丢失
最后，这个错误是我在上面引入promise疑惑的时候提到的。这是一个非常深奥的用例，可能永远不会在你的代码中出现，但它却让我感到疑惑。
<br/><br/>
你认为下面的代码会打印出什么？
{% highlight js linenos %}
    Promise.resolve('foo').then(Promise.resolve('bar')).then(function (result) {
      console.log(result);
    });
{% endhighlight %}
如果你认为打印出bar，那你就大错特错了。它实际上会打印出foo。<br/>
原因是当你给then()传递一个非函数（比如一个promise）值的时候，它实际上会解释为then(null)，这会导致之前的promise的结果丢失。你可以自己测试：
{% highlight js linenos %}
    Promise.resolve('foo').then(null).then(function (result) {
      console.log(result);
    });
{% endhighlight %}

你想加多少的then(null)都可以，它始终会打印出foo。
<br/>
这其实是一个循环，回到了上面我提到的promises vs promises工厂的问题上。简言之，你可以直接给then()方法传递一个promise，但是它并不会像你想的那样工作。then()默认接收一个函数，其实你更多的是想这样做：
{% highlight js linenos %}
    Promise.resolve('foo').then(function () {
      return Promise.resolve('bar');
    }).then(function (result) {
      console.log(result);
    });
{% endhighlight %}

这次会如我们预期的那样返回bar。<br/>
所以要提醒你自己：永远给then()传递一个函数参数。

## 解决问题

#### 1
{% highlight js linenos %}
    doSomething().then(function () {
      return doSomethingElse();
    }).then(finalHandler);
{% endhighlight %}

丅丅丅丅丅丅
{% highlight js linenos %}
    doSomething
    |-----------------|
                      doSomethingElse(undefined)
                      |------------------|
                                         finalHandler(resultOfDoSomethingElse)
                                         |------------------|
{% endhighlight %}

#### 2
{% highlight js linenos %}
    doSomething().then(function () {
      doSomethingElse();
    }).then(finalHandler);
{% endhighlight %}

丅丅丅丅丅丅
{% highlight js linenos %}
    doSomething
    |-----------------|
                      doSomethingElse(undefined)
                      |------------------|
                      finalHandler(undefined)
                      |------------------|
{% endhighlight %}
#### 3
{% highlight js linenos %}
    doSomething().then(doSomethingElse())
      .then(finalHandler);
{% endhighlight %}

丅丅丅丅丅丅
{% highlight js linenos %}
    doSomething
    |-----------------|
    doSomethingElse(undefined)
    |---------------------------------|
                      finalHandler(resultOfDoSomething)
                      |------------------|

{% endhighlight %}
#### 4
{% highlight js linenos %}
    doSomething().then(doSomethingElse)
      .then(finalHandler);
{% endhighlight %}

丅丅丅丅丅丅
{% highlight js linenos %}
    doSomething
    |-----------------|
                      doSomethingElse(resultOfDoSomething)
                      |------------------|
                                         finalHandler(resultOfDoSomethingElse)
                                         |------------------|
{% endhighlight %}

相关连接:
*   [驯服ES7的异步野兽](https://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html)
*   [ES6入门 - Promise对象](http://es6.ruanyifeng.com/#docs/promise)





