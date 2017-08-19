---
layout: post
title:  "移动端 Web 页面调试指南"
date:   2017-05-18 17:00:30 +0800
categories: [Tech]
excerpt: 做了半年 Hybrid 开发，生产力工具从 Win 本过度了到了 Mac，平时也总解决 Android 和 iOS 的各种兼容性 Bug。一直想写一篇博文完整的总结一下基于各种平台的调试方法。终于把这个坑填啦~
tags:
  - CN
  - front-end
  - Mobile
---

本篇文章主要分为以下部分：

* 利用 Chrome 模拟移动端开发（Windows、Mac）
* 利用 Chrome 进行 Android 真机调试（Windows、Mac）
* 在 Mac 上利用 Safari 进行 iPhone 真机调试
* 在 Mac 上利用 Safari 模拟移动端开发
* 在 Mac 上利用 iOS 模拟器进行 Hybrid 开发
* 在手机上用浏览器查看页面效果（Android、iPhone）

#### 利用 Chrome 模拟移动端开发

作为一个前端工程师，每日与 Chrome 打交道，相信大家对 Chrome 的调试方法早已轻车熟路。在这里就简单提下。

在 Chrome 中打开待调试页面，`F12`开启开发者工具（Mac中是`cmd+alt+i`）。点击开发者工具左上角的第二个图标（下图中被红色框选中的），待调试页面就会切换到移动终端屏幕展示模式。

