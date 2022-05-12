export const STORAGE_BOXES = {
  154: { name: '(08)YRG-B[2]', group: 4 }, // 4
  155: { name: '(08)YRG-B[8]', group: 4 }, // 4
  156: { name: '(08)YRG-B[5]', group: 4 }, // 4
  157: { name: '(08)YRG-B[1]', group: 4 }, // 4
  194: { name: '(08)YRG-B[3]', group: 4 }, // 4
  195: { name: '(08)YRG-B[7]', group: 4 }, // 4
  196: { name: '(08)YRG-B[16]', group: 4 }, // 4
  197: { name: '(08)YRG-B[17]', group: 4 }, // 4
  199: { name: 'RGC-[01]', group: null },
  200: { name: '(08)YRG-B[15]', group: 4 }, // 4
  201: { name: '(08)YRG-B[18]', group: 4 }, // 4
  203: { name: 'RCG-[02]', group: null },
  204: { name: '(08)YRG-B[10]', group: 4 }, // 4
  205: { name: '(08)YRG-B[14]', group: 4 }, // 4
  206: { name: '(08)YRG-B[6]', group: 4 }, // 4
  207: { name: 'RGC-[03]', group: null },
  208: { name: 'YRF|001', group: 1 }, // 1
  209: { name: 'YRX|001', group: 5 }, // 5
  210: { name: 'YC_|001', group: 3 }, // 3
  211: { name: 'YC!|001', group: 1 }, // 1
  212: { name: 'YC$|011', group: 1 }, // 1
  213: { name: 'YC$|010', group: 1 }, // 1
  214: { name: 'YC$|009', group: 1 }, // 1
  215: { name: 'YC$|004', group: 1 }, // 1
  216: { name: 'YC$|007', group: 1 }, // 1
  217: { name: 'YC$|005', group: 1 }, // 1
  218: { name: 'YC$|006', group: 1 }, // 1
  219: { name: 'YC$|003', group: 1 }, // 1
  220: { name: 'YCF|002', group: 1 }, // 1
  221: { name: 'YC$|001', group: 1 }, // 1
  222: { name: 'YC?|001', group: 4 }, // 4
  223: { name: 'YCF|001', group: 1 }, // 1
  224: { name: 'YCF|004', group: 1 }, // 1
  225: { name: 'YCF|003', group: 1 }, // 1
  226: { name: 'YC$|012', group: 1 }, // 1
  227: { name: 'YRG|001', group: 4 }, // 4
  228: { name: 'YC$|002', group: 1 }, // 1
  229: { name: 'VERT#YC_|001', group: 3 }, // 3
  230: { name: 'VIOLET#YC_|001', group: 3 }, // 3
  231: { name: 'BLEU#YC_|001', group: 3 }, // 3
  232: { name: 'YC$|008', group: 1 }, // 1
  233: { name: '(08)YRG-B[4]', group: 4 }, // 4
  234: { name: '(08)YRG-B[11]', group: 4 }, // 4
  235: { name: 'DORE#YC_|001', group: 3 } // 3
};

export const STORAGE_BOXE_NAMES = [...Object.values(STORAGE_BOXES).map((item) => item.name.toUpperCase()), 'YXR|001'];

export const STORAGE_BOXES_BY_NAME = Object.entries(STORAGE_BOXES).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [value.name]: { ...value, id: key }
  }),
  {}
);
