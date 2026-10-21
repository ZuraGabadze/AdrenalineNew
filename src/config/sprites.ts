export interface SpriteDefinition {
  palette: Record<string, string>;
  rows: string[];
}

export const INGOT_ROWS: string[] = [
  '................',
  '................',
  '................',
  '.....OOOOOOOOOO.',
  '....OHHHHHHHHRO.',
  '...OHTTTTTTIRRO.',
  '..OHIIIIIIIRRRO.',
  '.OFFFFFFFFFRRRO.',
  '.OFFFFFFFFFRRO..',
  '.OFFFFFFFFFRO...',
  '.OFFFFFFFFFO....',
  '.OOOOOOOOOO.....',
  '................',
  '................',
  '................',
  '................',
];

export const SPRITES: Record<string, SpriteDefinition> = {
  coal: {
    palette: {
      b: '#171717',
      g: '#4f4f4f',
      h: '#7a7a7a',
      k: '#2b2b2b',
      o: '#0d0d0d',
    },
    rows: [
      '................',
      '................',
      '................',
      '.......ooo......',
      '....ooohhgoo....',
      '...ohhggkkkoo...',
      '..ohgkkkkkkkbo..',
      '..ogkkhkkkkkko..',
      '.ohkkkkkkgkkkbo.',
      '.ogkkkkkkkkkkbo.',
      '.okkkkgkkkkkbbo.',
      '..okkkkkkkkbbo..',
      '..ooobkkkkbboo..',
      '....oooobbooo...',
      '......oooo......',
      '................',
    ],
  },
  iron: {
    palette: {
      F: '#b8b8b8',
      H: '#ffffff',
      I: '#cfcfcf',
      O: '#3b3b3b',
      R: '#9a9a9a',
      T: '#e6e6e6',
    },
    rows: INGOT_ROWS,
  },
  gold: {
    palette: {
      F: '#e8b923',
      H: '#fffbb5',
      I: '#f0c92b',
      O: '#6b4300',
      R: '#d18e0e',
      T: '#f9e36b',
    },
    rows: INGOT_ROWS,
  },
  netherite: {
    palette: {
      F: '#463f47',
      H: '#8e8591',
      I: '#59505a',
      O: '#1f1a21',
      R: '#373038',
      T: '#736975',
    },
    rows: INGOT_ROWS,
  },
  diamond: {
    palette: {
      b: '#1d969a',
      c: '#6ef5e8',
      d: '#125c63',
      m: '#2dd4c8',
      o: '#0b383d',
      w: '#dffffb',
    },
    rows: [
      '................',
      '................',
      '....oooooooo....',
      '...owwccccmbo...',
      '..owwccccccmbo..',
      '.oooooooooooooo.',
      '.obccmmmmmmbbdo.',
      '..obcmmmmmmbdo..',
      '...obcmmmmbdo...',
      '....obcmmbdo....',
      '.....obmbdo.....',
      '......obdo......',
      '.......oo.......',
      '................',
      '................',
      '................',
    ],
  },
  emerald: {
    palette: {
      b: '#0c8b43',
      c: '#4df584',
      d: '#065728',
      m: '#17c95b',
      o: '#043518',
      w: '#d4ffe3',
    },
    rows: [
      '................',
      '.....oooooo.....',
      '....owwcccbo....',
      '...owccccccbo...',
      '..owccmmmmmbdo..',
      '..ocmmmmmmmmbo..',
      '..ocmmmmmmmmbo..',
      '..ocmmmmmmmmbo..',
      '..ocmmmmmmmmbo..',
      '..ocmmmmmmmmbo..',
      '..obmmmmmmmbdo..',
      '...obmmmmmbdo...',
      '....obmmmbdo....',
      '.....oooooo.....',
      '................',
      '................',
    ],
  },
  grass: {
    palette: {
      a: '#4c321b',
      b: '#694626',
      d: '#875c36',
      g: '#3e7320',
      l: '#7ec850',
      m: '#5ea435',
      o: '#22170c',
      s: '#4e8c2a',
    },
    rows: [
      '.......ll.......',
      '.....llllmm.....',
      '...llllmmmmmm...',
      '.llllmmmmmmssss.',
      'lllmmmmmmssssssg',
      'glllmmmmssssssgg',
      'gglllmmssssssggg',
      'ggglllssssssgggg',
      'dgggllssssggggba',
      'ddggglsssggggbaa',
      'dddggglsggggbaaa',
      'ddddgggggggbaaaa',
      '.dddddbdbdbaaaa.',
      '...dddddbbaaa...',
      '.....dddbba.....',
      '.......do.......',
    ],
  },
  sword: {
    palette: {
      b: '#1d969a',
      c: '#6ef5e8',
      g: '#8b5a2b',
      h: '#5c3a1b',
      m: '#2dd4c8',
      o: '#0b383d',
      p: '#f9e36b',
      w: '#ffffff',
    },
    rows: [
      '............oooo',
      '...........occwo',
      '..........ocmwwo',
      '.........ocmwbbo',
      '........ocmwbbo.',
      '.......ocmwbbo..',
      '......ocmwbbo...',
      '...oo.ocmwbbo...',
      '..obmoocwbbo....',
      '..ooommwbbo.....',
      '....oomooo......',
      '...oghoomo......',
      '..ogho..oo......',
      '.opgo...........',
      '.ooo............',
      '................',
    ],
  },
  ender_pearl: {
    palette: {
      o: '#031a16',
      s: '#06312b',
      d: '#0b4a3e',
      m: '#16795e',
      l: '#2fb88f',
      h: '#c8ffee',
    },
    rows: [
      '................',
      '................',
      '.....oooooo.....',
      '...oohllmmmoo...',
      '...ohllmmmmmo...',
      '..ohhlllmmmddo..',
      '..olllmmlmdddo..',
      '..olmmsmmlddso..',
      '..ommssmdldmso..',
      '..ommmmmmdssso..',
      '..ommmdddsmsso..',
      '...omddssmsso...',
      '...ooddssssoo...',
      '.....oooooo.....',
      '................',
      '................',
    ],
  },
};

