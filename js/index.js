// Actions to take ONLY on the index.html page. 
$(document).ready(function() {

    
	// Get the newest version of the menu 
	$.ajax({
        url: "https://kalobtaulien.com/template/blog-posts.json",
        type: "GET",
        crossDomain: true,
        data: {},
        dataType: "json",
        success: function (data) {
        	var html = "";
        	var i = 0;
            for(var name in data.posts) {
            	html += "<li><a href='"+data.posts[name]['url']+"'>"+name+"</a></li>";
            	i++;

            	// Only show the latest 7 posts on the home page
            	if(i >= 7) {
            		break;
            	}
            }
            $("#blog-post-list").html(html);
           
        },
        error: function (xhr, status) {
            // Could not load side menu 
        }
    });

	

});