#webkitOverflowScrollingFix.js

Normalize webkit scroll rubber effect on iOS and on OSX.

## The Problem

The rubber effect on scrolling overflow is inconsistent.
iOS webkit has nice rubber effect when you scroll the content over the maximum of minimum. But it only works as expected when you start scrolling at __not__ the maximum or minimum. Initially, when `scrollTop` of scrollable is `0`, and you try to scroll down, the whole page rubbers instead. What? But - scroll up a bit, few pixels only, stop, scroll down - see, now the scrollable rubbers. That is what we want always.

Almost the same on OSX desktop webkit/blink, with the slight difference that scrollable has no rubber at all, but initially whole page rubbers in a same way as in iOS.

## The Solution

To normalize this and liquidate page rubber one needs to scroll the scrollable `1px` away at the the minimum/maximum if scroll ended up there. 

## Usage:

**Include webkitOverflowScrollingFix.js:**

    <script src="path/to/webkitOverflowScrollingFix.js"></script>

Also loading as AMD module is supported.

**Available methods**

	webkitOverflowScrollingFix.add(nodes);
	webkitOverflowScrollingFix.remove(nodes);

Where:  
__nodes__ is either a jQuery result, a DOM query string, Element or array of Elements

	webkitOverflowScrollingFix.add( $('.scrollable') );
	webkitOverflowScrollingFix.add('.scrollable');
	webkitOverflowScrollingFix.add(document.querySelector('.scrollable'));
	webkitOverflowScrollingFix.add(document.querySelectorAll('.scrollable'));


#### Caution	
__NB!__ On desktop, the scroll events fire rapidly and `webkitOverflowScrollingFix.js` may slow down your web-app. The handler is very small and very effective, but still. For that case the event handler is exposed to you to create throttle of your liking. Pass your throttled event handler as second parameter to add or remove.

	var eventHandler = webkitOverflowScrollingFix.eventHandler;
	
	// create your throttle
	var throttle = createMyThrottle(eventHandler);

	webkitOverflowScrollingFix.add('.scrollable', throttle);


## Demo

Simple [demo](http://atirip.github.com/webkitOverflowScrollingFix.js/index.html)  

For support, remarks and requests, please mail me at [atirip@yahoo.com](mailto:atirip@yahoo.com).

## License

Copyright (c) 2014 Priit Pirita, released under the MIT license.
