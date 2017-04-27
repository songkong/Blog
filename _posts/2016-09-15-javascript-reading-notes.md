---
layout: post
title:  "学习笔记之《JavaScript 高级程序设计》（上篇）"
date:   2016-09-15 13:40:30 +0800
categories: [Tech]
excerpt: 这篇文章归纳了书中第1到8章的相关知识点，留作日后复习。
tags:
  - CN
  - front-end
  - JavaScript
---

# 目录

>#### 第一章【 [JavaScript简介](#chapter1) 】
>1. [ECMAScript](#chapter1-1)
>2. [文档对象模型（DOM）](#chapter1-2)
>3. [浏览器对象模型（BOM）](#chapter1-3)
>
>#### 第二章【 [在HTML中使用JavaScript](#chapter2) 】
>1. [\<script\>与\<noscript\>元素](#chapter2-1)
>2. [嵌入代码与外部文件](#chapter2-2)
>3. [文档模式](#chapter2-3)

---

<h3 id="chapter1">第一章  JavaScript简介</h3>

一个完整的 JavaScript 实现由如下三个部分组成：

* 核心（ECMAJavaScript）
* 文档对象模型（DOM）
* 浏览器对象模型（BOM）

---

<h4 id="chapter1-1">1.1 ECMAScript</h4>

ECMAScript 是由 ECMA-262 定义的与`宿主环境`（如 Web 浏览器、Node 和 Adobe Flash 等）没有依赖关系的一门语言，该语言本身并不包括输入和输出定义。宿主环境不仅提供基本的 ECMAScript 实现，同时还会提供该语言的扩展，如 DOM。

ECMA-262 规定了这门语言的下列组成：语法、类型、语句、关键字、保留字、操作符、对象。

---

<h4 id="chapter1-2">1.2 文档对象模型（DOM）</h4>

文档对象模型（DOM，Document Object Model）是针对 XML 但经过扩展用于 HTML 的 API。 DOM 把整个页面映射为一个多层节点结构，HTML 或 XML页面中的每个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据。通过 DOM 创建的文档树形图并借助 DOM 提供的 API，可以轻松的对节点进行删除、添加、替换或修改等操作。

由于 Netscape 和微软在开发 DHTML 方面持不同意见，这影响了 Web 跨平台性能。于是，W3C 开始着手规划 DOM。1998 年 DOM1 级（DOM Level 1）成为 W3C 的推荐标准。DOM1 级由两个模块组成：DOM 核心（DOM Core）和 DOM HTML。其中 DOM 核心规定了如何映射基于 XML 的文档结构，以便简化对文档中任意部分的访问和操作。DOM HTML 模块在 DOM 核心基础上添加了针对 HTML 的对象和方法。

>DOM 并不只是针对 JS，很多别的语言也实现了 DOM。

DOM2 级引入了如下新模块：DOM 视图（DOM Views）、DOM 事件（DOM Events）、DOM 样式（DOM Style）和 DOM 遍历和范围（DOM Traversal and Range）。

DOM3 级在 DOM 加载和保存（DOM Load and Save）模块中引入了以统一方式加载和保存文档的方法，在 DOM 验证（DOM Validation）模块中新增了验证文档的方法。同时 DOM3 级也开始支持 XML 1.0 规范，涉及 XML Infoset、XPath 和 XML Base。

>注：DOM0 级标准是不存在的，只是 DOM 历史坐标中的一个参照点。具体来说，它指的是 IE 4.0 和 Netscape Navigator 4.0 最初支持的 DHTML。

除了 DOM 核心和 DOM HTML 接口之外，另外几种语言也发布了针对自己的 DOM 标准。以下基于 XML 的语言，它们的 DOM 标准都添加了与特定语言相关的新方法和新接口，且这些语言都是 W3C 的推荐标准：

* SVG （Scalable Vector Graphic，可伸缩矢量图）1.0；
* MathML（Mathematical Markup Language，数学标记语言）1.0；
* SMIL（Synchronized Multimedia Integration Language，同步多媒体集成语言）。

---

<h4 id="chapter1-3">1.3 浏览器对象模型（BOM）</h4>

浏览器对象模型（BOM，Browser Object Model）提供访问和操作浏览器窗口的方法和接口。使用 BOM 可以控制浏览器显示的页面以外的部分。由于没有 BOM 标准可以遵循，因此每个浏览器都有自己的实现。

---

<h3 id="chapter2">第二章  在HTML中使用JavaScript</h3>

<h4 id="chapter2-1">2.1 &lt;script&gt;与&lt;noscript&gt;元素</h4>

\<script\>定义了6个属性：

* async: 可选。只对外部脚本有效，用于实现异步脚本。表示应该立即下载脚本，但不应妨碍页面中的其他操作，如下载其他资源或等待加载其他脚本。标记为 async 的脚本不保证按照指定它们的先后顺序执行。因此，需要确保各个脚本之间互不依赖，同时建议不在加载期间修改 DOM。
* charset: 可选，很少用。表示通过src属性指定的代码的字符集。
* defer: 可选。只对外部脚本有效，用于实现延迟脚本。表示脚本可以延迟到文档完全被解析和显示之后再执行。延迟脚本会按照声明顺序执行，但在现实中，延迟脚本不一定会按照顺序执行，因此最好只包含一个延迟脚本。
* language: 已废弃。
* src: 可选。表示包含要执行代码的外部文件。带有src属性的\<script\>元素不应该在\<script\>和\</script\>标签之间再包含额外的 JavaScript 代码。若包含，则嵌入的代码会被忽略。
* type: 可选。表示编写代码使用的`脚本语言的内容类型（MIME类型）`。考虑到约定俗成和最大限度的浏览器兼容性，type 属性的值一般为`text/javascript`。

\<noscript\>元素的作用是，当浏览器不支持脚本或脚本被禁用时，该标签之间的内容会被显示出来，其他情况下，浏览器均不会呈现\<noscript\>中的内容。

---

<h4 id="chapter2-2">2.2 嵌入代码与外部文件</h4>

在 HTML 页面中嵌入执行 JavaScript 代码有两种方式：

* 使用 javascript: 前缀构建执行 JavaScript 代码的 URL。如`<a href="javascript:alert('Hello world!');"></a>`。
* 在\<script.../\>元素标签之间包含 JavaScript 代码。

为了让 HTML 页面和 JavaScript 脚本更好的分离，我们将 JavaScript 脚本单独保存在`*.js`文件中，使用如下的语法格式导入外部脚本：

{% highlight javascript %}
<script src="test.js" type="text/javascript"></script>
{% endhighlight %}

使用外部文件的优点：

* 可维护性：把 JavaScript 代码放在特定的文件中，有利于项目的维护。
* 可缓存：浏览器能够根据具体的设置缓存链接的所有外部 JavaScript 文件，若有多个页面都使用同一文件，那么文件只需下载一次。
* 适应未来。

---

<h4 id="chapter2-3">2.3 文档模式</h4>

使用`文档类型（doctype）`可定义文档模式：`混杂模式（quirks mode）`和`标准模式（standards mode）`。如果在文档开始处没有进行文档类型声明，则浏览器会默认开启混杂模式，混杂模式是向后兼容的，在不同浏览器下的行为差异非常大，不推荐使用。

可通过如下代码开启标准模式：

{% highlight html %}
<!-- HTML 5 -->
<!DOCTYPE html>
{% endhighlight %}


