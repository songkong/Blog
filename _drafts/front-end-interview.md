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

Html5 引入了应用程序缓存，这意味着 Web 应用可在没有因特网连接时进行访问。

> 应用程序缓存为应用带来的优势：
>
> * 离线浏览：用户可在应用离线时使用它们
> * 速度：已缓存资源加载速度块
> * 减少服务器负载：浏览器只从服务器下载更新过的资源

HTML5 的离线存储是基于一个新建的`.appcache`文件的，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

使用方法：

* 在 HTML 标签添加 manifest 属性：

{% highlight html %}
<!DOCTYPE HTML> 
<html manifest="../js/demo.manifest">
   ...
</html>
{% endhighlight %}

> 注：manifest 文件和 HTML 文件必须同源

* 编写 .appcache 文件

> manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不 > 缓存的内容）。
> 
> manifest 文件可分为三个部分：
> * CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
> * NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
> FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）
> 
> 在线的情况下，用户代理每次访问页面，都会去读一次manifest.如果发现其改变, 则重新加载全部清单中的资源。

更新缓存：

* 用户清空浏览器缓存
* manifest 文件被修改
* 由程序来更新应用缓存

一些问题：

引入 manifest 的页面（即 HTML 文件）,即使没有被列入缓存清单中，仍然会被用户代理缓存。比如我们对 HTML 代码做如下改变：

> <html  manifest="demo.appcache">
> =>
> <html  manifest="demo1.appcache">

这个时候如果不做 demo.appcache 的更新的话，缓存将不会更新，原因是index.html 被缓存了，检测的仍然是原 manifest 清单。那我们把 demo.appcache 文件更新下，刷新下页面还是没反应！再刷新，有了！为什么？

> 对于浏览器来说，manifest 的加载是要晚于其他资源的. 这就导致check manifest 的过程是滞后的。发现 manifest 改变，所有浏览器的实现都是紧随着做静默更新资源，以保证下次pv，应用到更新。

针对第二次刷新才能看到变化的问题，可以使用如下代码解决：

{% highlight javascript %}
window.applicationCache.addEventListener("updateready", function(){
	window.applicationCache.swapCache();
    window.location.reload();
});
{% endhighlight %}

##### 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢？

在线的情况下，浏览器发现 HTML 头部有 manifest 属性，它会请求manifest 文件，如果是第一次访问 app，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

离线的情况下，浏览器就直接使用离线存储的资源。

##### 离线缓存与传统浏览器缓存区别

浏览器缓存（Browser Caching）是为了节约网络的资源加速浏览，浏览器在用户磁盘上对最近请求过的文档进行存储，当访问者再次请求这个页面时，浏览器就可以从本地磁盘显示文档，这样就可以加速页面的阅览

区别：

* 离线缓存是针对整个应用，浏览器缓存是单个文件
* 离线缓存断网了还是可以打开页面，浏览器缓存不行
* 离线缓存可以主动通知浏览器更新资源

##### 请描述一下 cookie，sessionStorage 和 localStorage 的区别？

localStorage 和 sessionStorage 都是 Web Storage，它们是为了更大容量存储设计的。

二者的的区别：

> localStorage 是本地存储，存储期限不限。
> sessionStorage 是会话存储，页面关闭数据就会丢失。

Cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密），每次请求一个新的页面时，cookie 都会被发送过去，这样无形中浪费了带宽，另外 cookie 还需要指定作用域，不可以跨域调用。sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。

API：

> Web Storage 拥有 setItem，getItem，removeItem，clear 等方法。
> cookie 需要前端开发者自己封装 setCookie，getCookie。

存储大小：

> cookie数据大小不能超过4k。
> sessionStorage 和 localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

有效时间：

> localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。
sessionStorage 数据在当前浏览器窗口关闭后自动删除。
cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

