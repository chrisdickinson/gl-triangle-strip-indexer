module.exports = createIndices;

function createIndices(width, height, out) {
  var size = height + (height - 1) * ((width - 2) << 1);
  var w_minus_one = width - 1;
  var base = (width - 2) << 1;
  var max = width * height;
  var shiftRight = 0;
  var idx = 1;
  var l0 = -width;
  var l1 = 0;
  var x = 1;
  var y = 0;
  var i = 0;
  out = out ?
    out.subarray(0, size) :
    new (max > 0xFFFF ? Uint32Array : Uint16Array)(size);

  out[0] = 0;
  for (; y < height - 1; ++y) {
    l0 = l1;
    l1 = l0 + width;
    i = idx;
    idx += 1 + ((width - 2) << 1);
    if (y & 1) {
      out[i + base] = 1 + l1;
      for(; x > 1; --x, i += 2) {
        out[i] = x - 1 + l0;
        out[i + 1] = x + l1;
      }
    } else {
      out[i + base] = w_minus_one + l1;
      for(; x < w_minus_one; ++x, i += 2) {
        out[i] = x + 1 + l0;
        out[i + 1] = x + l1;
      }
    }
  }
  return out;
}