export const RANK_SPRITE_MAP: Record<'smp' | 'boxpvp', Record<string, keyof typeof SPRITES>> = {
  smp: {
    vip: 'coal',
    'vip-plus': 'iron',
    mvp: 'gold',
    'mvp-plus': 'diamond',
    sponsor: 'netherite',
  },
  boxpvp: {
    nile: 'coal',
    obelisk: 'iron',
    osiris: 'gold',
    anubis: 'diamond',
    sponsor: 'emerald',
  },
};

export const GAMEMODE_SPRITE_MAP: Record<'smp' | 'boxpvp' | 'oneblock', keyof typeof SPRITES> = {
  smp: 'grass',
  boxpvp: 'sword',
  oneblock: 'grass',
};

export function resolveSpriteFromPathOrName(
  spriteOrPath?: string
): keyof typeof SPRITES {
  if (!spriteOrPath) return 'coal';
  const clean = spriteOrPath.toLowerCase();
  if (clean in SPRITES) {
    return clean as keyof typeof SPRITES;
  }
  if (clean.includes('ender_pearl') || clean.includes('ender-pearl')) {
    return 'ender_pearl';
  }
  if (clean.includes('boxpvp')) {
    if (clean.includes('nile')) return RANK_SPRITE_MAP.boxpvp.nile;
    if (clean.includes('obelisk')) return RANK_SPRITE_MAP.boxpvp.obelisk;
    if (clean.includes('osiris')) return RANK_SPRITE_MAP.boxpvp.osiris;
    if (clean.includes('anubis')) return RANK_SPRITE_MAP.boxpvp.anubis;
    if (clean.includes('sponsor')) return RANK_SPRITE_MAP.boxpvp.sponsor;
    return GAMEMODE_SPRITE_MAP.boxpvp;
  }
  if (clean.includes('smp')) {
    if (clean.includes('vip-plus')) return RANK_SPRITE_MAP.smp['vip-plus'];
    if (clean.includes('vip')) return RANK_SPRITE_MAP.smp.vip;
    if (clean.includes('mvp-plus')) return RANK_SPRITE_MAP.smp['mvp-plus'];
    if (clean.includes('mvp')) return RANK_SPRITE_MAP.smp.mvp;
    if (clean.includes('sponsor')) return RANK_SPRITE_MAP.smp.sponsor;
    return GAMEMODE_SPRITE_MAP.smp;
  }
  if (clean.includes('oneblock')) return GAMEMODE_SPRITE_MAP.oneblock;
  if (clean.includes('netherite')) return 'netherite';
  if (clean.includes('emerald')) return 'emerald';
  if (clean.includes('diamond')) return 'diamond';
  if (clean.includes('gold')) return 'gold';
  if (clean.includes('iron')) return 'iron';
  if (clean.includes('sword')) return 'sword';
  if (clean.includes('grass')) return 'grass';
  return 'coal';
}
