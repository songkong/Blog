---
layout: post
title:  "由移动端 1px 过粗引发的 viewport 探究"
date:   2017-07-26 17:31:30 +0800
categories: [Tech]
excerpt: UI 一直嫌弃 1px 分割线过粗？解决问题之前，先花一点时间研究下问题的原因吧。
tags:
  - CN
  - front-end
  - Mobile
  - html
---

在探究 viewport 前，需要了解一些概念：

> 物理像素（physical pixels）：一个物理像素是显示器（手机屏幕）上最小的物理显示单元，在操作系统的调度下，每一个设备像素都有自己的颜色值和亮度值。

> 设备独立像素（density-independent pixels）：也叫密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素，然后由相关系统转换为物理像素。

> 设备像素比（device pixel ratio）：简称 dpr，定义了物理像素和设备独立像素的对应关系，它的值可以按如下的公式的得到：
> > 设备像素比 = 物理像素 / 设备独立像素
> 
> 在 JS 中，可以通过`window.devicePixelRatio`获取到当前设备的     dpr。在 CSS 中，可以通过`-webkit-device-pixel-ratio`，`-webkit-min-device-pixel-ratio`和`-webkit-max-device-pixel-ratio`进行媒体查询，对不同 dpr 的设备，做一些样式适配。

以 iPhone6 为例：

设备宽高`375×667`，可以理解为设备独立像素的个数，dpr 为 2，根据上面的计算公式，其物理像素就应该 ×2，为`750×1334`。

