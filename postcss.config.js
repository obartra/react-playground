const postcssnext = require('postcss-cssnext');
const precss = require('precss');
const parser = require('postcss-scss');

module.exports = {
	plugins: [
		precss({ parser }),
		postcssnext()
	]
};
