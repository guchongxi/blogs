---
layout: post
title:  解决 svn 清理失败(Cleanup Fail)问题
date: 2016-03-31 17:09:41 +0800
categories: 工具
tags: svn
keywords: Svn Cleanup Fail
description: svn 清理失败 (clean up 失败) 的解决方法
---

在被迫使用 **SVN** 的日子里，不时会遇到，某个文件被 **Lock** 的情形。任你是 Revert，Resolvd，还是别的，就是不行，无法 **Cleanup**。那叫一个凄凄惨惨，花费不少时间折腾这个，除了重新 **Checkout** 外，就如下办法是能够很好工作的，特此怒记载一笔。 **Git ！Git ！Git ！**

![解决 svn 清理失败(Cleanup Fail)问题](http://7xoosr.com1.z0.glb.clouddn.com/sharp-weapon.jpg)

### **svn无法Cleanup解决方法：**  

* **Step1:** 到 sqlite官网 (http://www.sqlite.org/download.html) 下载 sqlite3.exe；找到 **Precompiled Binaries for Windows**，点击 	sqlite-tools-win32-x86-xxxxxxx.zip 下载。

* **Step2:** 将下载到的 **sqlite3.exe** 文件复制到 本地磁盘的某个临时目录下(当然也可以不用)。

* **Step3:**  然后 设置 svn源代码 文件夹 及文件 显示 所有文件（包括隐藏文件），会发现 `.svn/wc.db` 文件， 将 其复* Step2 的临时目录下（sqlite3.exe 所在目录下）。

* **Step4:**  打开 wc.db(开始 -> 运行 -> 打开 cmd命令; 或者直接将wc.db拖入sqlite3.exe); 执行 **delete from work_queue**;


* **Step5:** 将 wc.db 覆盖到 svn源代码目录的 .svn目录下。

* **Step6:** 对 svn源代码目录 右键, clean up, 稍等1至5分钟左右，然后会提示 清理成功。
