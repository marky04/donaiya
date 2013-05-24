/*
 * Krio Image Loader Jquery Plugin v1
 * http://krio.me/jquery-image-loader-plugin
 * http://github.com/jquery-image-loader-plugin
*/

function krioImageLoader(id, gif) {

	var imagesToLoad = $('#' + id).find("img")
								.wrap('<div style="display:block; background:url(' + gif + ') no-repeat center center;" />')
								.css({opacity: 0, visibility: "hidden"})
								.addClass("krioImageLoader");
	var imagesToLoadCount = imagesToLoad.size();

	var checkIfLoadedTimer = setInterval(function() {
		if(!imagesToLoadCount) {
			clearInterval(checkIfLoadedTimer);
			return;
		} else {
			imagesToLoad.filter(".krioImageLoader").each(function() {
				if(this.complete) {
					fadeImageIn(this);
					imagesToLoadCount--;
				}
			});
		}
	}, 350);

	var fadeImageIn = function(imageToLoad) {
		$(imageToLoad).css({visibility: "visible"})
						.unwrap('div')
						.animate({opacity: 1},
							900,
							removeKrioImageClass(imageToLoad));
	};

	var removeKrioImageClass = function(imageToRemoveClass) {
		$(imageToRemoveClass).removeClass("krioImageLoader");
	};
}

