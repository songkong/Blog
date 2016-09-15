---
layout: post
title:  "学习笔记之《JavaScript 高级程序设计》（上篇）"
date:   2016-09-15 13:40:30 +0800
categories: [Front-end]
excerpt: 这篇文章归纳了书中第1到8章的相关知识点，留作日后复习。
tags:
  - CN
  - front-end
  - JavaScript
---

# 目录

>#### 第一章【 [JavaScript简介](#chapter1) 】
>1. [ECMAScript](#chapter1-1)
>2. [文档对象模型(DOM)](#chapter1-2)
>3. [浏览器对象模型(DOM)](#)

<h3 id="chapter1">第一章  JavaScript简介</h3>

一个完整的 JavaScript 实现由如下三个部分组成：

* 核心 (ECMAJavaScript)
* 文档对象模型 (DOM)
* 浏览器对象模型 (BOM)

<h4 id="chapter1-1">1.1 ECMAScript</h4>

ECMAScript 是由 ECMA-262 定义的与`宿主环境`（如 Web 浏览器、Node 和 Adobe Flash 等）没有依赖关系的一门语言，该语言本身并不包括输入和输出定义。宿主环境不仅提供基本的 ECMAScript 实现，同时还会提供该语言的扩展，如 DOM。

ECMA-262 规定了这门语言的下列组成：语法、类型、语句、关键字、保留字、操作符、对象。

<h4 id="chapter1-2">1.2 文档对象模型(DOM)</h4>

文档对象模型(DOM)是针对 XML 但经过扩展用于 HTML 的 API。 DOM 把整个页面映射为一个多层节点结构，HTML 或 XML页面中的每个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据。通过 DOM 创建的文档树形图并借助 DOM 提供的 API，可以轻松的对节点进行删除、添加、替换或修改等操作。

