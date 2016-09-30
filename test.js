var assert = require('assert');
var pathIsAbsolute = require('./');

var path = {
	posix: {
		isAbsolute: pathIsAbsolute.posix
	},
	win32: {
		isAbsolute: pathIsAbsolute.win32
	}
};

// https://github.com/joyent/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/test/simple/test-path.js#L344
assert.equal(path.win32.isAbsolute('//server/file'), true);
assert.equal(path.win32.isAbsolute('\\\\server\\file'), true);
assert.equal(path.win32.isAbsolute('C:/Users/'), true);
assert.equal(path.win32.isAbsolute('C:\\Users\\'), true);
assert.equal(path.win32.isAbsolute('C:cwd/another'), false);
assert.equal(path.win32.isAbsolute('C:cwd\\another'), false);
assert.equal(path.win32.isAbsolute('directory/directory'), false);
assert.equal(path.win32.isAbsolute('directory\\directory'), false);

assert.equal(path.posix.isAbsolute('/home/foo'), true);
assert.equal(path.posix.isAbsolute('/home/foo/..'), true);
assert.equal(path.posix.isAbsolute('bar/'), false);
assert.equal(path.posix.isAbsolute('./baz'), false);
