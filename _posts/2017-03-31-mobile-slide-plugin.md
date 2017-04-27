---
layout: post
title:  "基于 JS 的移动端滑动插件对比"
date:   2017-03-31 11:00:30 +0800
categories: [Tech]
excerpt: 对比分析了目前几个主流的 JS 移动端滑动插件。
tags:
  - CN
  - front-end
  - Mobile
  - Plugin
  - JavaScript
---

之前开发一个移动端的图片墙功能，需要实现图片的滑动、缩放功能，因此研究了一下目前比较流行的几个开源插件，这里总结一下。

* TouchSlide
* FlexSlider
* Swiper
* iScroll
* iSlider

在选择插件的时候，主要考虑三方面因素：

* 因为是移动端，插件大小尽可能小，节省流量。
* API 足够丰富，能够满足基本开发需求。
* 移动端流畅度较好。

#### 各插件基本介绍

---

插件名 | 相关链接 | 主要功能 | 优点 | 缺点
----|------|---- | ---- | ---- 
TouchSlide | [Link](http://www.superslide2.com/TouchSlide/param.html) | 触屏焦点图、触屏Tab切换、触屏多图切换 | 体积小、专为移动端设计 | 仅支持两个回调函数
FlexSlider | [Link](https://woocommerce.com/flexslider/) | 图片轮播效果、焦点图效果、图文混排滚动 | 体积较小 | API 比 TouchSlider 丰富，但也比较少
Swiper | [Link](http://www.swiper.com.cn/api/index.html) | 触屏焦点图、触屏Tab切换、触屏多图切换 | API 丰富、自带放大功能 | 体积过大
iScroll | [Link](http://cubiq.org/iscroll-5) | CSS 动画、缩放、拉动刷新、捕捉元素 | 体积小、API 丰富 | Android 中端机中，提供的部分参数值不准确
iSlider | [Link](http://be-fe.github.io/iSlider/demo/) | 图片和 DOM 的滑动、可自定义插件 | 体积较小、API 丰富 | 需要额外引入 CSS 文件
 
#### 各插件缩放对比

---

由于`TouchSlide`和`FlexSlider`支持回调函数过少、本身无缩放功能，这里不再讨论这两个插件。

插件名 | 所需文件 | 文件大小 | 缩放存在的问题
----|------|---- | ---- | ---- 
Swiper | swiper.min.js, swiper.min.css | 94.2KB + 17.3KB | 放大后，无法移动到屏幕之外的地方
iScroll | iscroll-zoom.js | 58.4KB | 图片滑动需设置屏幕捕捉，当前图片放大后，滑动一下，会出现两张图片各占屏幕一半的情况
iSlider | slider.min.js, slider.min.css | 20.5KB + 1.5KB | 第一次放大后，继续放大灵敏度低

总结：个人比较倾向`iScroll`和`iSlider`两个插件，但这些插件在缩放上的交互与原生相差较大，还需继续努力。



