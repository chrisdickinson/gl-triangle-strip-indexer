# gl-triangle-strip-indexer

Creates typed arrays capable of being passed to WebGL element arrays for triangle strip
meshes.

```javascript
var createIndices = require('gl-triangle-strip-indexer')
var createBuffer = require('gl-buffer')
var createVAO = require('gl-vao')

var indexData = createIndices(256, 256)
var vertexData = createSomeContiguousSurface(256, 256)

// to use element indexes >= 65535, use "OES_element_index_uint."
gl.getExtension('OES_element_index_uint')

var indexBuffer = createBuffer(gl, ndarray(indexData), gl.ELEMENT_ARRAY_BUFFER);
var vao = createVAO(gl, [{
  buffer: createBuffer(gl, vertexData, gl.ARRAY_BUFFER, gl.STATIC_DRAW),
  type: gl.FLOAT,
  size: 3
}], indexBuffer, gl.UNSIGNED_INT)

vao.bind()
vao.draw(gl.TRIANGLE_STRIP, indexBuffer.length)
```

## API

#### `createIndices(width, height[, out]) -> out`

Returns a typed array containing indexes representing a triangle strip. Each alternating
column will introduce one degenerate triangle, and produces the following pattern:

```
  *--*--*
  | /|\ |
  |/ | \|
  *--*--*
  | /|\ |
  |/ | \|
  *--*--*
```

The size of the returned array will be `height + (height - 1) * (2 * (width - 1))`. The array
can be passed in as the optional `out` parameter, in which case a subarray will be returned.
If `out` is not provided, `createIndices` will instantiate one of the correct datatype and size.

## License

MIT
