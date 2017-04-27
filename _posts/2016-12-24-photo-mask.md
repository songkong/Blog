---
layout: post
title:  "CSS 实现移动端图片点击的遮罩效果"
date:   2016-12-24 22:12:30 +0800
categories: [Tech]
excerpt: 如何在移动端实现图片点击时出现一个遮罩层的效果？最近踩了些坑，特此总结一下。
tags:
  - CN
  - front-end
  - CSS
  - Mobile
---

最近在做一个移动端的图片墙，遇到这样一个需求：点击墙中的图片，图片上出现一个颜色为 #999，不透明度为 0.3 的遮罩层。页面中每张图片大致以如下 HTML 结构呈现：

{% highlight html %}
<div class="photo-wrapper">
	<div class="photo"></div>
</div>
{% endhighlight %}

每个`photo-wrapper`的大小可变。`photo`以`background-image`的形式显示图片。也就是说，每张照片的大小都不是固定的。因此，最初想到的实现方案是，在每张图片后面加一个 div 元素，设置为绝对定位，同时设置`photo-wrapper`为相对定位，当添加的 div 元素处于 active 状态时，改变其透明度。下面是实现这个设想的代码：

相应的 HTML 代码：

{% highlight html %}
<div class="photo-wrapper">
	<div class="photo"></div>
	<div class="mask"></div>
</div>
{% endhighlight %}

相应的 CSS 代码：

{% highlight css %}
.photo-wrapper {
	position: relative;
	/*......*/
}
.mask {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #999;
	opacity: 0;
}
.mask:active {
	opacity: 0.3;
}
{% endhighlight %}

上述方法经 chrome 调试，可以实现遮罩效果。但用 Android 真机进行测试的时候，发现两个问题，遮罩层的绝对定位和 active 在移动端均失效了。

对于绝对定位失效的问题，可以通过`margin-left`来解决。但由于图片大小不固定，需要使用 JS 来设置遮罩层的大小以及`margin-left`的值。以下是相应的代码：

相应的 CSS 代码：

{% highlight css %}
.mask {
	background-color: #999;
	opacity: 0;
}
.mask:active {
	opacity: 0.3;
}
{% endhighlight %}

相应的JS代码（使用了 Zepto.js）：

{% highlight javascript %}
var $photo = $('.photo');
var height = $photo.height();
var width = $photo.width();
$('.mask').css({height: height, width: width, marginLeft: -width});
{% endhighlight %}

移动端 active 失效的问题，在 Stack Overflow 上找到了答案，将遮罩层的 html 修改成以下形式就可以了：

{% highlight html %}
<a class="mask" href="javascript:void(0);" ontouchstart="return true;"></a>
{% endhighlight %}

经过上述修改，就可以实现移动端点击图片出现遮罩层的效果啦。在开发的过程中，还曾经尝试给遮罩层绑定`touchstart`和`touchend`事件，以此来修改它的透明度，但由于图片墙是可以滚动的，在滚动界面而非点击图片时，图片也会出现遮罩层的效果，因此这种方法被放弃了。