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
table td:nth-child(odd){
    color: #0099CC !important
}
</style>

**注意：**这份文件是用 Markdown 写的，你可以[看看它的原始文件][src] 。

*   预览 [完全效果](/table-show)
*   下载 <a href="/assets/table-demo/table-common.html" target="_blank" download>页面模版</a>
*   下载 <a href="/assets/table-demo/table-popup.html" target="_blank" download>弹窗模版</a>

[src]: https://github.com/GiantZero-x/GiantZero-x.github.io/blob/master/_posts/document/2017-02-08-erp-commonpage.md


1.  [前言](#introduction)
1.  [通用组件](#common)
    *   [图标](#common1)
1.  [页面模块](#html)
    *   [结构](#html1)
    *   [头部](#html2)
    *   [查询框](#html3)
    *   [分类导航](#html4)
    *   [部门导航](#html5)
    *   [表格头部](#html6)
    *   [表格主体](#html7)
    *   [分页](#html8)
    *   [页面内弹窗](#html9)
1.  [弹窗](#popup)
    *   [头部](#popup1)
    *   [主体](#popup2)
    *   [尾部](#popup3)
    *   [附属](#popup4)
1.  [交互逻辑](#js)
    *   [页面逻辑](#js1)
    *   [弹窗逻辑](#js2)
    *   [通用逻辑](#js3)

---

<h2 id="introduction">前言</h2>

*  此样式组件结构适用于 **商翔集团ERP(PC端)** 中固定表头式表格页面及所有弹窗页面。
*  页面样式及通用组件文件 `table-common.css` 以及弹窗样式文件 `table-popup.css` 已加载至 `\templates\home\index.html` ；但在项目初始阶段没有进行样式重置,因此部分页面需单独引入 `static\css\reset.css` 进行样式重置。
*  为充分进行样式复用，页面显示效果仅与标签 `class` 有关；但因涉及到部分js交互效果，以下特定标签 `id` 已被限定。

查询框主体
{% highlight html %}
    <div id="drop_down_search" class="drop_down_search_bar">
        ···
    </div>
{% endhighlight %}

弹窗头部
{% highlight html %}
    <div class="popwin_header" id="popwin_header">
        ···
    </div>
{% endhighlight %}

*  若在使用中有任何疑问或bug可随时联系我进行修改.

---

<h2 id="common">通用组件</h2>

<h3 id="common1">图标</h3>

出于性能的考虑，所有图标都需要一个基类和对应每个图标的类。例如添加按钮：<img src="/assets/icon/add.png" style="display:inline-block;margin-bottom:0;">
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

---

<h2 id="html">页面模块</h2>

<h3 id="html1">结构</h3>

HTML文件内代码分为三个部分：CSS，HTML和Javascript
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
        <a class="current_nav_item" href="index.php?sys=human">一级标题</a>
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

`openShutManager()` :打开关闭查询框；参数：( `this` , `查询框容器 id` , `显示为关闭图片元素` , `显示为打开图片元素` )；定义在 `\static\js\drop.js` .

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
        <input class="search_btn" type="submit" value="查询" readonly/>
        <!-- 重置按钮 -->
        <input class="reset_btn" type="button" value="重置" readonly/>
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
  
  * 拾取时间使用 [laydate] [] 插件，若无需要可直接调用。
  
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
  
  * 设置起止时间需在 ‘页面逻辑’ 区添加以下代码，其他设置项查看 [laydate官方文档][]
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

需要进行重置的控件项追加 `class="clear_item"` ，重置逻辑定义在‘页面逻辑’ 区。
{% highlight html %}
  <input type="text" id="applicant" class="clear_item"/>
{% endhighlight %}

{% highlight js %}
  // 重置
  $('.reset_btn').click(function() {
      $('input.clear_item').val('');
  });
{% endhighlight %}

[laydate]:http://laydate.layui.com/
[laydate官方文档]:http://www.layui.com/doc/modules/laydate.html

<h3 id="html4">分类导航</h3>

![3.png][]

{% highlight html %}
<div class="select_box ">
    <ul>
        <li>
            <a href=" ">上月公积金</a>
        </li>
        <li>
            <a href=" ">本月变动</a>
        </li>
        <li>
            <a href=" ">下月变动</a>
        </li>
        <li>
            <a href=" " class="hover">全部</a>
        </li>
        <li class="job_modify fr ">
            <a href="#">修改</a>
        </li>
    </ul>
</div>
{% endhighlight %}
<h3 id="html5">部门导航</h3>

![4.png][]

{% highlight html %}
<div class="dept_list ">
    <div class="dept_list_title ">
        <ul>
            <li class="dept_save ">
                <a href="#">修改</a>
            </li>
        </ul>
    </div>
    <!-- 左右按钮点击事件可直接复制 -->
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

<h3 id="html6">表格头部</h3>

![5.png][]

{% highlight html %}
<div class="table_list_box ">
    <div class="table_list_header ">
        <ul>
            <li class="header_item update"><span>更新</span></li>
            <li class="header_item export"><span>导出</span></li>
            <li class="header_item edit"><span>编辑</span></li>
            <li class="header_item delete"><span>删除</span></li>
            <!-- 使用js绑定点击<a> 触发input点击事件 -->
            <li class="header_item upload">
                <form method="post" action="" enctype="multipart/form-data">
                    <a id="load1">导入</a>
                    <input type="file" name="cus_file"/>
                </form>
            </li>
            <li class="header_item download">
                <a href="#">下载</a>
            </li>
            <li class="header_item apply"><span>应用</span></li>
        </ul>
    </div>
    
    <!-- 表格主体-->
    
    <!-- 分页 -->
</div>
{% endhighlight %}

<h3 id="html7">表格主体</h3>

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
  <!-- <tbody> 中的每一个单元格都不能合并,因此需要合并的单元格只能通过设置右(no_rbor)或下(no_bbor)边框为none视觉上进行合并,需要在合并格中显示字的放在当前行第一列中的div.c_content中 -->
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
      <td class="c_1 no_rbor no_bbor"><div class="c_content">小计</div></td>
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
  <tfoot>
  <tr class="table_list_row ">
      <td class="c_1 font_red">总计:</td>
      <td class="c_2 ">xx</td>
      <td class="c_3 ">xx</td>
      <td class="c_4 ">xx</td>
      <td class="c_5 ">xx</td>
      <td>xx</td>
  </tr>
  <tr class="table_list_row ">
      <td colspan="8 ">没有任何记录!</td>
  </tr>
  </tfoot>
</table>
{% endhighlight %}

<h3 id="html8">分页</h3>

![1.png][]

{% highlight html %}
<div class="page_down">
    <a href="?sys=administration&amp;mod=havedo&amp;keyword=&amp;apply_start_date=&amp;apply_end_date=&amp;op=mpsq&amp;rowsall=4&amp;page=1">首页</a>
    <a style="color:#fff;background:#d1d1d1;">1</a>
    <a href="?sys=administration&amp;mod=havedo&amp;keyword=&amp;apply_start_date=&amp;apply_end_date=&amp;op=mpsq&amp;rowsall=4&amp;page=1">尾页</a>
</div>
{% endhighlight %}

<h3 id="html9">页面内弹窗</h3>

---

<h2 id="popup">弹窗</h2>

![1.png][]

结构

{% highlight html %}
  <style type="text/css">
      /*弹窗自有样式*/
  </style>
  
  <div class="popup_win">
    <!-- 头部 -->
    <!-- 主体 -->
    <!-- 尾部 -->
  <div>
  
  <script>
      $(function(){
          popup_window()
          /*弹窗逻辑*/
      })
  </script>
{% endhighlight %}

<h3 id="popup1">头部</h3>

{% highlight html %}
<div class="popwin_header" id="popwin_header">
    <img class="popwin_close" src="static/img/close_icon.jpg"/>
    <p class="popwin_breadcrumb">
        行政事务 >> 二 >> 三 >>
        <span class="font_red">查看</span>
        <span class="font_bule" id="print">打印</span>
        <!-- poppattBoxOpen() 传参数字为该弹窗在 '.popwin_attach'中的排序-->
        <!-- 此处 span.fr 自动右浮动,红色字 -->
        <span class="fr" onclick="popattBoxOpen(1)">资产申购>></span>
    </p>
</div>
{% endhighlight %}

<h3 id="popup2">主体</h3>

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
    <div class="popwin_content scroll_bar">
        <div class="content_box">
            <h1>标题</h1>
        </div>
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
                    <input type="text" value="AAAA" readonly onclick="laydate()" class="input_date"/>
                </div>
                <div class="col-c">
                    <label>原因</label>
                    <textarea readonly>AAA</textarea>
                </div>
                <fieldset readonly>
                    <legend>说明</legend>
                    <textarea readonly>AAA</textarea>
                </fieldset>
            </div>
        </div>
        <div class="content_box">
            <h2>附件</h2>
            <ul id="att_list">
                <!--图片-->
                <li>
                    <img src="uploadfile/nopic.jpg" onclick="imgMagnify($(this).attr('src'))"/>
                    <a href="javascript:window.parent.window.document.getElementById('picsubmit').contentWindow.delpic('{$v[0]}')">删除</a>
                </li>
                <!--文件-->
                <li>
                    <a target="_blank" href="{$v[0]}" class="att_file">
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
        <div class="content_box">
            <h2>货物明细</h2>
            <!-- 表头固定 -->
            <div class="table_box">
                <div class="table_header">
                    <table>
                        <tr>
                            <th width="10%">序号</th>
                            <th width="10%">产品名称</th>
                            <th width="10%">产品规格</th>
                            <th width="10%">箱规</th>
                            <th width="10%">数量/箱</th>
                            <th width="10%">单价/元</th>
                            <th width="10%">总金额/元</th>
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
                            <td width="10%">AAA</td>
                            <td width="10%">AAA</td>
                            <td width="10%">AAA</td>
                            <td width="10%">AAA</td>
                            <td>AAA</td>
                        </tr>
                        <td width="10%" class="font_red">总计</td>
                        <td width="10%">AAA</td>
                        <td width="10%">AAA</td>
                        <td width="10%">AAA</td>
                        <td width="10%">AAA</td>
                        <td width="10%">AAA</td>
                        <td width="10%">AAA</td>
                        <td>AAA</td>
                    </table>
                </div>
            </div>
        </div>
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
    </div>
    <div class="opinion_box">
        <textarea name="opinion" id="opinion" placeholder="请填写意见"></textarea>
    </div>
</div>
{% endhighlight %}

<h3 id="popup3">尾部</h3>

{% highlight html %}
<div class="popwin_footer">
    <input type="button" value="关闭" class="popwin_close" readonly>
    <input type="button" value="提交" class="fr"/>
    <input type="button" value="取回" class="fr" onclick="newtakeback(this)" data-id="{$apply.yc_id}"
           data-apply="contractManage" data-state="{$apply.sc_state}" data-op="sc" data-sys='administration'>
    <select class="assign_person">
        <option value="1">张嘉望</option>
    </select>
    <input type="button" value="驳回" class="reject_file">
</div>
{% endhighlight %}

<h3 id="popup4">附属</h3>

{% highlight html %}
<div class="popwin_attach">
    <!--资产申购 该弹窗目前排位第 1-->
    <div class="popatt_box">
        <p class="popatt_header">
            <img class="popatt_close" onclick="popattBoxClose(this)" src="static/img/close_icon.jpg"/>
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
</div>
{% endhighlight %}
---

<h2 id="js">交互逻辑</h2>

<h3 id="js1">页面逻辑</h3>

{% highlight javascript %}
/* 点击行查看详情 */
    $('tbody .table_list_row').click(function () {
        $('.popup_win').show();
    });
    
/* 查询 - 打开关闭 */
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

/* 部门列表滚动*/
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

/* 全选 */
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

/* 重置 */
    $('.reset_btn').click(function() {
        $('input.clear_item').val('');
    });

/* 导入 */
    $('#load').click(function () {
        $(this).next().trigger('click');
    });
    
{% endhighlight %}


<h3 id="js2">弹窗逻辑</h3>

{% highlight javascript %}
/* 弹窗拖动与关闭 */
    function popup_window(btn,box,handlerId) {
        if(!btn){btn = '.popwin_close'}
        if(!box){box = '.popup_win'}
        if(!handlerId){handlerId = 'popwin_header'}
        // 关闭按钮
        $(btn).click(function () {
            $(box).hide().removeClass('pw_s pw_l pw_xl').css('margin-right',0).html('');
        });
        // 拖动
        $(box).easydrag().setHandler(handlerId);
    }
    
/* 附属弹窗关闭 */
    function  popattBoxClose(e){
        $(e).parents('div.popatt_box').hide();
        if(!($('.popwin_attach .popatt_box').is(':visible'))){
            $('.popup_win').css('margin-right','0');
        }
    }

/* 附属弹窗打开 */
    function popattBoxOpen(n){
        n = parseInt(n) - 1;
        $('.popup_win').css('margin-right','533px');
        $('div.popup_win div.popatt_box').eq(n).show();
    }   
{% endhighlight %}

<h3 id="js3">通用逻辑</h3>

{% highlight javascript %}
/* 查看图片 */
    function imgMagnify(imgUrl) {
        window.open('index.php?sys=administration&mod=imgmagnify&imgUrl=' + imgUrl, '', 'dialogWidth=800px;dialogHeight=500px;status=no;help=no;scrollbars=no');
    }
    
/* 取回 */
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
[3.png]:/assets/img/2017-02-08-erp-commonpage/3.png
[4.png]:/assets/img/2017-02-08-erp-commonpage/4.png
[5.png]:/assets/img/2017-02-08-erp-commonpage/5.png
[6.png]:/assets/img/2017-02-08-erp-commonpage/6.png
[7.png]:/assets/img/2017-02-08-erp-commonpage/7.png
[8.png]:/assets/img/2017-02-08-erp-commonpage/8.png
[9.png]:/assets/img/2017-02-08-erp-commonpage/9.png
[10.png]:/assets/img/2017-02-08-erp-commonpage/10.png
[11.png]:/assets/img/2017-02-08-erp-commonpage/1.1png
[12.png]:/assets/img/2017-02-08-erp-commonpage/1.p2ng
[13.png]:/assets/img/2017-02-08-erp-commonpage/1.pn3g
[14.png]:/assets/img/2017-02-08-erp-commonpage/1.pn4g
[15.png]:/assets/img/2017-02-08-erp-commonpage/1.pn5g
[16.png]:/assets/img/2017-02-08-erp-commonpage/1.pn6g


