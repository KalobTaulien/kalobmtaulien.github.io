// Force SSL
if (location.protocol != 'https:') {
	location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}	

$(document).ready(function() {
	
	// HTML and Body Elements
	var $body = $('html, body');
	// Subscription URL 
	var subscription_url = '#';

	$(".btn--subscribe").attr('href', subscription_url);

	// Get the newest version of the menu 
	$.ajax({
        url: "https://kalobtaulien.com/template/menu-links.json",
        type: "GET",
        crossDomain: true,
        data: {},
        dataType: "json",
        success: function (data) {
            // Create new <ul>
            var html = '<ul>';
            for(var name in data.links) {
            	html += "<li><a href='"+data.links[name]+"'>"+name+"</a></li>";
            }
            html += "</ul>";
            $(".related-links:first").append(html);
            // Save the mobile menu, too 
			$("#mobile-menu").html( html );
           
        },
        error: function (xhr, status) {
            // Could not load side menu 
        }
    });

	// Get the newest version of the footer links  
	$.ajax({
        url: "https://kalobtaulien.com/template/footer-links.json",
        type: "GET",
        crossDomain: true,
        data: {},
        dataType: "json",
        success: function (data) {
        	var html = "";
        	for(var i in data.links) {
        		html += "<a href='"+data.links[i]['url']+"'> \
							<i class='"+data.links[i]['icon']+"'></i><span class='margin--left-5'>"+data.links[i]['text']+"</span> \
						</a>";
        	}
        	$("#footer-links").prepend( html );
           
        },
        error: function (xhr, status) {
            // Could not load footer links
            console.log(status)
        }
    });

	// Set the resize function 
	resizeBody = function() {
		var w = $(window).height();
		var h = $("nav").outerHeight();
		var f = $("footer").outerHeight();
		$("#body").css("min-height", w-h-f-1);
		// Mobile menu fix
		$("#mobile-menu").css("height", $(document).height());
	};

	window.onresize = function() {
		resizeBody();
	}

	resizeBody();
	
	// Load the BS Affix
	$('#float-column').affix({
		offset: {
			top: 80,
			bottom: function () {
				return (this.bottom = $('footer').outerHeight(true))
			}
		}
	});
	
	$(document)
	.on("mouseout", ".menu-opened", function(e) {
		$("#menu-slider").stop(true, true);
		$("#menu-slider").css({
								left: 		$("#menu-slider").width() / -1
							});
	})
	.on("click", ".open-mobile-menu", function(e) {
		e.preventDefault();
		$("#mobile-menu").toggle();
	});



	$(window).scroll( function(e){

		// Show the affix header. Or hide it. 
		clearTimeout(timeout);
		var timeout = setTimeout(function() {			// Timeout prevents this from running too much on fast scrolls
			if( $(window).scrollTop() >= 70) {
				$("#float-column #header").fadeIn(150);
			} else {
				// Hide the affix header
				$("#float-column #header").fadeOut(100);
			}
		}, 250);
	
    });


});