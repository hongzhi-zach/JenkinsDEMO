var assert = require('assert')

function test() {
  assert.strictEqual(2 + 2, 4);
}

if (module == require.main) require('test').run(test);