module.exports = function(html) {
	return html.substr(html.indexOf('v=') + 2, 11);
};