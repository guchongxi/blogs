/**
 * Created by 顾重 on 2017/2/13.
 */

/* 对象参数
    elem	string	    指定元素的选择器
    skin	string	    风格定义
    click	Function	点击节点的回调，详细介绍见下文
    href	string	    节点链接（可选），未设则不会跳转
    target	string	    节点打开方式（即a的target值），必须href设定后才有效
    nodes	object	    节点数据，详细格式见下表
*/

/* 节点数据格式
    name	string	    节点名称
    spread	boolean	    是否展开状态（默认false）
    href	string	    节点链接（可选），未设则不会跳转
    children	object  同nodes节点，可无限延伸
    自定义参数	-	除了上述必要键外，你还可以给每条节点传入自定义参数，如：alias、id等。那么在触发click回调时，就会把节点所拥有的参数都返回给你。
*/

var tree = null;

$(function () {
    var Tree = function (options) {
            this.options = options;
        },
        //图标
        icon = {
            arrow: ['&#xe623;', '&#xe625;'] //箭头
            , checkbox: ['&#xe626;', '&#xe627;'] //复选框
            , radio: ['&#xe62b;', '&#xe62a;'] //单选框
            , branch: ['&#xe622;', '&#xe624;'] //父节点
            , leaf: '&#xe621;' //叶节点
        },
        enterSkin = 'tree-enter';
    //初始化
    Tree.prototype.init = function (elem) {
        var that = this;
        elem.addClass('tree-box'); //添加tree样式
        if (that.options.skin) {
            elem.addClass('tree-skin-' + that.options.skin);
        }
        that.tree(elem);
        that.on(elem);
    };

    //树节点解析
    Tree.prototype.tree = function (elem, children) {
        var that = this,
            options = that.options;
        var nodes = children || options.nodes;

        $.each(nodes, function (index, item) {
            var hasChild = item.children && item.children.length > 0;
            var ul = $('<ul class="' + (item.spread ? "tree-show" : "") + '"></ul>');
            var li = $(['<li ' + (item.spread ? 'data-spread="' + item.spread + '"' : '') + '>'
                //展开箭头
                , function () {
                    return hasChild ? '<i class="tree-icon tree-spread">' + (
                        item.spread ? icon.arrow[1] : icon.arrow[0]
                    ) + '</i>' : '';
                }()

                //复选框/单选框
                , function () {
                    return options.check ? (
                        '<i class="tree-icon tree-check">' + (
                            options.check === 'checkbox' ? icon.checkbox[0] : (
                                options.check === 'radio' ? icon.radio[0] : ''
                            )
                        ) + '</i>'
                    ) : '';
                }()

                //节点
                , function () {
                    return '<a href="' + (item.href || 'javascript:;') + '" ' + (
                            options.target && item.href ? 'target=\"' + options.target + '\"' : ''
                        ) + '>'
                        + ('<i class="tree-icon tree-' + (hasChild ? "branch" : "leaf") + '">' + (
                            hasChild ? (
                                item.spread ? icon.branch[1] : icon.branch[0]
                            ) : icon.leaf
                        ) + '</i>') //节点图标
                        + ('<cite>' + (item.name || '未命名') + '</cite></a>');
                }()

                , '</li>'].join(''));

            //如果有子节点，则递归继续生成树
            if (hasChild) {
                li.append(ul);
                that.tree(ul, item.children);
            }

            elem.append(li);

            //触发点击节点回调
            typeof options.click === 'function' && that.click(li, item);

            //伸展节点
            that.spread(li, item);

            //拖拽节点
            options.drag && that.drag(li, item);
        });
    };

    //点击节点回调
    Tree.prototype.click = function (elem, item) {
        var that = this, options = that.options;
        elem.children('a').on('click', function (e) {
            e.stopPropagation();
            options.click(item)
        });
    };

    //伸展节点
    Tree.prototype.spread = function (elem, item) {
        var that = this, options = that.options;
        var arrow = elem.children('.tree-spread');
        var ul = elem.children('ul'), a = elem.children('a');

        //执行伸展
        var open = function () {
            if (elem.data('spread')) {
                elem.data('spread', null);
                ul.removeClass('tree-show');
                arrow.html(icon.arrow[0]);
                a.find('.tree-icon').html(icon.branch[0]);
            } else {
                elem.data('spread', true);
                ul.addClass('tree-show');
                arrow.html(icon.arrow[1]);
                a.find('.tree-icon').html(icon.branch[1]);
            }
        };

        //如果没有子节点，则不执行
        if (!ul[0]) return;

        arrow.on('click', open);
        a.on('dblclick', open);
    };

    //通用事件
    Tree.prototype.on = function (elem) {
        var that = this, options = that.options;
        var dragStr = 'tree-drag';

        //屏蔽选中文字
        elem.find('i').on('selectstart', function (e) {
            return false
        });

        //拖拽
        if (options.drag) {
            $(document).on('mousemove', function (e) {
                var move = that.move;
                if (move.from) {
                    var to = move.to, treeMove = $('<div class="tree-box ' + dragStr + '"></div>');
                    e.preventDefault();
                    $('.' + dragStr)[0] || $('body').append(treeMove);
                    var dragElem = $('.' + dragStr)[0] ? $('.' + dragStr) : treeMove;
                    (dragElem).addClass('tree-show').html(move.from.elem.children('a').html());
                    dragElem.css({
                        left: e.pageX + 10
                        , top: e.pageY + 10
                    })
                }
            }).on('mouseup', function () {
                var move = that.move;
                if (move.from) {
                    move.from.elem.children('a').removeClass(enterSkin);
                    move.to && move.to.elem.children('a').removeClass(enterSkin);
                    that.move = {};
                    $('.' + dragStr).remove();
                }
            });
        }
    };

    //拖拽节点
    Tree.prototype.move = {};
    Tree.prototype.drag = function (elem, item) {
        var that = this,
            options = that.options;
        var a = elem.children('a'), mouseenter = function () {
            var othis = $(this), move = that.move;
            if (move.from) {
                move.to = {
                    item: item
                    , elem: elem
                };
                othis.addClass(enterSkin);
            }
        };
        a.on('mousedown', function () {
            var move = that.move;
            move.from = {
                item: item
                , elem: elem
            };
        });
        a.on('mouseenter', mouseenter).on('mousemove', mouseenter)
            .on('mouseleave', function () {
                var othis = $(this), move = that.move;
                if (move.from) {
                    delete move.to;
                    othis.removeClass(enterSkin);
                }
            });
    };

    tree = function (options) {
        var tree = new Tree(options = options || {});
        var elem = $(options.elem);
        if (!elem[0]) {
            return alert('没有找到' + options.elem + '元素');
        }
        tree.init(elem);
    }
});


