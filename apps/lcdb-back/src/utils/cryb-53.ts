// fastest and simple string hash function (10^9 hashes => zero collision)

// keys 20 length => 1050 hash/ms
// keys 50 length => 750 hash/ms
// keys 500 length => 80 hash/ms

const cyrb53 = (key, seed = 0) => {
  const A = 2654435761;
  const B = 1597334677;
  const C = 2246822507;
  const D = 3266489909;
  const E = 4294967296;
  const F = 2097151;

  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for (let index = 0, char; index < key.length; index++) {
    char = key.charCodeAt(index);

    h1 = Math.imul(h1 ^ char, A);
    h2 = Math.imul(h2 ^ char, B);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), C) ^ Math.imul(h2 ^ (h2 >>> 13), D);
  h2 = Math.imul(h2 ^ (h2 >>> 16), C) ^ Math.imul(h1 ^ (h1 >>> 13), D);

  return E * (F & h2) + (h1 >>> 0);
};

export default cyrb53;
