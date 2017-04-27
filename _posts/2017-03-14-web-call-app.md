---
layout: post
title:  "JS 实现页面调起原生 APP"
date:   2017-03-14 12:00:30 +0800
categories: [Tech]
excerpt: IOS 9 和 10 利用 Universal Link 调起原生 App，告别系统体验极差的弹窗。其它版本 IOS 和安卓利用 iframe 调起 App。
tags:
  - CN
  - front-end
  - Mobile
  - JavaScript
---

开发活动分享页经常遇到这种需求：

* 在分享页点击某个按钮，若本地安装 App，调起 App
* 若本地没有安装 App，跳转到 App下载页

由于微信和微博存在坑，开发中，我们首先判断当前页面是否在微信或微博中，若是，可以显示一个蒙板提醒用户在浏览器中打开当前页面。

#### 1. 判断浏览器类型

---

{% highlight javascript %}
var ua = navigator.userAgent;

// 微信或微博内提示在浏览器打开
if (/MicroMessenger|Weibo/i.test(ua)) {
    // 这里做些处理，如现实一个提示在浏览器打开的灰色蒙板
	return
}
{% endhighlight %}

#### 2. iframe 调起 App。

---

{% highlight javascript %}
// 使用了 Zepto.js，jQuery 同理
if ($('#open_app').size()) {
    $('#open_app').remove();
}
var naUrl = '这里是 app 链接，也就是你和 NA 的 RD 小伙伴商量好的协议';
var iframeHtml = '<iframe src="' + naUrl + '" id="open_app" width="0" height="0" style="border: 0;display: none;"/>';
$(document.body).append(iframeHtml);
{% endhighlight %}

#### 3. 判断本地是否安装 App

---

若 iframe 没有成功调起 App，则表示本地没有安装 App，那么此时页面跳转到 App 的下载页面。

{% highlight javascript %}
 var startTime = new Date().getTime();
 var delayDownload = setTimeout(function() {
	// 做一下延迟
	if (new Date().getTime() - startTime < 2000) {
        var isIos = (/iphone|ipad|ipod/i).test(ua);
		var url = isIos? '这里是你的 App 在 Appstore 中的下载链接' : '这里是你的 App 安卓的下载地址';
        window.location.href = url;
    }
}, 1000);
{% endhighlight %}

#### 4. IOS 9 和 10 利用 Universal Link 调起 App

---

在 IOS 9 和 10 中，无法利用 iframe 调起 App，可以使用`location.href`直接跳转 App，但会出现两个问题：1. 当本地有 App 时，Safari 弹出`是否打开 App`的弹窗，当用户两次选择`取消`时，页面会跳转到苹果官网。2. 当本地无 App 时，Safari 会弹出`无效的链接`的弹窗，然后才会弹出`是否打开 Appstore`的弹窗，体验非常不好。因此，我们使用 Universal Link 来调起 App。

> ###### Universal Link 是什么？
> 简单地说就是通过一个 https 的链接，完成从浏览器直接跳转到 App 或者在没安装 App 的情况下跳转到指定页面。没有是否要进入 App 的弹窗，没有微信客户端限制跳转。

NA 端如何实现 Universal Link，可以[查看这里](http://www.cocoachina.com/ios/20150902/13321.html)。当你的 NA 小伙伴已经开发好后，就可以直接使用相应的协议啦。

{% highlight javascript %}
if (/iPhone OS 9|iPhone OS 10/i.test(ua)) {
    window.location.href = '这里是你和 NA 小伙伴商量好的协议';
	return;
}
{% endhighlight %}

#### 5. 切换到后台后的相关处理

---

当浏览器切换到后台后，我们需要清除代码中的延迟下载，以防当我们再一次返回页面后，页面跳转到 App 下载地址。

{% highlight javascript %}
document.addEventListener("visibilitychange", callAppSuccess);
document.addEventListener("webkitvisibilitychange", callAppSuccess);
document.addEventListener("msvisibilitychange", callAppSuccess);
document.addEventListener("blur", callAppSuccess);

function callAppSuccess () {
    if(delayDownload) {
        clearTimeout(delayDownload);
    }
}
{% endhighlight %}

以上就是实现 Web 调起 App 的整个过程，正式的代码需要调整顺序，比如先做 IOS 9 和 10 的处理，这里就不赘述了。
