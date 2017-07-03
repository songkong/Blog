---
layout: post
title:  “前端面试题答案整理”
categories: [Tech]
excerpt: 前端面试题答案整理
tags:
  - CN
  - front-end
---

### HTML

---

##### Doctype 作用？严格模式与混杂模式如何区分？它们有何意义？

DTD（文档类型定义）是一组机器可读的规则，它们指示 (X)HTML 文档中允许有什么，不允许有什么。`<!DOCTYPE>`声明位于位于 HTML 文档中的第一行，处于 <html> 标签之前，告知浏览器的解析器用什么文档标准（何种 DTD）解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式执行。

不同文档模式主要影响 CSS 内容的呈现，尤其是浏览器对盒模型的解析，但在某些情况下也会影响到 JavaScript 的解释执行。在标准模式下浏览器按照规范呈现页面；在混杂模式下，页面以一种比较宽松的向后兼容的方式显示。

文档模式目前有四种：

* 混杂模式（quirks mode）：让 IE 的行为与（包含非标准特性的）IE5 相同
* 标准模式（standards mode）：让 IE 的行为更接近标准行为
* 准标准模式（almost standards mode）：这种模式下的浏览器特性有很多都是符合标准的，不标准的地方主要体现在处理图片间隙的时候（在表格中使用图片时问题最明显）。
* 超级标准模式：IE8 引入的一种新的文档模式，超级文档模式可以让 IE 以其所有版本中最符合标准的方式来解释网页内容。

##### HTML5 为什么只需要写 <!DOCTYPE HTML>

HTML5 不基于`标准通用标记语言（SGML）`，因此不需要对 DTD 进行引用，但是需要 DOCTYPE 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。而 HTML4.01 基于 SGML，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型。

##### 行内元素有哪些？块级元素有哪些？空（void）元素有那些？

行内元素：`a`，`abbr`，`b`，`span`，`img`，`input`，`select`，`strong`...
块级元素：`div`，`p`，`ul`，`ol`，`li`，`dl`，`dt`，`dd`，`h1`...
空元素：`br`，`hr`，`img`，`input`，`link`，`meta`，`area`，`base`，`col`，`command`，`embed`...

##### 页面导入样式时，使用link和@import有什么区别？

link 属于 HTML 标签，除了加载 CSS 外，还能用于定义 RSS, 定义 rel 连接属性等作用。而 @import 是 CSS 提供的，只能用于加载 CSS。

link 和 import 语法结构不同，前者只能放入 HTML 源代码中使用，后者在 HTML 中使用时需要嵌在 <style type="text/css"> 标签中，同时可以直接在 CSS 文件或代码中使用`@import url(CSS文件路径地址);`引入 CSS 样式。页面被加载时，link 会同时被加载，而 @import 引用的 CSS 会等到页面被加载完再加载。

import是 CSS2.1 提出的，只在 IE5 以上才能被识别，而 link 是HTML标签，无兼容问题。

##### 介绍一下你对浏览器内核的理解？

主要分成两部分：渲染引擎（layout engine 或 rendering engine）和 JS 引擎。

渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。

JS 引擎：解析和执行 javascript 来实现网页的动态效果。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

##### 常见的浏览器内核有哪些？

* Trident：IE，MaxThon，TT，The World，360，搜狗浏览器等。
* Gecko：Netscape6 及以上版本，Firefox 等。
* Presto内核：Opera7及以上（现为 Blink）。
* Webkit内核：Safari，Chrome等。
* KHTML：WebKit 和 WebCore 都是它的衍生。

##### HTML5 有哪些新特性、移除了哪些元素？如何处理 HTML5 新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？

HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加：

* 绘画 canvas。
* 用于媒介回放的 video 和 audio 元素;
* 本地离线存储：localStorage 长期存储数据，浏览器关闭后数据不丢失，sessionStorage 的数据在浏览器关闭后自动删除。
* 语意化更好的内容元素，比如 article、footer、header、nav、section。
* 表单控件，calendar、date、time、email、url、search。
* 新的技术 webWorker, webSockt, Geolocation;

移除的元素：

纯表现的元素：basefont，big，center，font, s，strike，tt，u。
对可用性产生负面影响的元素：frame，frameset，noframes。

兼容：

IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签，
可以利用这一特性让这些浏览器支持 HTML5 新标签：

{% highlight javascript %}
var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
var i= e.length;
while (i--){
    document.createElement(e[i])
}
{% endhighlight %}

浏览器支持新标签后，还需要添加标签默认的样式：

{% highlight css %}
article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}
 
mark{background:#FF0;color:#000}
{% endhighlight %}

当然最好的方式是直接使用成熟的框架，使用最多的是`html5shim`框架：

{% highlight html %}
<!--[if lt IE 9]>
<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
<![endif]-->
{% endhighlight %}

如何区分： 

DOCTYPE声明，新增的结构元素，功能元素。

##### HTML5 的离线储存怎么使用，工作原理能不能解释一下？



