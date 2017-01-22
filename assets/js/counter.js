/**
 * Created by GiantR on 2017/1/22.
 */
// 总数
var giantR_firebase = new Firebase("https://nicejade.firebaseIO.com"),
    counter = $("#counter"),
    detail_counter = $("#detail_counter");
giantR_firebase.child("sum").on("value", function(data) {
    var current_counter = data.val();
    if(counter.length > 0  && current_counter > 1){
        counter.html("&nbsp;本站热度：<span style='color:purple'>"+ current_counter +"</span>(℃)");
    }
});

giantR_firebase.child("sum").transaction(function (current_counter) {
    return (current_counter || 0) + 1;
});

// 明细
var current_url = window.location.pathname.replace(new RegExp('\\/|\\.', 'g'),"_");

giantR_firebase.child("detail/"+current_url).transaction(function (current_counter) {
    return (current_counter || 0) + 1;
});

// 获取明细，并将明细也展示在页面上
giantR_firebase.child("detail/"+current_url).on("value", function(data){
    var detail_counter = data.val();
    if(detail_counter.length > 0 && detail_counter > 1){
        detail_counter.html(
            "&nbsp;本页热度：<span style='color:purple'>"+ detail_counter +"</span>(℃)"
        );
    }
});

var n = new Date();
var time = n.getFullYear()+'-'+(n.getMonth()+1)+'-'+n.getDate()+'_'+n.getHours()+':'+n.getMinutes()+':'+n.getSeconds()+' '+n.getMilliseconds();
giantR_firebase.child("lastupdatetime").set({ timer: time, url: current_url });