![viewport1](http://oty92p38d.bkt.clouddn.com/meta-viewport/1.gif)

在 iOS 设备中，dpr 可取的值为 1，2 或 3。在安卓设备中，情况就比较复杂了。以谷歌的 Nexus 为例，Nexus One 的物理像素为 480×800，但是安卓的 WebKit 团队将网页竖屏模式时的最优宽度设置为 320px。因此，dips 抽象逻辑层的宽度仍然为 320px，，此时 dpr 为 1.5。

在 Galaxy Nexus 中，物理像素提高到 720×1200。安卓团队将 dips 层的宽度设为 360px，Chrome 团队和腾讯 QQ 浏览器也都是这么设定的。但是 Opera 浏览器却将 dips 层宽设为 320px，此时 dpr 由 2 变为 2.25。

说到这里，相信大家对物理像素和设备独立像素的理解更清晰了。简单粗暴的说，物理像素是设备所用的屏幕确定的，设备独立像素是手机操作系统或浏览器团队确定的。作为一个 Web 开发人员，两者我们都无力改变。可以将它们想象成 PS 中的两个图层，两个图层的物理尺寸相同，区别只是两个图层中网格的大小不同（一个网格代表一个像素点）。

> 这里不得不提一下 CSS 像素，在很多文章中，都将设备独立像素和 CSS 像素画了等号。但我不这么认为（当然也可能是错的，只是在我的理解中二者是不同的）。上文已经说过，设备独立像素和物理像素的对应关系是固定的，而物理像素又是确定的，那么设备独立像素也是确定的。但 CSS 像素和物理像素之间的关系是可变的。对于设备独立像素和 CSS 像素的关系，我还存在一些疑问，后面会查看更多的相关资料。

接下来我们看一下 CSS 像素和物理像素的关系。对于一个 1024px 的 PC 显示器，将浏览器放大到和桌面等大。html 中添加一个 128px 的元素，这个元素占据浏览器窗口的 1/8，当你将页面放大 200% 时，元素仍然是 128px，但此时它占据浏览器的 1/4。通过这个例子可以看出，浏览器的放大功能，并不是将 128px 元素变为 256px，它只是将 1px 所占的物理尺寸扩大，换句话说，放大前，一个 CSS 像素对应一个物理像素，放大 200% 后，CSS 像素的长宽各增大一倍，一个 CSS 像素对应四个物理像素。以上都是针对 PC 端而言，移动端 CSS 像素和物理像素的对应更加复杂，后面会讨论。

![viewport2](http://oty92p38d.bkt.clouddn.com/meta-viewport/2.png)
![viewport3](http://oty92p38d.bkt.clouddn.com/meta-viewport/3.png)
![viewport4](http://oty92p38d.bkt.clouddn.com/meta-viewport/4.png)

上图中，第一张是 CSS 像素与物理像素一一对应的情况，第二张是放大页面时的情况，第三张是缩小页面时的情况。

#### 三种 viewport

---

viewport 主要是用来限制 html 元素大小的。在 PC 端，viewport 的大小就是浏览器窗口的大小，而 html 元素的大小又和 viewport 的大小相同。当我们调整浏览器大小时，html 和 viewport 的大小都随之改变。举个例子，当定义一个宽度为 html 元素 10% 的 div 时，缩放浏览器，div 的长度也随之改变。

然而，在移动端，viewport 要比上面的描述复杂很多。在参考文献[[2]](https://www.quirksmode.org/mobile/viewports2.html)中，作者定义了三种 viewport：

> visual viewport：移动设备屏幕的视口大小。

> layout viewport：要比 visual viewport 大很多，是 CSS 布局的计算依据。因此，html 元素最初的大小与 layout viewport 相等，以确保整个页面的布局与 PC 端相同。

![viewport5](http://oty92p38d.bkt.clouddn.com/meta-viewport/5.jpg)

![viewport6](http://oty92p38d.bkt.clouddn.com/meta-viewport/6.jpg)

在 Safari iPhone 中 layout viewport 的宽度为 980px，Opera 中为 850px，Android WebKit 中为 800px，IE 中为 974px。

不管是 visual viewport 还是 layout viewport，都是以 CSS 像素度量的，当放大屏幕时，layout viewport 是不变的（如果改变，页面会一直重绘），visual viewport 变小，屏幕上的 CSS 像素点减少。可以把 layout viewport 想象成一个特别大的画布，它的大小和形状永远都不会改变，而 visual viewport 是一个镜头，透过镜头可以看到画布，当你想透过镜头看到画布上更多的内容时，你需要将镜头后移，当你想更清晰的看到画布上的细节时，你需要把镜头前移。

如果不加限定，浏览器默认将 visual viewport 设置为 layout viewport 的大小，这会导致页面显得拥挤，一个 CSS 像素对应的实际物理尺寸很小，需要放大才能看清楚。为了解决这个问题，引入了一个 ideal viewport 的概念。

![viewport7](http://oty92p38d.bkt.clouddn.com/meta-viewport/7.jpg)

> ideal viewport：Web 页面的理想大小，对于非 retina 屏的设备，ideal viewport 的大小就是物理分辨率的大小，对于 retina 屏，ideal viewport 的大小小于物理分辨率的值。

#### meta viewport

---

通过 meta viewport，我们可以设置 layout viewport 的大小。具体语法为下：

> `<meta name="viewport" content="name=value,name=value">`
>
> content 中的 name 可选值有六个：
>> width，layout viewport 的大小。
>
>> initial-scale，页面的初始放大系数。
>
>> minimum-scale，最小放大系数。
>
>> maximum-scale，最大放大系数。
>
>> height，没有什么用。
>
>> user-scalable，为 no 的时候，不能放大。

当我们设置`width=device-width`和`initial-scale=1`的时候，layout viewport 的大小等于 ideal viewport。所有的 scale 值都是基于 ideal viewport 的，也就是说，maximum-scale=3 意味着最大的放大值是 ideal viewport 的 300%。

那么页面的 ideal viewport 到底是多少呢？首先设置`width=device-width`和`initial-scale=1`，然后通过`document.documentElement.clientWidth`便可以得到页面的 ideal viewport（部分浏览器有异常现象，但也没办法）。

在文献[[3]](https://www.quirksmode.org/mobile/metaviewport/)中，列出了各设备的 ideal viewport 大小，但我对这个表格存在一些质疑，表中 iPhone 的 ideal viewport 是 320×480，而通过`document.documentElement.clientWidth`得到的宽是 375。同时，前面我们提过设备独立像素的概念，根据文献[[5]](https://www.quirksmode.org/blog/archives/2012/07/more_about_devi.html)，设置`<meta name="viewport" content="width=device-width">`后，可以通过`document.documentElement.clientWidth`得到 dips，也就是说，ideal viewport 的大小等于 dips。

至此，几个像素和 viewport 的概念已经理清了。

> 首先，dips = pps / dpr，设备的 pps 和 dpr 固定，可以求得 dips
>
> ideal viewport 等于 dips（可以暂时理解为 ideal viewport 以 dips 度量）
>
> layout viewport 和 vitual viewport 都是以 CSS 像素度量的
>
> visual viewport width = ideal viewport width / zoom factor
> 
> 设置`width=device-width; initial-scale=1`可以使 layout viewport=ideal viewport=visual viewport，此时一个 CSS 像素等于一个 dips，当页面放大或缩小时，一个 CSS 像素的大小等于 dip * zoom factor 的大小

那么最终来看看移动端为啥 1px 变粗了。这主要是因为，视觉稿以 iPhone6 为基准，画布大小 750×1334（物理像素），根据视觉稿写代码时，最简单的做法是把所有标注除以 2，如 22px 的字号，转为 CSS 是 11px，这都没有问题，但视觉稿中的 1px 分割线，表示一个物理像素，而我们在写代码时，通常不会再把 1px 除以 2 了（只有高版本的 iOS 支持 0.5px）。当我们设置`width=device-width; initial-scale=1`后，layout viewport = ideal viewport = 375×667，一个 CSS 像素为两个物理像素，线自然就变粗啦。到底如何解决这个 1px 问题呢，网上有很多办法，但都不尽善尽美，后续经过自己实战，再写一篇总结吧。

### 参考文章

---

[1. A tale of two viewports — part one](https://www.quirksmode.org/mobile/viewports.html)

[2. A tale of two viewports — part two](https://www.quirksmode.org/mobile/viewports2.html)

[3. Meta viewport](https://www.quirksmode.org/mobile/metaviewport/)

[4. 移动端 1px 细线解决方案总结](http://www.jianshu.com/p/d62d22b44ce4)

[5. More about devicePixelRatio](https://www.quirksmode.org/blog/archives/2012/07/more_about_devi.html)