[本地存储和离线缓存](http://www.jianshu.com/p/fff9e5c46b9e)

##### iframe 有哪些缺点？

* iframe 会阻塞主页面的 onload 事件。
* 搜索引擎的检索程序无法解读这种页面，不利于SEO。
* iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

如果需要使用 iframe，最好是通过 javascript 动态给 iframe 添加 src 属性值，这样可以可以绕开以上两个问题。

##### label 的作用是什么？是怎么用的？

label 标签用来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

{% highligth html %}
<label for="Name">Number:</label> 
<input type=“text“name="Name" id="Name"/>
<label>Date:<input type="text" name="B" /></label>
{% endhighlight %}

##### HTML5 的 form 如何关闭自动完成功能？

autocomplete=off。

##### 如何实现浏览器内多个标签页之间的通信?

应用场景：开启一个网站，状态为登录，又开启相同的网站（一个新的标签页），注销登录状态，此时需要把注销状态传递给前一个标签页。

localStorage：

{% highlight javascript %}
window.addEventListener('storage', function (event) {
  console.log(event.key, event.newValue, event.oldValue);
  // key被修改的键名，newValue修改后的值，oldValue修改前的值
});
{% endhighlight %}

一个标签页设置了 localStorage 后，可以被其它所有标签页访问。

cookie：

页面 A 使用`document.cookie`设置 cookie 后，页面 B 利用 setInterval 不断读取 cookie 值。

##### webSocket 如何兼容低浏览器？

long poll 和 Ajax 轮询。（此问题需进一步查找资料）

##### 页面可见性（Page Visibility）API 可以有哪些用途？

页面可见性：就是对于用户来说，页面是显示还是隐藏，所谓显示的页面，就是我们正在看的页面；隐藏的页面，就是我们没有看的页面。 因为，我们一次可以打开好多标签页面来回切换着，始终只有一个页面在我们眼前，其他页面就是隐藏的，还有一种就是把浏览器最小化，所有的页面就都不可见了。

API 很简单，document.hidden 就返回一个布尔值，如果是 true，表示页面可见，false 则表示页面隐藏。不同页面之间来回切换，触发visibilitychange 事件。 还有一个 document.visibilityState，表示页面所处的状态，取值：visible，hidden 等四个。

{% highlight javascript %}
document.addEventListener("visibilitychange", function(){
    if(document.hidden){
        document.title ="hidden";
    }else {
        document.title = "visibile";
    }
})
{% endhighlight %}

我们打开这个页面，然后再打开另一个页面，来回点击这两个页面，当我们看到这个页面时，标题显示 visiable，当我们看另一个页面时，标题显示hidden。

动画，视频，音频都可以在页面显示时打开，在页面隐藏时关闭。

##### 如何在页面上实现一个圆形的可点击区域？

map + area：

{% highlight html %}
<img src="t.jpg" width="1366" height="768" border="0" usemap="#Map" />  
<map name="Map" id="Map">  
	<area shape="circle" coords="821,289,68" href="www.baidu.com" target="_blank" />  
</map>  
{% endhighlight %}

border-radius：

{% highlight css %} 
.disc{  
    width: 100px;  
    height: 100px;  
    background-color: grey;  
    border-radius: 50%;  
    cursor: pointer;           
}  
{% endhighlight %}

使用 clientX 和 clientY 判断鼠标是否在圆上。

##### 实现不使用 border 画出 1px 高的线，在不同浏览器的模式下都能保持一致效果

{% highlight html %}
<div style="width:100%;height:1px;background-color:black"></div>
{% endhighlight %}

##### 网页验证码是干嘛的，是为了解决什么安全问题？

防止恶意破解密码、刷票、论坛灌水、暴力注册等。

##### title 与 h1 的区别，b 与 strong 的区别，i 与 em 的区别

从搜索引擎角度来说，title 标签是用来描述这个页面的主题的，是一个网页权重的最高点。但 title 标签并不出现在文章的正文中。而 h1 标签一般出现在文章的正文中，是展示给访问者的文章的标题。所以说这两个标签不仅不冲突的，而是合作的关系。一篇文章既要有 title 又要有 h1 标签，既突出了文章的主题，又突出了标题和关键字，达到双重优化网站的效果。

b 标签和 strong 标签给我们的主观感受都是加粗，但对搜索引擎来说 b 标签和普通的文字并没有什么区别，而 strong 标签却是起强调作用的。也就是说如果你想让搜索引擎认为你的某句话很重要时那就用 strong 标签。如果只是想让用户看到加粗的效果，那就用 b 标签。

同理如 em 标签也是针对搜索引擎来起作用的，i 标签只是让用户看到展示的是斜体。

在很多文章中，都把 b 和 i 标签称为物理元素，而 strong 和 em 称为逻辑元素。

##### 介绍一下 CSS 的盒子模型？

有两种盒模型，IE 盒模型和标准 W3C 盒模型。两者都分为四部分：内容（content）、填充（padding）、 边框（border）、边界（margin）。标准盒模型的大小为 content 的大小，IE 盒模型的大小还包含了 border 和 padding部分。

##### CSS 选择符有哪些？哪些属性可以继承？

id选择器（#）、类选择器（.）、标签选择器（div）、相邻选择器（h1 + p）、子选择器（ul > li）、后代选择器（li a）、通配符选择器（*）、属性选择器（a[rel = "external"]）、伪类选择器（a:hover, li:nth-child）、伪元素选择器（p:first-line, p:first-letter）

可继承的样式：font-size、font-family、color等。

不可继承的样式：border、padding、margin、background等。 

#####  CSS 优先级算法如何计算？

CSS 的 specificity 特性或非凡性，是衡量 CSS 优先级的一个标准。Specificity 用一个四位数来表示，从左到右，左侧级别最大，数位之间没有进位。

规则

* 行内样式优先级 specificity 值为 1,0,0,0。高于外部定义。                                           
* 按 CSS 代码中出现的顺序决定，后面的 CSS 样式居上。
* !important 优先级最高。
* 由继承而得到的样式没有 specificity 的计算，它低于一切其他规则（比如全局选择符 * 定义规则）。
* id 和类选择器的优先级值为 0,1,0,0。
* 属性选择器的优先级值为 0,0,1,0。
* 元素选择器等的优先值为 0,0,0,1。

算法： 

当遇到多个选择符同时出现时候，按选择符的 specificity 值逐位相加，在比较取舍时按照从左到右的顺序逐位比较。 

##### CSS3 新增伪类有哪些？

CSS 伪类：向某些选择器添加特殊的效果。

* p:first-of-type，选择属于其父元素的首个<p>元素的每个<p>元素。
* p:last-of-type，选择属于其父元素的最后<p>元素的每个<p>元素。
* p:only-of-type，选择属于其父元素唯一的<p>元素的每个<p>元素。
* p:nth-of-type(n)，选择属于其父元素第n个<p>元素的每个<p>元素。
* p:nth-last-of-type(n)，选择属于其父元素倒数第n个<p>元素的每个<p>元素。
* p:only-child，选择属于其父元素唯一的子元素的每个<p>元素。
* p:nth-child(n)，选择属于其父元素的第n个子元素的每个<p>元素。
* p:nth-last-child(n)，选择属于其父元素的倒数第n个子元素的每个<p>元素。
* p:last-child，选择属于其父元素最后一个子元素的每个<p>元素。
* p:empty，选择没有子元素的每个<p>元素（包括文本节点）。
* p:target，选择当前活动的<p>元素。
* :not(p)，选择非<p>元素的每个元素。
* :enabled，控制表单控件的可用状态。
* :disabled，控制表单控件的禁用状态。
* :checked，单选框或复选框被选中。

##### 垂直和水平居中

水平居中：

* 行内元素，text-align: center。
* 块级元素，margin: 0 auto。
* 浮动元素

宽度不确定：

{% highlight html %}
<div class="outerbox">  
   <div class="innerbox">我是浮动的</div>  
</div>  
{% endhighlight %}

{% highlight css %}
.outerbox{  
	float:left;   
	position:relative;   
	left:50%;   
}   
.innerbox{    
	float:left;   
	position:relative;   
	right:50%;   
}  
{% endhighlight %}

宽度确定：

{% highlight css %}
.outerbox{  
    background-color:pink; /*方便看效果 */    
    width:500px ;   
    height:300px; /*高度可以不设*/  
    margin: -150px 0 0 -250px; /*使用marin向左移动250px，保证元素居中*/  
    position:relative;   /*相对定位*/  
    left:50%;  
    top:50%;  
}  
{% endhighlight %}

* 绝对定位

{% highlight css %}
.center{  
	position: absolute; /*绝对定位*/  
    width: 500px;  
    height:300px;  
    background: red;  
    margin: 0 auto; /*水平居中*/  
    left: 0; /*此处不能省略，且为0*/  
    right: 0; /*此处不能省略，且为0*/  
}  
{% endhighlight %}

垂直居中：

* 行内元素：line-height 和 height 相等。
* 块级元素：

父元素高度不确定：padding-top 和 padding-bottom 相同。

父元素高度确定：

{% highlight css %}
.center{  
    width: 500px;  
    height:300px;  /*父元素 height 和 line-height 相同*/
    line-height: 300px;  
    border:1px solid;  
}  
 .inner{  
     background: blue;  
     width: 300px;  
     height: 100px;  
     display: inline-block;  /*display 和 vertical-align 是重点*/
     vertical-align: middle;  
} 
{% end highlight %} 

Flex 属性也可以实现垂直和水平居中。



