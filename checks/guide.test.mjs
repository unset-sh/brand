import test from 'node:test';
import assert from 'node:assert/strict';
import { guideBaseURL } from '../scripts/build-guide.mjs';

test('guide URLs support root, project Pages and custom domains', () => {
  assert.equal(guideBaseURL({}), 'https://unset-sh.github.io/');
  assert.equal(guideBaseURL({ BRAND_BASE_PATH: '/brand' }), 'https://unset-sh.github.io/brand/');
  assert.equal(guideBaseURL({ BRAND_BASE_PATH: '/brand/' }), 'https://unset-sh.github.io/brand/');
  assert.equal(guideBaseURL({ BRAND_BASE_URL: 'https://brand.unset.sh/' }), 'https://brand.unset.sh/');
  assert.equal(guideBaseURL({ BRAND_BASE_PATH: '/brand/', BRAND_BASE_URL: 'http://127.0.0.1:49740/brand/' }), 'http://127.0.0.1:49740/brand/');
});

test('guide build rejects mismatched base paths and malformed site URLs', () => {
  assert.throws(() => guideBaseURL({ BRAND_BASE_PATH: '/brand/', BRAND_BASE_URL: 'https://brand.unset.sh/' }), /same site path/);
  for (const path of ['//example.org/', '/brand/../', 'brand/', '/brand?x=1']) {
    assert.throws(() => guideBaseURL({ BRAND_BASE_PATH: path }), /absolute path/);
  }
  for (const url of ['file:///tmp/brand/', 'https://user:password@example.org/', 'https://example.org/?token=value', 'https://example.org/#brand']) {
    assert.throws(() => guideBaseURL({ BRAND_BASE_URL: url }), /plain http/);
  }
});