![mobile-debug1](http://oty92p38d.bkt.clouddn.com/web-debug-in-mobile/1.jpeg)

点击左上角的移动设备名称（如 iPhone6），可以切换设备。

![mobile-debug2](http://oty92p38d.bkt.clouddn.com/web-debug-in-mobile/2.png)

同时，`Edit`支持自定义设备，可以自己添加一些特殊分辨率的屏幕。

![mobile-debug3](http://oty92p38d.bkt.clouddn.com/web-debug-in-mobile/3.png)

Chrome 最主要的还是模拟移动设备的屏幕尺寸，由于各种手机厂商会对手机浏览器进行不同程度的定制，真机中的效果可能会与 Chrome 中看到的不同，在不同型号的手机中便会出现形形色色的 Bug。因此，本方法比较适合日常的开发，开发完毕后需要在真机中查看具体效果。若遇到各种兼容性 Bug，就需要真机调试或模拟器调试了。

#### 利用 Chrome 进行 Android 真机调试

利用 Chrome 可以对 Android 上的 Web 页面、原生 App 中的 WebView 进行调试。方法很简单，在 PC 和 Android 手机上安装最新版的 Chrome 浏览器，将手机与 PC 用数据线连接，手机开启 USB 调试功能，不同机型开启调试功能的方法不一样，请自行百度。在 PC 端的 Chrome 地址栏中输入 `chrome://inspect/#devices`，选中`Discover USB devices`，若页面中显示出了你的设备名称，表示 Chrome 成功连接到了你的手机。若没有连接成功，请检查数据线是否完好、浏览器是否是新版。

![mobile-debug4](http://oty92p38d.bkt.clouddn.com/web-debug-in-mobile/4.png)

连接成功后，用手机的 Chrome 打开想调试的 Web 页面，PC 端的 inspect 页面会同步出现相应的页面信息，点击`inspect`即可开始调试。若想调试某 App 中的 WebView 页面，手机中需安装该 App 的 debug 版本，进入 App 中的相应 WebView 页面，PC 端的 Chrome 便会成功获取该页面信息。

#### 在 Mac 上利用 Safari 进行 iPhone 真机调试

iPhone 的真机调试与 Android 相似。首先，为 Safari 开启开发者工具，打开 Safari，`cmd+,`打开偏好设置，在`高级`选项的最下边，选中`在菜单中显示开发菜单`。此时，Safari 的菜单栏中就会出现`开发`选项。

![mobile-debug5](http://oty92p38d.bkt.clouddn.com/web-debug-in-mobile/5.png)

接着，将 iPhone 与 Mac 用数据线连接，在 PC 端 Safari 的`开发`中会出现`iPhone`选项，选中之后即可看到手机中开启的 Web 页面。

当出现与 iOS 版本相关的 Bug 时，比如在 iOS 8.x 版本的 iPhone5 中出现了一些问题，采用本方法比较合适，直接连上测试机就可以定位问题了。但对于更普遍的 Bug、或者仅仅想看下页面在真机中的效果，还是采用 iOS 模拟器比较方便。

#### 在 Mac 上利用 Safari 模拟移动端开发

Safari 也像 Chrome 一样可以模拟移动端开发。在`开发`中选中`用户代理`-`iPhone`。

![mobile-debug6](http://oty92p38d.bkt.clouddn.com/web-debug-in-mobile/6.png)

接着选中`开发`中的`进入响应式设计模式`，页面就会切成移动显示模式了。

![mobile-debug7](http://oty92p38d.bkt.clouddn.com/web-debug-in-mobile/7.png)

作为一个 Chrome 党，平时开发从来没有用过这种方法，好不好用就不做评价啦。

#### 在 Mac 上利用 iOS 模拟器进行 Hybrid 开发

iOS 模拟器（iOS Simulator）捆绑在了 Xcode 里，但其本身也是一个独立程序，启动 iOS 模拟器后，可以在 Dock 中看到模拟器的图标。右键选择图标，在`选项`中选择`在 Dock 中保留`，这样即使关闭模拟器，图标也会出现在 Dock 中，方便以后开发调试。

![mobile-debug8](http://oty92p38d.bkt.clouddn.com/web-debug-in-mobile/8.png)

启动模拟器后，可以在模拟器中的 Safari 打开想调试的页面，再打开 Mac 上的 Safari，在`开发`-`Simulator`中监听相应页面。但这完全没有必要，这和直接用 Mac 上的 Safari 开发没有什么区别。iOS 模拟器主要是用来调试原生 App 中的 WebView 页面的。

想要用模拟器调试 WebView 页面，你需要找 NA 的小伙伴给你一个基于源代码打包出来的 App Bundle，因为模拟器上没有 App Store，同时也不支持下载 ipa 文件进行安装。拿到了 App Bundle 后（我的 Bundle 名字叫 IphoneCom.app），打开终端，执行如下语句`xcrun simctl install booted /Users/ks/Documents/IphoneCom.app`。`/Users/ks/Documents/`是你的 App Bundle 所处的位置，如果不知道位置，可以先在终端输入`xcrun simctl install booted `后，注意后面有个空格，不要输入回车，直接把自己的 App Bundle 拖入终端，终端会自动识别它所在的位置，输入回车，模拟器中就会有相应的 App 了。

现在可以在模拟器的 App 中打开自己要调试的 WebView 页面啦，可以使用`xcrun`命令开启相应的页面，我不太喜欢输入页面 URL，所以比较习惯直接对 App 进行操作，从而访问相应的页面。感兴趣的同学可自行百度`xcrun`的用法。

打开待调试的页面后，在 Mac 上的 Safari—开发—Simulator 中即可看到相应的 WebView 页面，这样就可以开始相应的调试啦。

![mobile-debug9](http://oty92p38d.bkt.clouddn.com/web-debug-in-mobile/9.png)

每次 App Bundle 中有代码修改时，都需要重新在模拟器中安装 App，选择`Simulator`—`Reset Content and Settings`重置模拟器，再执行`xcrun simctl install booted /Users/ks/Documents/IphoneCom.app`安装 App。

#### 在手机上用浏览器查看页面效果（Android、iPhone）

最后，如果你只是想用 Android 或 iPhone 的浏览器看看本地代码的效果，在本地开启一个 server 后，比如`localhost:8080`，在手机浏览器中将`localhost`替换成电脑的 IP 地址即可看到本地的页面啦。