var createIndices = require('./create-indices.js');
var tape = require('tape');
var util = require('util');

module.exports = suite;

if (require.main === module) {
  suite(tape);
} else {
  module.exports = suite;
}

function suite(test) {
  test('should return subarray if "out" parameter is given', function(assert) {
    var shared = new Uint32Array(128 + 127 * (126 * 2));
    assert.ok(createIndices(32, 32).buffer === shared.buffer);
    assert.end();
  });

  test('should return expected size', function(assert) {
    var shared = new Uint32Array(128 + 127 * (126 * 2));
    for(var x = 2; x < 128; ++x)
    for(var y = 2; y < 128; ++y)
      assert.equal(
        createIndices(x, y, shared).length,
        y + (y - 1) * ((x - 2) * 2),
        util.format('createIndices(%d, %d).length check', x, y)
      );
    assert.end();
  });
}
