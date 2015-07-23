/*!
 * jQuery Event Scroll
 * version: 2.0
 * Requires jQuery v1.5 or later
 * Copyright (c) 2015 F. Sobral
 * Examples and documentation at: http://fbsobral.github.io/jquery.eventscroll/
 * Project repository: https://github.com/fbsobral/jquery.eventscroll
 * Dual licensed under the MIT and GPL licenses.
 */

(function ($) {
 
    $.fn.eventScroll = function(options) {

        var that = this;
 
        // defining default variables
        var settings = $.extend({
            // define when the event is triggered
            line: 'middle', //top, bottom, middle
            // configure if the event should be triggered only once or infinite times
            infinite: true,
            // callback to execute when the event is ready
            callback: function() {}
        }, options);

        // if there is the element
        if (that.length) {
            // actions on window scroll
            $(window).scroll(function(){
                // getting data about the viewport
                var viewport = { 
                    // top position of the scrolling viewport
                    scrollTop: $(window).scrollTop(),
                    // bottom position of the scrolling viewport
                    scrollBottom: $(window).scrollTop() + $(window).height(),
                    // line on the middle of the scrolling viewport
                    middleLine: $(window).scrollTop() + ($(window).height() / 2)
                };
                // getting data about the DOM element
                var element = { 
                    // top position of the DOM element
                    top: that.position().top,
                    // bottom position of the DOM element
                    bottom: that.position().top + that.height(),
                    // finding if the event already was triggered
                    active: that.data('active')
                }

                // if the event should be triggered based on top line
                if(settings.line == 'top'){
                    if(viewport.scrollTop >= element.top){
                        enableElement(element);
                    } else {
                        disableElement(element);
                    }
                }
                // if the event should be triggered based on middle line
                else if(settings.line == 'middle'){
                    if(viewport.middleLine >= element.top && viewport.middleLine <= element.bottom){
                        enableElement(element);
                    } else {
                        disableElement(element);
                    }
                }
                // if the event should be triggered based on bottom line
                else if(settings.line == 'bottom'){
                    if(viewport.scrollBottom <= element.bottom){
                        enableElement(element);
                    } else {
                        disableElement(element);
                    }
                }
            });
        }

        function enableElement(element){
            // if the event is not triggered yet
            if(!element.active){
                 // call the callback and apply the scope
                settings.callback.call(this);
                // set that the event already have been triggered
                that.data('active', true);
            }
        }

        function disableElement(element){
            if(element.active){
                // if the configuration forces infinite triggers
                if(settings.infinite){
                    // set that the event have not been triggered yet
                    that.data('active', false);   
                }                 
            }
        }
 
        // returning the element
        return this;
 
    };
 
}(jQuery));
