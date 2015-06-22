//The MIT License (MIT)
//
//Copyright (c) 2013-2014 Aadit M Shah
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var Factory = function () {};
var slice = Array.prototype.slice;

var augment = function (base, body) {
	var uber = Factory.prototype = typeof base === "function" ? base.prototype : base;
	var prototype = new Factory, properties = body.apply(prototype, slice.call(arguments, 2).concat(uber));
	if (typeof properties === "object") for (var key in properties) prototype[key] = properties[key];
	if (!prototype.hasOwnProperty("constructor")) return prototype;
	var constructor = prototype.constructor;
	constructor.prototype = prototype;
	return constructor;
};

augment.defclass = function (prototype) {
	var constructor = prototype.constructor;
	constructor.prototype = prototype;
	return constructor;
};

augment.extend = function (base, body) {
	return augment(base, function (uber) {
		this.uber = uber;
		return body;
	});
};

ArtisanStack.augment = augment;