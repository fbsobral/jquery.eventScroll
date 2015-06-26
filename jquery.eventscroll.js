(function ($) {
 
    $.fn.eventscroll = function(options) {

        var that = this;
 
        // defining default variables
        var settings = $.extend({
            from: "google",
            singleEvent: false,
            parameters: {
                action: "scroll",
                category: "event",
                label: "default"
            }
        }, options);

        // actions on window scroll
        $(window).scroll(function(){
            // getting data about the viewport
            var viewport = { 
                // top position of the scrolling viewport
                scrollTop: $(window).scrollTop(),
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

            // if the middle line is on the element
            if(viewport.middleLine >= element.top && viewport.middleLine <= element.bottom){
                // if the event is not triggered yet
                if(!element.active){
                    switch(settings.from) {
                        case 'google':
                            ga('send', 'event', settings.parameters.category, settings.parameters.action, settings.parameters.label);
                            break;
                        default:
                            console.log('Undefined variable "from"');
                    }
                    // set that the event already have been triggered
                    that.data('active', true);
                }
            } else {
                if(element.active){
                    // if the configuration forces many triggers
                    if(!settings.singleEvent){
                        // set that the event have not been triggered yet
                        that.data('active', false);   
                    }                 
                }
            }
        });
 
        // returning the element
        return this;
 
    };
 
}(jQuery));