---
layout: post
title:  "不得不说的 Passive Event Listeners"
date:   2017-07-01 10:13:30 +0800
categories: [Tech]
excerpt: 被报了一个大 Bug，起初以为是 iScroll 的锅，意外发现是自己忽略了 Passive Event Listeners 这个东东...
tags:
  - CN
  - front-end
  - Mobile
---

之前用 iScroll 做了一个图片墙，在部分 Android 机上会出现滑动时无法切换整张图片的问题，通过添加如下代码解决了该问题:

{% highlight javascript %}
document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);
{% endhighlight %}

最近又被报了同样的 Bug，明明之前修复过呀，怎么又复现了，百思不得其解！拿着真机调试，发现控制台给了个 Warning，提示`Passvie Event Listeners`新特性。这是个什么东西呢？

其实它已经有一段时间了，关注`2016 Google I/O Mobile Talk`的同学应该有些印象。它能够提升页面的滑动流畅度，以下是官方说明：

> A new feature in the DOM spec that enable developers to opt-in to better scroll performance by eliminating the need for scrolling to block on touch and wheel event listeners.
> 
> Developers can annotate touch and wheel listeners with {passive: true} to indicate that they will never invoke preventDefault.

翻译过来大概就是：

> 在监听`mousewheel`或者`touch`事件中，增加了`passive`这个设置，当它为`true`时，就不会调用`preventDefault`来阻止默认行为。

该特性兼容`Chrome 51`和`Firefox 49`开始的浏览器，默认设置为`true`，此时`event.cancelable`为`false`。因此，可以使用如下代码开启`preventDefault`：

{% highlight javascript %}
document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, {passive: false});
{% endhighlight %}

至此，iScroll 的轮播问题就解决啦。