// Radius and zoom according to Ridge ridgeHeight:
const radiusAndFactage = {
  9: { h: 321, z: 16 },
  10: { h: 365, z: 15 },
  11: { h: 409, z: 15 },
  12: { h: 454, z: 15 },
  13: { h: 499, z: 15 },
  14: { h: 546, z: 15 },
  15: { h: 593, z: 15 },
  16: { h: 641, z: 15 },
  17: { h: 689, z: 15 },
  18: { h: 738, z: 15 },
  19: { h: 787, z: 14 },
};

// Retrieving the corresponding radius and zoom:
export const getMyRadius = (myRidgeHeight) => {
  if (myRidgeHeight <= 8) {
    return { h: 300, z: 16 };
  }
  if (myRidgeHeight >= 20) {
    return { h: 837, z: 14 };
  }
  return radiusAndFactage[myRidgeHeight];
};
