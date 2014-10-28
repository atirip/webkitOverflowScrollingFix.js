/* jshint laxcomma:true, laxbreak: true, asi:true */
/* global define */
/* @preserve
 * MIT Licensed
 * Copyright (c) 2014, Priit Pirita, atirip@yahoo.com
 */
(function() {

	var	win = this
	var doc = win.document
	var module = 'webkitOverflowScrollingFix'
	var mac = /mac/.test(win.navigator.userAgent.toLowerCase())
	var touch = 'ontouchstart' in win
	var webkit = 'webkitTransform' in doc.documentElement.style

	function eventHandler(event) {
		var target = event.target
		var	top = target.scrollTop
		if ( !top ) target.scrollTop++
		// in case clientHeight is fractional we need to floor the result
		if (top == ~~(target.scrollHeight - target.clientHeight)) target.scrollTop--
	}

	function fix(nodes, what, handler) {
		var len
		var node
		if ( touch || (mac && webkit) ) {
			if ( nodes+'' === nodes ) {
				nodes = doc.querySelectorAll(nodes)
			} else if ( !Array.isArray(nodes) ) {
				nodes = [nodes]
			}
			len = nodes.length
			while (len--) if ( (node = nodes[len]) && node.nodeName) {
				node[what + 'EventListener']('scroll', handler || eventHandler, false)
				// call it now to fix before any scroll events occure
				if ( 'add' == what ) eventHandler({target: node})
			}
			// true if anything is handled
			return !!nodes.length
		}
	}

	var e = {
		add: function(nodes, handler) { return fix(nodes, 'add', handler) }
	,	remove: function(nodes, handler) { return fix(nodes, 'remove', handler) }
	,	eventHandler: eventHandler
	}

	if (typeof define === 'function' && define.amd) {
		define(module, function() {
			return e
		})
	} else {
		this[module] = e
	}

}).call(this);