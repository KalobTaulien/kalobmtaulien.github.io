// Force SSL
if (location.protocol != 'https:' && window.location.hostname == 'kalobtaulien.com') {
	location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

// Site application settings. 
// TODO: Build this out more
const app = {
	// Application settings
	blog: {
		show_category: null
	},
	// Get's a query string param.
	// 5500+ people probably aren't wrong. http://stackoverflow.com/a/901144/2074077
	getQueryString: (name) => {
		let url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	},
	// Resize the body, if needed.
	resizeBody: () => {
		let w = $(window).height();
		let h = $("nav").outerHeight();
		let f = $("footer").outerHeight();
		$("#body").css("min-height", w-h-f-1);
		// Mobile menu fix
		$("#mobile-menu").css("height", $(document).height());
	},
	init: () => {
		if (app.getQueryString('category')) {
			app.blog.show_category = app.getQueryString('category').toLowerCase();
		}

		// HTML and Body Elements
		const $body = $('html, body');
		// Subscription URL 
		const subscription_url = '#';
		// Menu slider 
		const $menuSlider = $('#menu-slider');

		// Immediately change the subscribe button href
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
				let html = '<ul>';
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
				let html = "";
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

		window.onresize = function() {
			app.resizeBody();
		}

		app.resizeBody();
		
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
		// Is the menu opened?
		.on("mouseout", ".menu-opened", function(e) {
			$menuSlider.stop(true, true);
			$menuSlider.css({
				left: $menuSlider.width() / -1
			});
		})
		.on("click", ".open-mobile-menu", function(e) {
			e.preventDefault();
			$("#mobile-menu").toggle();
		})
		// When the #top url is clicked. 
		.on("click", "a[href='#top']", function(e) {
			$("html, body").animate({ scrollTop: 0 }, 250);
			return e.preventDefault();
		});


		// When the window scrolls, hide or show the upwards facing chevron in the menu
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

		// Console message. heh. :) 
        console.log('%cLearn something new at Arkmont.com',
          'color:#fff; font-weight:bold; background-color:#8c1515; line-height: 35px; padding: 10px 15px;');


	}
}

// A redundant action, but a good rpactice. 
$(document).ready(function() {
	// Initialize 
	app.init();
});