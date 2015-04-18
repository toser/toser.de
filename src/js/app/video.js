(function ($) {
   "use strict";
   
   var $video = $('#video'),
       video = Math.ceil((Math.random()*4));
       
    $video.vide({
        mp4: 'video/0' + video + '.mp4',
        webm: 'video/0' + video + '.webm',
        poster: 'video/0' + video + '.jpg'
    },
    {
        muted: true,
        loop: true,
        autoplay: true,
        position: "0 0",
        posterType: "detect",
        resizing: true
    }); 

}(jQuery));