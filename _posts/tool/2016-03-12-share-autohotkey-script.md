---
layout: post
title: AutoHotKey实用脚本分享
date: 2016-03-12 15:00:23 +0800
categories: 工具
tags: AutoHotKey
keywords: Windows,AutoHotKey,效率
description: 介绍AutoHo使用方法，分享一个Auto实用脚本
---

**温馨提示：** 以下内容非原创，来自于[amoBBS阿莫电子论坛](http://www.amobbs.com/thread-5604550-1-1.html)；觉好特整理到此，个中分享脚本示例，未有经一一测试，因此读者可据实际需要甄别而取用。

---

之前一直有用按键精灵做一些重复性的工作，可以录制键盘鼠标操作，脚本编程，挺方便。后来接触了AutoHotKey这个软件，主要是做快捷键设置的（当然也有大牛脚本编程做些别的），用了有一段时间了，个人觉得非常方便，分享给大家使用。

程序使用脚本语言，相对比较简单，用的过程主要就是需要用什么功能就上网查查，然后还有chm的帮助文档比较有用，写简单应用完全够了。

我自己使用主要就是键盘快捷方式操作了，用的大部分都是Win的组合键方式，用来启动/激活/最小化应用程序。然后就是粘贴板的读取/修改/粘贴等操作，不知道论坛里有没有人用呀，在此抛砖引玉一下。
当然很多也是从网上获得的参考，修改满足自己的需求，也希望能提供感兴趣的大家一个参考。

废话不多说，上代码前说点AutoHotKey的脚本语言说明（帮助文档里其实都有啦）：

####  1. 按键说明(功能键可以组合，比如^+c就表示Ctrl+Shift+c了)：    

|特殊符号|代表含义|
|:---:|:---:|
|^                 | 表示Ctrl键|
|+                 | 表示Shift键|
|!                 | 表示Alt键|
|#                 | 表示Win键|
|Up                | 表示上箭头键|
|Down              | 表示下箭头键|
|Left                | 表示左箭头键|
|Right                | 表示右箭头键|
|PgUp                | 表示PageUp键|
|PgDn                | 表示PageDn键|
|F1-F12        | 表示功能键|
|a-z                | 表示a-z键|
|LButton        | 表示鼠标左键|
|RButton        | 表示鼠标右键|
|MButton        | 表示鼠标中键        |
|WheelUp        | 表示鼠标滑轮向上|
|WheelDown | 表示鼠标滑轮向下|
|Del                | 表示Del删除|
|Enter                | 表示Enter回车|
|Tab                | 表示Table制表符|
|Space        | 表示Space空格|
|.... |....|

(一般这些就够用了，当然还有很多，可以直接到帮助文档chm中搜索引key list查看即可了)

####  2. AutoHotKey程序包说明：
AutoHotKey就不介绍了，感兴趣的直接搜一下就行，一个热键脚本运行软件，软件比较小，也不占资源，使用讨论的人应该也比较多。
运行后，默认运行AutoHotKey.exe同目录下的AutoHotKey.ini内的脚本程序，本文中后续涉及到程序就在这个ini文件里面。
在最后提供我自己用的程序压缩包，当然也是网上下的，忘在哪下的了，应该不是最新版，不过够用就行。

我认为比较有用的是以下的：

> **AutoHotkey.exe**     主程序，不多说，不过功能这么强大，但是程序竟然只有250KB，膜拜啊，吐槽一下现在的软件越做越臃肿！！！
**AutoHotKey.ini**        默认执行的脚本语言文件(AutoHotKey脚本语言的默认文件后缀是.ahk，在“文中脚本”文件夹里可以看到一些例程)。
**nircmd.exe**                是我下载的一个扩展cmd程序，好像也比较强大，脚本里用到音量调节及关屏用到了这个程序，有chm帮助文档。
**AU3_Spy.exe**          提供的一个Windows程序ahk_class抓取的工具，后面脚本里程序的ahk_class就是通过这个软件抓取的，打开就知道怎么用了。

####  3. 粘贴板使用说明：
脚本语言里有一个全局变量Clipboard，就可以当粘贴板用，可以从里面取数据，也可以往里面存数据。
Clipboard变量是文本型，ClipboardAll变量则是全部粘贴板多媒体型的，要具体了解到chm文档里查就行，里面的基本示例：

>Clipboard = my text         ;给予剪贴板全新的内容。   
Clipboard =         ;清空剪贴板。  
Clipboard = %clipboard%         ;将任何复制的文件、HTML 或者其它带格式的文本转换为纯文本。   
Clipboard = %clipboard% 添加的文本。         ;在剪贴板中追加些文本。   
StringReplace, Clipboard, Clipboard, ABC, DEF, All ;将剪贴板中所有的 ABC 替换为 DEF (同时也将剪贴板中的内容转换为纯文本)。  

看到这几个示例大家应该就能想法了，粘贴板还是相当方便的，要是能随意操作它，可以干很多事情了。

####  4. 脚本赋值语句说明：
脚本语言里的变量是泛变量，不用声明定义，直接在要用的时候赋值就行了，而且根据赋值自动满足变量类型，之后就可以使用同样的变量名使用了。
赋值语句有以下几种：

>Var := expression  -> ":=" 赋值跟Dephi挺象，将表达式expression的的值赋给变量Var，表达式可以是函数，变量，运算等。
Var .= expression  -> ".=" 赋值为附加赋值，常用于字符串，把expression附加都原Var的后面。
Var = expression        -> “=” 赋值跟":=" 类似，后面跟赋的值变量的引用，直接变量名加2个%即可：%expression%。

####  5. 针对某个应用程序定制快捷键操作：
使用#ifWinActive语句实现，如：

>#ifWinActive, ahk_class AutoHotkeyGUI
; AutoHotkeyGUI:Esc -> Exit this GUI
Esc::
        send !{F4}
        Return
\#ifWinActive

表示在ahk_class值为AutoHotkeyGUI的程序里，ESC键的作用就是发送虚拟按键Alt+F4，即退出该程序。
此处最后要再加一个#ifWinActive，否则后面的程序语句都会被认为是该AutoHotkeyGUI程序下的快捷键操作。

####  6. ahk_group使用说明：
脚本语句里大量使用ahk_class作为程序识别的主要依据，但对于某些程序，不只有一个程序窗口，比如Windows Media Player，有多个形态的窗口，但由于他们同属一个应用程序，可以共享一套快捷键操作，因此可以用ahk_group作为识别依据。
ahk_group使用前需要定义并添加程序到组，和变量一样，不用定义直接使用GroupAdd语句添加即可，如：

>GroupAdd, WinMediaApp, ahk_class WMPlayerApp
GroupAdd, WinMediaApp, ahk_class WMP Skin Host
GroupAdd, WinMediaApp, ahk_class CWmpControlCntr
GroupAdd, WinMediaApp, ahk_class WMPTransition

此处ahk_class值为WMPlayerApp/WMP Skin Host/CWmpControlCntr/WMPTransition的都是Windows Media Player的程序窗口，而在后续使用中则可以直接用ahk_group WinMediaApp来识别所有组内的Windows Media Player程序了。

注：GroupAdd语句必须在#ifWinActive定义并设置好，否则会无效，直接放在脚本程序最前面就可以了。

####  7. 脚本语言简单说明，直接上一小段看看就大体明白了，简单易用（脚本语言不区分大小写，个人习惯首字母大写）：

```
; Win+f -> Firefox (Run/Activate/Minimize)
; ---------------------------------------------------------
#f::
{
        DetectHiddenWindows, on
        ifWinNotExist ahk_class TFoxmail_Main.UnicodeClass
                Run D:\Program Files\Foxmail 7.0\Foxmail.exe
        else
        {
                ifWinNotActive ahk_class TFoxmail_Main.UnicodeClass
                        WinActivate
                else
                        WinMinimize
        }
        Return
}
; ---------------------------------------------------------
```

稍稍解释一下，整小段的意思就是：按Win+f键可以打开或激活或最小化foxmail，如果foxmail没运行，就运行，如果已运行但没激活(不是最前窗口)就激活，如果已经激活就最小化。
 ";"        -> 分号表示注释，跟着后面的整行都注释了，跟C的“//”一个意思。
#f::        -> 表Win+f组合键触发执行之后的脚步程序运行，直到return。
{}        -> 跟C语言一样，表示多行语句块，对于if-else等语句，若后面只一句可以不用{}，多行则应该加上。
DetectHiddenWindows, on         ->检测隐藏窗户，因为foxmai被设置成最小化后到托盘了，所以需要加上这句。

```
ifWinNotExist ahk_class TFoxmail_Main.UnicodeClass        -> 检测ahk_class值为TFoxmail_Main.UnicodeClass的程序是否存在。
Run D:\Program Files\Foxmail 7.0\Foxmail.exe                -> 程序不存在则Run运行程序，写上foxmail的绝对路径。
ifWinNotActive ahk_class TFoxmail_Main.UnicodeClass -> 若程序已存在，则检测程序是否已激活，是不是处于最前窗口。
WinActivate                -> 如果未激活状态，则激活程序。
WinMinimize        -> 如果出现已激活，则最小化程序。
```

罗嗦了一大堆，其实论坛里的都应该有语言基础，一看就明白，以上这一小段脚本就实现了Win+f的快捷启动/激活/最小化foxmail的操作了。

以上这一小段加以小修改，就能创造一堆的程序快捷启动操作了，附上我自己写的AutoHotKey.ini脚本文件，实现以下的快捷操作方式(感觉还挺方便，全凭习惯了)：

1. Ctrl+Alt+c         -> 复制文本并附加到原粘贴板文本后      
2. Ctrl+Alt+i -        > 复制文本，并处理，对文本中最后的数值(十进制或十六进制0x)自动+1，然后粘贴；分别对末尾的“:”和";"进行了处理，回车再粘贴，便于C语言的自增复制（之前这种重复    性工作很苦恼啊），对于case语句也挺有用，如选中“case 0:”，然后一直按Ctrl+Alt+i，就自动出来“case 1:”,“case 2:”等行。
3. Ctrl+Alt+d         -> 和Ctrl+Alt+i类似，不过是自动-1。    
4. Ctrl+Alt+Up/WheelUp        -> 复制文本，自动数字+1，粘贴并重新选中刚粘贴的文本内容，连续使用一直往上加，支持10/16进制，16进制以0x开头。    
5. Ctrl+Alt+Down/WheelDown -> 复制文本，自动数字-1，粘贴并重新选中刚粘贴的文本内容，连续使用一直往下减。    
6. Ctrl+Alt+t        -> 十进制/十六进制自动转换，如选中10，按快捷键，弹出转换窗口，并自动将十六进制数0x0A放到粘贴板里，反过来一样。    
7. Ctrl+Alt+x        -> 复制并自动交换==,<=,>=,=,<,>,!=等符号两边的变量，对于<=等则同时交换为>=等，如"a == 0"，变为"0 == a","intx[0] < 1"变为“1 > intx[0]"，对于C编程    中条件语句的变化十分方便(个人习惯，数值放前面，变量放后面，如if(1 == a)这样，经常有要改的情况，so...)。
8. Ctrl+Alt+o        -> 复制文本并打开Lingoes程序，自动粘贴(进行翻译)。    
9. Win+F1                -> 静音/打开声音(使用nircmd.exe实现)。    
10. Win+F2        -> 降低音量。    
11. Win+F3        -> 增加音量。    
12. Win+F4        -> 关屏。    
13. Win+Esc        -> 打开任务管理器。    
14. Win+~                -> 显示运行窗口程序列表。    
15. Win+l                -> 锁定计算机(系统默认的)，并自动关屏幕。    
16. Win+c                -> 打开/激活/最小化 Total Command文件管理器(很强大，推荐使用！)，该应用程序下的快捷键：    
        16.1 Alt+滑轮上        -> 转到上一个标签     
        16.2 Alt+滑轮下        -> 转到下一个标签     
        16.3 Ctrl+滑轮上        -> 切换左/右窗口     
        16.4 Ctrl+滑轮下 -> 切换左/右窗口     
        16.4 滑轮上         -> 光标移到上一文件     
        16.5 滑轮下         -> 光标移到下一文件     
        16.6 ~                 -> 打开开始标签栏     
        16.7 鼠标中键        -> 回车打开文件/文件夹     
        16.8 Ctrl+右键        -> 打开右键菜单     
        16.9 鼠标右键手势操作，提供两个手势组合识别，如“上左”,"右下"等，共16个手势，不一一赘述了，有兴趣可以试。     
17. Win+s                -> 打开/激活/最小化 Secure*C*R*T终端程序。    
18. Win+f                -> 打开/激活/最小化 Foxmail程序。    
19. Win+e                -> 打开/激活/最小化 Slic*k*E*dit程序(强大的编辑器)。    
20. Win+v                -> 打开/激活/最小化 gVim程序(Vim的Windows版)。    
21. Win+h                -> 使用Notepad++打开Hosts文件/保存退出，为上google经常要改hosts,so you know...    
22. Win+m                -> 打开/激活/最小化 MediaPlayer程序，没装播放器，直接系统自带的，安装了一个解码包Win7Coders。    
        22.1 Space空格        -> 开始/暂停      
        22.2 Enter回车        -> 全屏播放      
        22.3 滑轮上/上键        -> 音量+      
        22.4 滑轮下/下键        -> 音量-      
        22.5 左键                -> 快退      
        22.6 右键                -> 快进      
        22.7 PageUp键        -> 上一曲/集      
        22.8 PageDn键        -> 下一曲/集      
        22.9 F1键                -> 打开      
        22.10 F2键                -> 上一曲/集      
        22.11 F3键                -> 下一曲/集      
        22.12 F4键                -> 关闭      
23. Win+n                -> 打开/激活/最小化 Notepad++程序（替代Notepad使用）。    
        23.1 Alt+滑轮上        -> 转到上一个标签     
        23.2 Alt+滑轮下        -> 转到下一个标签     
        23.3 鼠标右键手势操作，可共设置16个手势，不一一赘述了，根据个人习惯设置了，有兴趣可以试试。     
24. Win+g                -> 打开/激活/最小化 Chrome程序（强大的浏览器，不过竟然装在AppData目录下，还跟用户名绑定...）。    
        24.1 F1        -> 新建标签页      
        24.2 F2        -> 转到左标签页      
        24.3 F3        -> 转到右标签页      
        24.4 F4        -> 关闭当前标签页      
        24.5 F5        -> 刷新当前标签页(默认)      
        24.6 F6        -> 焦点到浏览器网址栏(默认)      
        24.7 F7        -> 撤销，重新打开刚关闭的页面      
        24.8 F8        -> 打开下载页面      
        24.9 Alt+滑轮上        -> 转到左标签页      
        24.10 Alt+滑轮下-> 转到右标签页      
        24.11 鼠标右键手势操作，Chrome内有CrxMouse插件使用，就没做了。      
25. Win+q                -> 打开/激活/最小化 Lync程序。    
26. Win+a                 -> 打开/激活/最小化 Al*tiu*m De*sign*er程序。    
        26.1 Alt+滑轮上        -> 转到上一个标签    
        26.2 Alt+滑轮下        -> 转到下一个标签    
27. Win+o                 -> 打开/激活/最小化 Lin*go*es程序(翻译软件)。    
28. Win+t                 -> 打开/激活/最小化 On*eN*ote程序(笔记软件，自动保存，比较好用)。    
        28.1 ~        -> 正常视图/全页面视图切换    
        28.2 F2        -> 格式复制    
        28.3 F3        -> 格式粘贴(格式化刷)    
29. Win+z                -> 打开/激活/最小化 OneCal程序(OneNote的一个管理小插件)。    
30. Win+b                -> 打开/激活/最小化 PC*M*as*ter程序(系统管理软件，用习惯了)。    
31. Win+w                -> 打开/激活/最小化 Ma*gic*W*ifi小程序(PC*M*as*ter的一个小工具，wifi共享的，较常用)。    
32. Win+PrtSc        -> 打开/激活/最小化 F*SCa*ptu*re程序(一个强大的截图软件)。    
        32.1 F1        -> Alt+PrtSc 当前程序窗体截图    
        32.2 F2        -> Shift+PrtSc 自动窗体选择截图    
        32.3 F3        -> Ctrl+PrtSc 矩形框截图    
        32.4 F4        -> Ctrl+Shift+PrtSc 自定义形状截图    
        32.5 F5         -> Ctrl+Alt+PrtSc 自动滚动窗体截图    
        32.6 F6         -> Ctrl+Alt+Shift+PrtSc 自定义尺寸矩形截图    
        32.7 1         -> Ctrl+[ 放大镜小工具(Ctrl+[等快捷键需要在F*SCa*ptu*re程序里先设置了才行)    
        32.8 2         -> Ctrl+] 拾色器小工具    
        32.9 3         -> Alt+[ 屏幕十字线小工具    
        32.10 4         -> Alt+] 屏幕标尺小工具    

感觉还是罗嗦了好多，以上这些其实也没必要写，不过脚本没写太多注释，就权当注释了。
以上都是根据个人习惯定的，有相应不同需求的根据自己习惯改就行，相信大家的能力想做绝对没有问题。
