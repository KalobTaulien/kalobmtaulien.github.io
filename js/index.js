$(document).ready(function(){$.ajax({url:"https://kalobtaulien.com/template/blog-posts.json",type:"GET",crossDomain:!0,data:{},dataType:"json",success:function(o){var t="",a=0;for(var s in o.posts)if(t+="<li><a href='"+o.posts[s].url+"'>"+s+"</a></li>",a++,a>=7)break;$("#blog-post-list").html(t)},error:function(o,t){}})});