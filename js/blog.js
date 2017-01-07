// Actions to take ONLY on the blog.html page. 
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
            for(var name in data.posts) {
            	html += 
            	'<div class="row section-block-a blog blogpreview" itemscope itemtype="http://schema.org/Article">' +
						'<div class="col-sm-12">' +
							'<h2 class="title">' +
								'<a href="'+data.posts[name]['url']+'" itemprop="isBasedOnUrl">' +
									'<span itemprop="headline">'+name+'</span>' +
								'</a>' +
							'</h2>' +

							'<h4 itemprop="alternativeHeadline">'+data.posts[name]['subtitle']+'</h4>' +

							'<h4>' +
								'<small>' + 
									'<span itemprop="dateCreated">' +
										'<span itemprop="datePublished">'+data.posts[name]['datePublished']+'</span>' +
									'</span>' +
									' in ' +
									'<a href="javascript:void(0);" itemprop="about">'+data.posts[name]['category']+'</a>' +
									' by ' +
									'<a href="'+data.posts[name]['author']['twitterUrl']+'" itemprop="author">'+data.posts[name]['author']['name']+'</a>' +
								'</small>' +
							'</h4>' +

							'<a href="'+data.posts[name]['url']+'" class="btn btn--cta">Read Now</a>' +
							'<span class="hidden" itemprop="keywords">'+data.posts[name]['keywords']+'</span>' +
						'</div>' +
					'</div>';

            }

            $("#post-previews").html(html);
           
        },
        error: function (xhr, status) {
            // Could not load side menu 
        }
    });

	

});