module.exports = function(html) {
	return html.substring(html.indexOf('tracks/') + 7, html.lastIndexOf('&'));
};