---
title:  "ERP 通用页面及弹窗说明文档"
date:   2017-02-08
categories: 文档
tag: 固定表头 弹窗 通用
---

<style type="text/css">
td{
    text-align: center;
}
table td:nth-child(even){
    color: #0099CC !important
}
</style>

**注意：**这份文件是用 Markdown 写的，你可以[看看它的原始文件][src] 。

*   预览 [完全效果](/table-show)
*   下载 <a href="/assets/table-demo/table-common.html" target="_blank" download>页面模版</a>
*   下载 <a href="/assets/table-demo/table-popup.html" target="_blank" download>弹窗模版</a>

[src]: https://github.com/GiantZero-x/GiantZero-x.github.io/blob/master/_posts/document/2017-02-08-erp-commonpage.md


1.  [前言](#introduction)
2.  [通用组件](#common)
    *   [浮动](#common1)
    *   [图标](#common2)
    *   [颜色](#common3)
    *   [按钮](#common4)
    *   [树形菜单](#common5)
   
3.  [页面模块](#html)
    *   [结构](#html1)
    *   [头部](#html2)
    *   [查询框](#html3)
    *   [通用导航条](#html4)
    *   [滚动导航条](#html5)
    *   [表格](#html6)
    
4.  [弹窗](#popup)
    *   [头部](#popup1)
    *   [主体](#popup2)
        *   [流程](#popup_modular0)
        *   [标题](#popup_modular1)
        *   [栅格](#popup_modular2)
        *   [附件](#popup_modular3)
        *   [表格](#popup_modular4)
        *   [审核历史](#popup_modular5)
    *   [尾部](#popup3)
    *   [附属](#popup4)
    *   [页面内弹窗](#popup5)
    
5.  [交互逻辑](#js)
    *   [页面逻辑](#js1)
    *   [弹窗逻辑](#js2)

---

<h2 id="introduction">前言</h2>

*  此样式组件结构适用于 **商翔集团ERP(PC端)** 固定表头式表格页面及所有弹窗；

*  页面样式及通用组件文件 `table-common.css(源文件为同名less文件)` 以及弹窗样式文件 `table-popup.css(源文件为同名less文件)` 已加载至 `\templates\home\index.html` 全局可用；但在项目初始阶段没有进行样式重置,因此部分页面需单独引入 `static\css\reset.css` 进行样式重置；

*  页面公共逻辑代码基本部署在 `static\js\home\header.js`；

*  为充分进行样式复用，页面显示效果仅与标签 `class` 有关；但因涉及到部分js交互效果，特定标签 `id` 已被限定，如需修改请注意修改相关函数调用参数；

*  若在使用中有任何疑问或bug可随时联系我。

---

<h2 id="common">通用组件</h2>

<h3 id="common1">浮动</h3>

*   左浮动 ：`fl`
*   右浮动 ：`fl`
*   清除浮动 ：`clearfix`

<h3 id="common2">图标</h3>

所有图标都需要一个基类和对应每个图标的类。例如添加按钮：<img src="/assets/icon/add.png" style="display:inline-block;margin-bottom:0;">
{% highlight html %}
    <i class="icon icon-add"></i>
{% endhighlight %}

所有可用的图标
<div>
  <table width="100%">
    <thead>
      <tr>
        <th width="5%">显示</th>
        <th width="20%">class</th>
        <th width="5%">显示</th>
        <th width="20%">class</th>
        <th width="5%">显示</th>
        <th width="20%">class</th>
        <th width="5%">显示</th>
        <th width="20%">class</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><img src="/assets/icon/add.png"></td>
        <td>icon-add</td>
        <td><img src="/assets/icon/add_blue.jpg"></td>
        <td>icon-add_blue</td>
        <td><img src="/assets/icon/add_green.png"></td>
        <td>icon-add_green</td>
        <td><img src="/assets/icon/attachment.png"></td>
        <td>icon-attachment</td>
      </tr>
      <tr>
        <td><img src="/assets/icon/birth.jpg"></td>
        <td>icon-birth</td>
        <td><img src="/assets/icon/cancel.png"></td>
        <td>icon-cancel</td>
        <td><img src="/assets/icon/delete.jpg"></td>
        <td>icon-delete</td>
        <td><img src="/assets/icon/download.jpg"></td>
        <td>icon-download</td>
      </tr>
      <tr>
        <td><img src="/assets/icon/edit.jpg"></td>
        <td>icon-edit</td>
        <td><img src="/assets/icon/email.jpg"></td>
        <td>icon-email</td>
        <td><img src="/assets/icon/home.jpg"></td>
        <td>icon-home</td>
        <td><img src="/assets/icon/payment.jpg"></td>
        <td>icon-payment</td>
      </tr>
      <tr>
        <td><img src="/assets/icon/people.jpg"></td>
        <td>icon-people</td>
        <td><img src="/assets/icon/print.jpg"></td>
        <td>icon-print</td>
        <td><img src="/assets/icon/query.jpg"></td>
        <td>icon-query</td>
        <td><img src="/assets/icon/right.jpg"></td>
        <td>icon-right</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 id="common3">字体颜色</h3>

*   红色：`font_red`
*   蓝色：`font_blue`
*   绿色：`font_green`

必填项 `*`

*   前方：`necessary_front`
*   后方：`necessary_back`

<h3 id="common4">按钮</h3>

*   通用：`common_btn`
*   红色空心：`red_border_btn`
*   红色实心：`red_bcg_btn`
*   蓝色空心：`blue_border_btn`

<h3 id="common5">树形菜单</h3>

暂未开发！

---

<h2 id="html">页面模块</h2>

<h3 id="html1">结构</h3>

HTML文件内代码分为三个部分：`CSS`，`HTML` 和 `Javascript`
{% highlight html %}
<link rel="stylesheet" type="text/css" href="static/css/reset.css" />
<style type="text/css">
    /*页面自有样式*/
</style>

<div class="single_zr">
    <div class="right_container">
        <!--页面模块-->
    </div>
<div>

<!--页面自有弹窗 (如申请功能弹窗)-->
  ···
<!-- 结束 -->


<script>
    $(function(){
        /*页面逻辑*/
    })
</script>
{% endhighlight %}

页面自有样式一般仅设置表格各列宽度（最后一列为自适应宽度，不进行设定），宽度总和等于 `（100% - 最后一列宽度）` 
 
例：表格共10列，每列宽度占比10%，宽度总和为90%
{% highlight css %}
.c_1,
.c_2,
.c_3,
.c_4,
.c_5,
.c_6,
.c_7,
.c_8,
.c_9 {
  width: 10%
}
{% endhighlight %}

<h3 id="html2">头部</h3>

![1.png][]

{% highlight html %}
<div class="breadcrumb_nav">
    <!-- 导航 -->
    <p class="current_nav">
        <span class="current_nav_title">当前位置:</span>
        <a class="current_nav_item" href="index.php?sys=">一级标题</a>
        <span class="indicator">>></span>
        <span class="current_nav_item">二级标题</span>
        <span class="indicator">>></span>
        <span class="current_nav_item font_red">当前标题</span>
    </p>
    <!-- 查询按钮 -->
    <div class="search_drop_down_btn"
         onclick="openShutManager(this,'drop_down_search',false,'<img src=static/img/everyclose_btn.png />','<img src=static/img/click_btn.png />')">
        <img src="static/img/everyclose_btn.png"/>
    </div>
</div>
{% endhighlight %}

[openShutManager()](#openShutManager) :打开关闭查询框；参数：( `this` , `查询框容器 id` , `是否阻止`, `显示为关闭图片元素` , `显示为打开图片元素` )；定义在 `\static\js\drop.js` .

查询框默认打开，如需设置默认关闭需修改
{% highlight html %}
  <!-- 查询按钮 -->
  <div class="search_drop_down_btn"
       onclick="openShutManager(this,'drop_down_search',false,'<img src=static/img/everyclose_btn.png />','<img src=static/img/click_btn.png />')">
      <!-- <img src="static/img/everyclose_btn.png"/> 变更为 -->
      <img src="static/img/click_btn.png"/>
  </div>
  <!-- 并将查询框设置为隐藏 -->
  <div class="popwin_header" id="popwin_header" style="display: none">
          ···
  </div>
{% endhighlight %}

<h3 id="html3">查询框</h3>

![2.png][]

{% highlight html %}
<div id="drop_down_search" class="drop_down_search_bar">
  <form action="" method="post">
    <p class="search_title_bar">
        <span class="search_title"><i></i> 查询管理</span>
    </p>
    <div class="search_box">
        
        <!-- 若干控件项 -->
        
        <!-- 查询按钮 -->
        <input class="search_btn" type="submit" value="查询"/>
        <!-- 重置按钮 -->
        <input class="reset_btn" type="button" value="重置"/>
    </div>
  </form>
</div>
{% endhighlight %}

**控件项**

* 标准输入
{% highlight html %}
  <div class="search_item">
      <label for="applicant">申请人</label>
      <input type="text" id="applicant"/>
  </div>
{% endhighlight %}
  
* 选项
{% highlight html %}
  <div class="search_item">
      <label for="state">缴纳状态</label>
      <select id="state">
          <option value="7">全部</option>
          <option value="1">未缴纳</option>
      </select>
  </div>
{% endhighlight %}
  
* 选择日期
{% highlight html %}
  <div class="search_item search_date_range">
      <label for="apply_date">提交日期</label>
      <input type="text" id="apply_date" onclick="laydate()" readonly/>
  </div>
{% endhighlight %}
  
  * 拾取时间使用 [laydate] [] 插件，若无需要可直接调用，日期控件需添加 `readonly`。
  
* 起始日期
{% highlight html %}
  <div class="search_item search_date_range">
      <label for="apply_start_date">申请日期</label>
      <input type="text" id="apply_start_date" readonly/>
  </div>
{% endhighlight %}
  
* 终止日期
{% highlight html %}
  <div class="search_item search_date_range_indicator">
      <label for="apply_end_date">-</label>
      <input type="text" id="apply_end_date" readonly/>
  </div>
{% endhighlight %}
  
  * 设置起止时间需在 **页面逻辑** 区添加以下代码，其他设置项查看 [laydate官方文档][]
{% highlight javascript %}
  /* 查询日期设置 */
  var apply_start_date = {
      elem: '#apply_start_date',
      istoday: false,   //是否显示今天
      choose: function (dates) {
          apply_end_date.min = dates; //开始日选好后，重置结束日的最小日期
          apply_end_date.start = dates; //将结束日的初始值设定为开始日
      }
  };
  var apply_end_date = {
      elem: '#apply_end_date',
      istoday: false,
      choose: function (dates) {
          apply_start_date.max = dates; //结束日选好后，重置开始日的最大日期
      }
  };
  laydate(apply_start_date);
  laydate(apply_end_date);
{% endhighlight %}

需要进行重置的控件项追加 `class="clear_item"` ，并在‘页面逻辑’ 区调用 [queryReset()](#queryReset) 即可。
{% highlight html %}
  <input type="text" id="applicant" class="clear_item"/>
{% endhighlight %}

[laydate]:http://laydate.layui.com/
[laydate官方文档]:http://www.layui.com/doc/modules/laydate.html

<h3 id="html4">通用导航条</h3>

**文字类**
![3.png][]

{% highlight html %}
<div class="nav_bar ">
  <ul class="nav_text_box">
      <li>上月公积金</li>
      <li>本月变动</li>
      <li>下月变动</li>
      <li class="hover">全部</li>
  </ul>
</div>
{% endhighlight %}

**图标类**
![33.png][]

{% highlight html %}
<div class="nav_bar ">
  <ul class="nav_icon_box">
      <li><i class="icon icon-add"></i>添加(黄底)</li>
      <li><i class="icon icon-add_blue"></i>添加(白底)</li>
      <li><i class="icon icon-add_green"></i>添加(绿底)</li>
      <li><i class="icon icon-attachment"></i>附件</li>
      <li><i class="icon icon-birth"></i>生日</li>
      <li><i class="icon icon-cancel"></i>取消</li>
      <li><i class="icon icon-delete"></i>删除</li>
      <li><i class="icon icon-download"></i>下载</li>
  </ul>
</div>
{% endhighlight %}

可用图标可查看 [图标组件](#common1)

结合使用时会为除第一个外的 `ul` 添加上边框

![333.png][]

{% highlight html %}
<div class="nav_bar ">
  <ul class="nav_icon_box">
      ···
  </ul>
  <ul class="nav_text_box">
        ···
    </ul>
</div>
{% endhighlight %}

通用导航条作为其他模块头部使用时可以在 `nav_bar` 后追加 `head` ，以将下边框及下外边距移除

<h3 id="html5">滚动导航条</h3>

![44.png][]

{% highlight html %}
<!-- 通用导航条作为头部使用 -->
<div class="nav_bar head">
    <ul class="nav_icon_box">
        <li><i class="icon icon-edit"></i>编辑</li>
        <li><i class="icon icon-email"></i>邮件</li>
        <li><i class="icon icon-home"></i>主页</li>
        <li><i class="icon icon-payment"></i>支付</li>
        <li><i class="icon icon-people"></i>人员</li>
        <li><i class="icon icon-print"></i>打印</li>
        <li><i class="icon icon-query"></i>查询</li>
        <li><i class="icon icon-right"></i>确认</li>
        <li><i class="icon icon-upload"></i>上传</li>
    </ul>
</div>
<!-- 滚动导航条-->
<div class="dept_list ">
    <div class="dept_list_box ">
        <div class="btn_box ">
            <div class="btnlf ">&lt;</div>
            <div class="btnrt ">&gt;</div>
        </div>
        <div class="dept_list_container ">
            <ul>
                <li><a href="#">xxxxxxx</a></li>
            </ul>
        </div>
    </div>
</div>
{% endhighlight %}

并在‘页面逻辑’ 区添加 [dept_scroll](#dept_scroll) 代码。

<h3 id="html6">表格</h3>

**普通表格**
![55.png][]

{% highlight html %}
<div class="table_list_box ">
    <table class="table_list_content">
        <thead>
        <tr class="table_list_title ">
            <th class="c_1">申请人</th>
            <th class="c_2">所在部门</th>
            <th class="c_3">类型</th>
            <th class="c_4">类型</th>
            <th class="c_5">申请日期</th>
            <th class="c_6">接收日期</th>
            <th class="c_7">接收日期</th>
            <th>审核状态</th>
        </tr>
        </thead>
        <tbody>
        <tr class="table_list_row ">
            <td class="c_1">XXXX</td>
            <td class="c_2">XXXX</td>
            <td class="c_3">XXXX</td>
            <td class="c_4">XXXX</td>
            <td class="c_5">XXXX</td>
            <td class="c_6">XXXX</td>
            <td class="c_7">XXXX</td>
            <td>xxxxx</td>
        </tr>
        <tfoot>
        <tr class="table_list_row ">
            <td class="c_1 font_red">总计:</td>
            <td class="c_2 ">xx</td>
            <td class="c_3 ">xx</td>
            <td class="c_4 ">xx</td>
            <td class="c_5 ">xx</td>
            <td class="c_6 ">xx</td>
            <td class="c_7 ">xx</td>
            <td>xx</td>
        </tr>
        <tr class="table_list_row ">
            <td colspan="8 ">没有任何记录!</td>
        </tr>
        </tfoot>
    </table>
    <!-- 分页 内容为虚拟数据-->
    <div class="page_down">
        <a href="#">首页</a>
        <a style="color:#fff;background:#d1d1d1;">1</a>
        <a href="#">尾页</a>
    </div>
</div>
{% endhighlight %}

*   **说明**：
*   每行最后一列 **不** 设定宽度，在设置其他列宽时需要注意留出。
*   `<thead>` 和 `<tfoot>` 中的内容始终显示，`<tbody>` 中的内容超高会进行滚动显示。
*   分页内容由 **php** 从后台传输，一般格式为`<div class="page_down"> {$pagination} </div>` ;

**多行表头式表格**

![555.png][]

*   需在 `.table_list_content` 后追加 `double` 类以设置两行表头背景正确填充

{% highlight html %}
<table class="table_list_content double">
  <thead>
  <tr class="table_list_title ">
      <th class="c_1" rowspan="2">申请人</th>
      <th class="c_2" rowspan="2">所在部门</th>
      <th colspan="2">类型</th>
      <th class="c_5">申请日期</th>
      <th class="c_6">接收日期</th>
      <th class="c_7">接收日期</th>
      <th rowspan="2">审核状态</th>
  </tr>
  <tr class="table_list_title ">
      <th class="c_3">类型</th>
      <th class="c_4">详细说明</th>
      <th colspan="3">申请日期</th>
  </tr>
  </thead>
  <!-- *** -->
</table>
{% endhighlight %}

**<tbody> 中跨行与跨列**

![5555.png][]

{% highlight html %}
<tbody>
<tr class="table_list_row ">
    <td class="c_1">XXXX</td>
    <td class="c_2">XXXX</td>
    <td class="c_3">XXXX</td>
    <td class="c_4">XXXX</td>
    <td class="c_5">XXXX</td>
    <td class="c_6">XXXX</td>
    <td class="c_7">XXXX</td>
    <td>xxxxx</td>
</tr>
<tr class="table_list_row ">
    <td class="c_1 no_rbor no_bbor"></td>
    <td class="c_2 no_rbor no_bbor"></td>
    <td class="c_3 no_bbor"></td>
    <td class="c_4">XXXX</td>
    <td class="c_5">XXXX</td>
    <td class="c_6">XXXX</td>
    <td class="c_7">XXXX</td>
    <td>xxxxx</td>
</tr>
<tr class="table_list_row ">
    <td class="c_1 no_rbor no_bbor">
        <div class="c_content">小计</div>
    </td>
    <td class="c_2 no_rbor no_bbor"></td>
    <td class="c_3 no_bbor"></td>
    <td class="c_4">XXXX</td>
    <td class="c_5">XXXX</td>
    <td class="c_6">XXXX</td>
    <td class="c_7">XXXX</td>
    <td>xxxxx</td>
</tr>
<tr class="table_list_row ">
    <td class="c_1 no_rbor"></td>
    <td class="c_2 no_rbor"></td>
    <td class="c_3"></td>
    <td class="c_4">XXXX</td>
    <td class="c_5">XXXX</td>
    <td class="c_6">XXXX</td>
    <td class="c_7">XXXX</td>
    <td>xxxxx</td>
</tr>
</tbody>
{% endhighlight %}

*   由于设计原因，`<tbody>` 中的 `<td>` 无法使用 `colspan` 和 `rowspan` ，因此所有的单元格都必须存在！
*   使用 `no_rbor` 移除 *右* 边框，`no_bbor` 移除 *下* 边框。
*   在列合并格中添加居中文字需在该行第一个单元格中添加 `<div class="c_content">文字</div>` ，并在 `页面自有样式` 处添加
  {% highlight css %}
    /*  跨列格
        width = (合并列宽度和) / 第一列宽度 
     */
    .c_content {
        width: width;  //只要比结果小就可以 (%)
        font-size: 12px;
        text-align: center;
    }
  {% endhighlight %}
  
*   `<tfoot>` 中的 `<td>` 行列合并方式与 `<tbody>` 相同；**特例**：独占一行可使用 `colspan` ！
  {% highlight html %}
    <tfoot>
    <tr class="table_list_row ">
        <td class="c_1 no_rbor">
            <div class="c_content font_red">总计</div>
        </td>
        <td class="c_2 no_rbor"></td>
        <td class="c_3"></td>
        <td class="c_4">XXXX</td>
        <td class="c_5">XXXX</td>
        <td class="c_6">XXXX</td>
        <td class="c_7">XXXX</td>
        <td>xxxxx</td>
    </tr>
    <tr class="table_list_row ">
        <td colspan="8 ">没有任何记录!</td>
    </tr>
    </tfoot>
  {% endhighlight %}
  
---

<h2 id="popup">弹窗</h2>

**结构**

{% highlight html %}
<div class="popup_win">
  <style type="text/css">
      /*弹窗自有样式*/
  </style>
  
  <div class="popwin_header" id="popwin_header">
    ...
  </div>
  <div class="popwin_body">
    ...
  </div>
  <div class="popwin_footer">
    ...
  </div>
  
  <script>
      $(function(){
          popup_window()
          /*弹窗逻辑*/
      })
  </script>
</div>
{% endhighlight %}

[popup_window()](#popup_window) ：弹窗关闭及拖动方法，参数：`关闭按钮选择器(默认.popwin_close)`，`关闭弹窗选择器(默认.popup_win)`，`拖动‘把手’id(默认popwin_header)`，除使用*页面内弹窗*，否则默认即可

`<div class="popup_win"></div>` 父元素标签已放置于以下文件中，使用时仅需在HTML文件中加入内容即可

  *   \logistics\lv_meta.html
  *   \crm\lv_meta.html
  *   \human\lv_meta.html
  *   \sale\lv_meta.html
  *   \trade\lv_meta.html
  *   \financial\lv_meta.html
  *   \salary\lv_meta.html
  *   \administration\lv_meta.html

<h3 id="popup1">头部</h3>

![7.png][]

{% highlight html %}
<div class="popwin_header" id="popwin_header">
    <img class="popwin_close" src="static/img/close_icon.jpg"/>
    <p class="popwin_breadcrumb">
        一级标题 >> 二级标题 >> 三级标题 >>
        <span class="font_red">查看</span>
        <span class="font_blue">打印</span>
        <span class="fr" onclick="popattBoxOpen(1)">附属弹窗>></span>
    </p>
</div>
{% endhighlight %}

*   `.popwin_header` 为默认弹窗拖动把手 *id* 
*   `span.fr` 会进行右浮动并且颜色为红色
*   [popattBoxOpen()](#popattBoxOpen) 为附属弹窗开启方法，参数 `n` 为打开附属弹窗的排序，最小为1。在 [附属弹窗](#popup4) 会进一步说明

<h3 id="popup2">主体</h3>

![8.png][]

主体由 *流程* 、 *模块* 、 *文本框* 三部分组成，模块显示区超高部分滚动显示。

<h4 id="popup_modular0">流程</h4>

{% highlight html %}
<div class="popwin_body">
    <div class="apply_process_box">
        <p class="ap_title">流程</p>
        <div class="ap_chart">
            <span class="ap_item ap_ends">开始</span>
            <i class="arrow_right"></i>
            <!-- 通过审核 -->
            <span class="ap_item ap_pass ">AAA</span>
            <i class="arrow_right"></i>
            <!-- 正在审核 -->
            <span class="ap_item ap_current">BBB</span>
            <i class="arrow_right"></i>
            <!-- 还未审核 -->
            <span class="ap_item">CCC</span>
            <i class="arrow_right"></i>
            <span class="ap_item ap_ends">结束</span>
        </div>
    </div>
    <!-- 模块 -->
    <!-- 文本框 -->
</div>
{% endhighlight %}

  *   开始与结束需添加 `ap_ends`
  *   已审核需添加 `ap_pass`
  *   当前审核需添加 `ap_current`
  *   未审核为默认样式
  *   实际开发中通常写为
    {% highlight html %}
      <span class="ap_item ap_ends">开始</span>
      <i class="arrow_right"></i>
      {foreach from=$workflow item=v key=k}
      <span class="ap_item
      {if }
      ap_pass
      {elseif }
      ap_current
      {/if}">{$v[1][name]}</span>
      <i class="arrow_right"></i>
      {/foreach}
      <span class="ap_item ap_ends">结束</span>
    {% endhighlight %}

**模块**
{% highlight html%}
<div class="popwin_body">
  <!-- 流程 -->
  <div class="popwin_content scroll_bar">
    <!-- 各个模块 -->
  </div>
  <!-- 文本框 -->
</div>
{% endhighlight %}

<h5 id="popup_modular1">标题</h5>

{% highlight html%}
<div class="content_box">
  <h1>标题</h1>
</div>
{% endhighlight %}


<h5 id="popup_modular2">栅格</h5>

> 栅格系统参考自 [jQuery Mobile](http://demos.jquerymobile.com/1.4.5/grids/) 以及 [bootstrap](http://v3.bootcss.com/css/#grid)
>
>
> 栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。

{% highlight html%}
<div class="content_box">
  <!-- 栅格系统 -->
</div>
{% endhighlight %}

*简介*

1. 每行中放置多少列取决于父容器的 `class` ：`row-a/b/c/d/e` ；每个 `row-*` 都独占一行，宽度为100%

2. 确定父容器 `class` 后再确定子容器的 `class` ：`col-a/b/c/d/e`。

3. 不同父容器 `class` 下的子容器 `class` 宽度不定，比如在 `row-a` 下 `col-a` 的子容器宽度为100%，而在 `row-b` 下 `col-a` 的子容器宽度则为50%，`row-c` 下 `col-a` 的子容器宽度则为33.33%，以此类推。

4. 允许混合栅格，即允许仅设置*一次*父容器 `class` ，之后子容器全部放在这一个父容器中。例如设置父容器 `row-c` ，填充4个子容器 `class='col-a'` ，那么前三个子容器会在一行平均分配，最后一个子容器会另起一行并处在首位。

5. 子容器允许跨列，例如在父容器 `row-c` 下，子容器 `col-b` ，则该列宽度为66.66%， 子容器 `col-c` ，则该列宽度为100%，效果与 `row-a` 下的 `col-a` 效果相同

6. 子容器宽度级别最高为父元素允许级别，即 `row-a` 下只能存在 `col-a` ， `row-b` 下可存在 `col-a` 和 `col-b` ， 以此类推 `row-e` 可存在 `col-a` /`col-b` /`col-c` /`col-d` /`col-e`。 

*  单列栅格
    要建立一个单列(100%)布局，首先使用容器 `class` 中 `row-a` ，并添加一个子容器 `col-a`
    {% highlight html%}
      <div class="row-a">
        <div class="col-a"></div>
      </div>
    {% endhighlight %}
    
*  双列栅格
    要建立一个双列(50/50%)布局，首先使用容器 `class` 中 `row-b` ，并添加两个子容器 `col-a` ， 也可存在 `col-b`
    {% highlight html%}
      <div class="row-b">
        <div class="col-a"></div>
        <div class="col-a"></div>
      </div>
    {% endhighlight %}
    
*  三列栅格
    要建立一个三列(33/33/33%)布局，首先使用容器 `class` 中 `row-c` ，并添加三个子容器 `col-a` ，也可存在 `col-b/c`
    {% highlight html%}
      <div class="row-c">
        <div class="col-a"></div>
        <div class="col-a"></div>
        <div class="col-a"></div>
      </div>
    {% endhighlight %}
    
*  四列栅格
    要建立一个四列(25/25/25/25%)布局，首先使用容器 `class` 中 `row-d` ，并添加四个子容器 `col-a` ，也可存在 `col-b/c/d`
     {% highlight html%}
       <div class="row-d">
         <div class="col-a"></div>
         <div class="col-a"></div>
         <div class="col-a"></div>
         <div class="col-a"></div>
       </div>
     {% endhighlight %}
     
*  五列栅格
    要建立一个五列(20/20/20/20/20%)布局，首先使用容器 `class` 中 `row-e` ，并添加五个子容器 `col-a` ，也可存在 `col-b/c/d/e`
    {% highlight html%}
      <div class="row-e">
        <div class="col-a"></div>
        <div class="col-a"></div>
        <div class="col-a"></div>
        <div class="col-a"></div>
        <div class="col-a"></div>
      </div>
    {% endhighlight %}
    
*  混合栅格
    * 子容器中通常使用表单空间来填充数据，因此也对其进行样式规范
    * 标准格式为 `<label>` + 控件项  
    * 只读或禁用控件需添加 `readonly` 或 `disabled` 属性(显示效果相同)
    * 显示日期需添加 `class='input_date'` ， 拾取时间还需添加 `onclick='laydate()'` ，起止时间限制可参考 [查询框](#html3)
    * 若是使用 `fieldset > textarea` ，那么设置禁用时需同时两者的 `readonly/disabled`
    
    ![10.png][]
{% highlight html%}
<div class="content_box">
    <h2>基本信息</h2>
    <div class="row-c">
        <div class="col-a">
            <label>输入</label>
            <input type="text" value="AAA" readonly/>
        </div>
        <div class="col-a">
            <label>选项</label>
            <select disabled>
                <option value="A">AAA</option>
            </select>
        </div>
        <div class="col-a">
            <label>日期</label>
            <input type="text" value="AAAA" readonly 
              onclick="laydate()" class="input_date"/>
        </div>
        <div class="col-c">
            <label>原因</label>
            <textarea readonly>AAA</textarea>
        </div>
        <fieldset readonly>
            <legend>说明</legend>
            <textarea readonly>AAA</textarea>
            <!-- 如果内容自带样式(公告，工作总结等) 则将 <textarea> 替换成<div> 
              <fieldset> 不设置 readonly/disabled-->
            <div class="nContent">AAA</div>
        </fieldset>
    </div>
</div>
{% endhighlight %}

<h5 id="popup_modular3">附件</h5>
![11.png][]

  * `iframe` 若 `id="picsubmit"` 可不写 `class="picsubmit"` ，`ul` 同理； 

{% highlight html%}
<div class="content_box">
    <h2>附件
      <iframe id="picsubmit" class="picsubmit" scrolling="no" allowtransparency="true" src="upload.php?showid=att_list&inputid=pics&picsubmit=picsubmit&ac=2&w=120h=100" {if $check}style="display:none" {/if}></iframe>
      <input type="hidden" id="pics" value=""/>
    </h2>
    <ul id="att_list" class="att_list">
        <!--图片-->
        <li>
            <img src=""{$v[0]}"" onclick="imgMagnify('{$v[0]}')"/>
            <a href="javascript:window.parent.window.document.getElementById('picsubmit').contentWindow.delpic('{$v[0]}')">删除</a>
        </li>
        <!--文件-->
        <li>
            <a target="_blank" href="{$v[0]}" class="att_file" download>
                <img src="static/img/load.jpg"/>
            </a>
            <a href="javascript:window.parent.window.document.getElementById('picsubmit').contentWindow.delpic('{$v[0]}')">删除</a>
        </li>
        <!--无图-->
        <li>
            <img src="uploadfile/nopic.jpg" alt="暂无图片"/>
        </li>
    </ul>
</div>
{% endhighlight %}

[imgMangnify()](#imgMangnify) ：在新窗口查看大图，参数为 `图片路径`

`att_file`：区分`<a>` 是删除按钮还是文件链接

<h5 id="popup_modular4">表格</h5>
![12.png][]

固定表头式

{% highlight html%}
<div class="content_box">
    <h2>货物明细</h2>
    <div class="table_box">
        <!-- 表头固定 -->
        <div class="table_header">
            <table>
                <tr>
                    <th width="10%">序号</th>
                    <th width="10%">产品名称</th>
                    <th width="10%">产品规格</th>
                    <th>备注</th>
                </tr>
            </table>
        </div>
        <!-- 主体定高超高滚动 -->
        <div class="table_content scroll_bar">
            <table>
                <tr>
                    <td width="10%">AAA</td>
                    <td width="10%">AAA</td>
                    <td width="10%">AAA</td>
                    <td>AAA</td>
                </tr>
                <tr>
                    <td width="10%" class="font_red">总计</td>
                    <td width="10%">AAA</td>
                    <td width="10%">AAA</td>
                    <td>AAA</td>
                </tr>
            </table>
        </div>
    </div>
</div>
{% endhighlight %}

若仅需要普通表格可将 `table_box` 改为 `table_box_common` 即可
{% highlight html%}
<div class="content_box">
    <h2>货物明细</h2>
    <div class="table_box_common">
        <table>
          <!-- ··· -->
        </table>
    </div>
</div>
{% endhighlight %}


<h5 id="popup_modular5">审核历史</h5>
![13.png][]

{% highlight html%}
<div class="content_box">
    <h2>审核流程</h2>
    <table class="process_box">
        <thead>
        <tr>
            <th width="10%">用户</th>
            <th width="40%">操作</th>
            <th width="20%">审核状态</th>
            <th width="30%">处理时间</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>AAA</td>
            <td>AAA</td>
            <td>AAA</td>
            <td>AAA</td>
        </tr>
        </tbody>
    </table>
</div>
{% endhighlight %}


**文本框**

{% highlight html%}
<div class="popwin_body">
  <!-- 流程 -->
  <!-- 模块 -->
  <div class="opinion_box">
      <textarea placeholder="请填写意见"></textarea>
  </div>
</div>
{% endhighlight %}

<h3 id="popup3">尾部</h3>

{% highlight html %}
<div class="popwin_footer">
    <input type="button" value="关闭" class="popwin_close">
    <input type="button" value="提交" class="fr"/>
    <input type="button" value="取回" class="fr" onclick="newtakeback(this)" 
      data-id="" data-apply="" data-state="" data-op="" data-sys=''>
    <select class="assign_person">
        <option value="1">AAA</option>
    </select>
    <input type="button" value="驳回" class="reject_file">
</div>
{% endhighlight %}

[newtakeback()](#newtakeback) ： 审核驳回方法，所在标签需要以下自定属性：`id` ：记录id,`apply` ：申请子页面,`state` ：当前步骤,`op` ：功能简写,`sys（默认administration）` ：申请主页面,

<h3 id="popup4">附属</h3>

{% highlight html %}
<div class="popwin_attach">
    <!--该弹窗目前排位第 1-->
    <div class="popatt_box">
        <p class="popatt_header">
            <img class="popatt_close" onclick="popattBoxClose(this)" 
              src="static/img/close_icon.jpg"/>
            资产申购
        </p>
        <div class="popatt_body">
            <table>
                <thead>
                <tr>
                    <th width="20%">编号</th>
                    <th width="50%">资产名称</th>
                    <th width="10%">数量</th>
                    <th width="20%">估价</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>AAA</td>
                    <td>AAA</td>
                    <td>AAA</td>
                    <td>AAA</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!--该弹窗目前排位第 2-->
    <div class="popatt_box"></div>
    ...
</div>
{% endhighlight %}

[popattBoxClose()](#popattBoxClose)：附属弹窗关闭方法，参数：`this`

<h3 id="popup5">页面内弹窗</h3>

如果弹窗内容是写在列表页面的话（申请弹窗），你需要在 [页面自有弹窗处](#html1) 这样写：

{% highlight html%}
<div class="popup_apply" style="display: none;">
  <style type="text/css">
      /*弹窗自有样式*/
  </style>
  
  <div class="popwin_header" id="popapp_header">
    <img class="popapp_close" src="/assets/table-demo/img/close_icon.jpg"/>
    ...
  </div>
  <div class="popwin_body">
    ...
  </div>
  <div class="popwin_footer">
    <input type="button" value="关闭" class="popapp_close" readonly>
    ...
  </div>
  
  <script>
      $(function(){
          popup_window('.popapp_close','.popup_apply','popapp_header');
          /*弹窗逻辑*/
      })
  </script>
</div>
{% endhighlight %}



---

<h2 id="js">交互js</h2>

<h3 id="js1">页面js</h3>

点击行查看详情
{% highlight javascript %}
    $('tbody .table_list_row').click(function () {
        var id = $(this).data("id");
        $.ajax({
            type: 'post',
            url: '',
            data:{
              id:id,
            },
            success: function(data) {
                $('.popup_win').html(data).show();
            }
        });
    });
{% endhighlight %}

<span id='openShutManager'></span>查询框 - 打开关闭
{% highlight javascript %}    
    function openShutManager(oSourceObj, oTargetObj, shutAble, oOpenTip, oShutTip) {
        var sourceObj = typeof oSourceObj == "string" ? document.getElementById(oSourceObj) : oSourceObj;
        var targetObj = typeof oTargetObj == "string" ? document.getElementById(oTargetObj) : oTargetObj;
        var openTip = oOpenTip || "";
        var shutTip = oShutTip || "";
        if (targetObj.style.display != "none") {
            if (shutAble) return;
            targetObj.style.display = "none";
            if (openTip && shutTip) {
                sourceObj.innerHTML = shutTip;
            }
        } else {
            targetObj.style.display = "block";
            if (openTip && shutTip) {
                sourceObj.innerHTML = openTip;
            }
        }
    }
{% endhighlight %}

<span id='dept_scroll'></span>部门列表滚动
{% highlight javascript %}
    $(".btn_box ").on("click ", function (e) {
        var $scrollBox = $(".dept_list_container ");
        var scrollLeft = $scrollBox.scrollLeft();
        if (e.target.className == "btnlf ") {
            $scrollBox.scrollLeft(scrollLeft - 103);
            return false;
        }
        if (e.target.className == "btnrt ") {
            $scrollBox.scrollLeft(scrollLeft + 103);
            return false;
        }
    });
{% endhighlight %}

全选
{% highlight javascript %}
    $('input[name=allUser]').click(function () {
        if (this.checked) {
            $('input[type=checkbox]').each(function () {
                this.checked = true;
            });
        } else {
            $('input[type=checkbox]').each(function () {
                this.checked = false;
            });
        }
    }); 
{% endhighlight %}

<span id='queryReset'></span>重置
{% highlight javascript %}
    function queryReset(){
        $('.reset_btn').click(function() {
            $('input.clear_item').val('');
            $('select.clear_item option:first-child').attr('selected',true);
        });
    }
    
{% endhighlight %}


<h3 id="js2">弹窗js</h3>

<span id='popup_window'></span>弹窗拖动与关闭
{% highlight javascript %}
    function popup_window(btn,box,handlerId) {
        if(!btn){btn = '.popwin_close'}
        if(!box){box = '.popup_win'}
        if(!handlerId){handlerId = 'popwin_header'}
        // 关闭按钮
        $(btn).click(function () {
            $(box).hide().removeClass('pw_s pw_l pw_xl').css('margin-right',0);
        });
        // 拖动
        $(box).easydrag().setHandler(handlerId);
    }
{% endhighlight %}

<span id='popattBoxClose'></span>附属弹窗关闭
{% highlight javascript %}    
    function  popattBoxClose(e){
        $(e).parents('div.popatt_box').hide();
        if(!($('.popwin_attach .popatt_box').is(':visible'))){
            $('.popup_win').css('margin-right','0');
        }
    }
{% endhighlight %}

<span id='popattBoxOpen'></span>附属弹窗打开
{% highlight javascript %}
    function popattBoxOpen(n){
        if(!isNaN(n) || n < 1){
            alert('请正确传入popattBoxOpen()参数！');
            return false;
        }
        n = parseInt(n) - 1;
        $('.popup_win').css('margin-right','533px');
        $('div.popup_win div.popatt_box').eq(n).show();
    }
{% endhighlight %}

<span id='imgMagnify'></span>查看图片
{% highlight javascript %}    
    function imgMagnify(imgUrl) {
        window.open('index.php?sys=administration&mod=imgmagnify&imgUrl=' + imgUrl, '', 'dialogWidth=800px;dialogHeight=500px;status=no;help=no;scrollbars=no');
    }
{% endhighlight %}

<span id='newtakeback'></span>取回
{% highlight javascript %}    
    function newtakeback(data){
    	var nId = $(data).attr("data-id");	
    	var state = $(data).attr("data-state");	
    	var apply = $(data).attr("data-apply");	
    	var op = $(data).attr("data-op");	
    	var sys = $(data).attr("data-sys");

    	if(!sys){
    	   sys = 'administration';
        }
    	$.ajax({
    		type:"post",
    		url:"index.php?sys=administration&mod=takeback&op="+op,
    		data: {				
    			nid: nId,
    			state:state
    		},
    		success: function(data){
    			if(data){
    				alert(data);
    				return false;
    			}else{
    				if(state == 2){
    					location.href="index.php?sys="+sys+"&mod="+apply;
    				}else{
    					if(op=='td'){
    						location.href='index.php?sys=logistics&mod=export/ex_upcoming';
    						return false;
    					}
              $.cookie('selmenu','navContent80');
              location.href="index.php?sys=administration&mod=undoto";
    				}
    			}
    		}
    	});	
    }
{% endhighlight %}


[1.png]:/assets/img/2017-02-08-erp-commonpage/1.png
[2.png]:/assets/img/2017-02-08-erp-commonpage/2.png
[33.png]:/assets/img/2017-02-08-erp-commonpage/33.png
[333.png]:/assets/img/2017-02-08-erp-commonpage/333.png
[3.png]:/assets/img/2017-02-08-erp-commonpage/3.png
[44.png]:/assets/img/2017-02-08-erp-commonpage/44.png
[5.png]:/assets/img/2017-02-08-erp-commonpage/5.png
[55.png]:/assets/img/2017-02-08-erp-commonpage/55.png
[555.png]:/assets/img/2017-02-08-erp-commonpage/555.png
[5555.png]:/assets/img/2017-02-08-erp-commonpage/5555.png
[6.png]:/assets/img/2017-02-08-erp-commonpage/6.png
[7.png]:/assets/img/2017-02-08-erp-commonpage/7.png
[8.png]:/assets/img/2017-02-08-erp-commonpage/8.png
[9.png]:/assets/img/2017-02-08-erp-commonpage/9.png
[10.png]:/assets/img/2017-02-08-erp-commonpage/10.png
[11.png]:/assets/img/2017-02-08-erp-commonpage/11.png
[12.png]:/assets/img/2017-02-08-erp-commonpage/12.png
[13.png]:/assets/img/2017-02-08-erp-commonpage/13.png
[14.png]:/assets/img/2017-02-08-erp-commonpage/14.png
[15.png]:/assets/img/2017-02-08-erp-commonpage/15.png
[16.png]:/assets/img/2017-02-08-erp-commonpage/16.png


