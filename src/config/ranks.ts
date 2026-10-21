export type RankMode = 'smp' | 'boxpvp';

export type MaterialType = 'coal' | 'iron' | 'gold' | 'diamond' | 'emerald' | 'netherite';

export interface KitInfo {
  name: string;
  cooldownHours?: number;
}

export interface RankConfig {
  id: string;
  mode: RankMode;
  name: string;
  price: number;
  durationKa: string;
  material: MaterialType;
  materialLabelKa: string;
  accentColor: string;
  iconPath: string;
  inherits?: string[];
  ownCommands: string[];
  homes?: number;
  gearKeys?: number;
  playerVaults?: number;
  kits: KitInfo[];
  extraPerksKa: string[];
  topPerksKa: [string, string, string];
  chatPrefixPreview: {
    prefix: string;
    color: string;
    sampleMessageKa: string;
  };
  faq: {
    q: string;
    a: string;
  }[];
}

export const COMMAND_DESCRIPTIONS_KA: Record<string, string> = {
  '/hat': 'ნებისმიერი ნივთის თავზე დახურვა',
  '/craft': 'პორტატული Crafting Table-ის გახსნა ნებისმიერ ადგილას',
  '/disposal': 'ნაგვის მენიუს გახსნა ზედმეტი ნივთების გასაქრობად',
  '/helpop': 'სტაფისთვის სწრაფი შეტყობინების გაგზავნა დახმარებისთვის',
  '/feed': 'შიმშილის ზოლის მყისიერად შევსება',
  '/ec': 'პორტატული Ender Chest-ის გახსნა',
  '/enderchest': 'პორტატული Ender Chest-ის გახსნა ნებისმიერ დროს',
  '/smithingtable': 'Smithing Table-ის დისტანციურად გახსნა',
  '/anvil': 'Anvil-ის (გრდემლის) დისტანციურად გახსნა',
  '/grindstone': 'Grindstone-ის დისტანციურად გახსნა',
  '/heal': 'სიცოცხლის (HP) მყისიერად აღდგენა',
  '/repair': 'ხელში არსებული ნივთის შეკეთება',
  '/repair hand': 'ხელში დაჭერილი ნივთის მყისიერი შეკეთება',
  '/repair all': 'ინვენტარში არსებული ყველა ნივთის ერთდროულად შეკეთება',
  '/fly': 'ფრენის რეჟიმის ჩართვა და გამორთვა',
  '/invsee': 'სხვა მოთამაშის ინვენტარის დათვალიერება',
  '/chatcolor': 'ჩატში ტექსტის ფერის შეცვლა',
  '/tpahere': 'მოთამაშისთვის შენთან ტელეპორტაციის მოთხოვნის გაგზავნა',
  '/pweather': 'პირადი ამინდის შეცვლა მხოლოდ შენი ეკრანისთვის',
  '/ptime': 'პირადი დროის (დღე/ღამე) დაყენება',
  '/socialspy': 'მოთამაშეებს შორის პირადი შეტყობინებების ნახვა',
  '/ie rename': 'ItemEdit: ნივთის სახელის შეცვლა და ფერადი ფორმატირება',
  '/ie lore': 'ItemEdit: ნივთის აღწერის (Lore) სრული რედაქტირება',
  '/ie lore add': 'ItemEdit: ნივთზე დამატებითი აღწერის ხაზის დამატება',
  '/ie armortrim': 'ItemEdit: ჯავშანზე დეკორატიული Armor Trim-ის დადება',
};

export const DURATION_KA = '4 კვირა (1 თვე)';

export const SMP_RANKS: RankConfig[] = [
  {
    id: 'vip',
    mode: 'smp',
    name: 'VIP',
    price: 6.99,
    durationKa: DURATION_KA,
    material: 'coal',
    materialLabelKa: 'ქვანახშირი (Coal)',
    accentColor: '#7E8694',
    iconPath: '/assets/ranks/smp/vip.png',
    inherits: [],
    ownCommands: ['/hat', '/craft', '/disposal', '/helpop', '/feed'],
    homes: 2,
    kits: [{ name: 'VIP' }],
    extraPerksKa: ['[VIP] პრეფიქსი ჩატში და ტაბში', '2 სახლის წერტილი (Homes)', 'VIP კიტზე წვდომა'],
    topPerksKa: ['2 სახლის წერტილი (Homes)', '5 ბრძანება (/craft, /feed, /hat...)', 'კიტი: VIP'],
    chatPrefixPreview: {
      prefix: '[VIP]',
      color: '#9BA3B0',
      sampleMessageKa: 'გამარჯობა! ახალი ბაზა ავაშენე SMP-ზე!',
    },
    faq: [
      {
        q: 'რამდენ ხანს მოქმედებს VIP რანკი?',
        a: 'VIP რანკი მოქმედებს 4 კვირის (1 თვის) განმავლობაში გააქტიურების დღიდან.',
      },
      {
        q: 'შემიძლია თუ არა მოგვიანებით VIP+-ზე გადასვლა?',
        a: 'დიახ, Discord თიქეთში შეგიძლიათ მოითხოვოთ რანკის განახლება (Upgrade).',
      },
    ],
  },
  {
    id: 'vip-plus',
    mode: 'smp',
    name: 'VIP+',
    price: 14.99,
    durationKa: DURATION_KA,
    material: 'iron',
    materialLabelKa: 'რკინა (Iron Ingot)',
    accentColor: '#D6DFEC',
    iconPath: '/assets/ranks/smp/vip-plus.png',
    inherits: ['vip'],
    ownCommands: ['/ec', '/smithingtable', '/anvil', '/grindstone'],
    homes: 3,
    kits: [{ name: 'VIP' }, { name: 'VIP+' }],
    extraPerksKa: [
      'ყველა VIP პრივილეგია',
      '[VIP+] პრეფიქსი ჩატში და ტაბში',
      '3 სახლის წერტილი (Homes)',
      'დისტანციური სამუშაო მაგიდები (/ec, /anvil, /smithingtable, /grindstone)',
    ],
    topPerksKa: ['3 სახლის წერტილი (Homes)', 'პორტატული /ec, /anvil და /smithingtable', 'კიტები: VIP, VIP+'],
    chatPrefixPreview: {
      prefix: '[VIP+]',
      color: '#E2E8F0',
      sampleMessageKa: 'გამარჯობა! ვინმეს გინდათ ვაჭრობა სპაუნზე?',
    },
    faq: [
      {
        q: 'მოყვება თუ არა VIP+ რანკს VIP-ის ყველა ბრძანება?',
        a: 'დიახ, VIP+ სრულად მოიცავს VIP რანკის ყველა ბრძანებასა და კიტს.',
      },
      {
        q: 'რამდენი სახლის დაყენება შემიძლია VIP+ რანკით?',
        a: 'VIP+ რანკით შეგიძლიათ დააყენოთ 3 სახლის წერტილი (Homes).',
      },
    ],
  },
  {
    id: 'mvp',
    mode: 'smp',
    name: 'MVP',
    price: 24.99,
    durationKa: DURATION_KA,
    material: 'gold',
    materialLabelKa: 'ოქრო (Gold Ingot)',
    accentColor: '#FFD03B',
    iconPath: '/assets/ranks/smp/mvp.png',
    inherits: ['vip', 'vip-plus'],
    ownCommands: ['/heal', '/repair', '/ie rename', '/fly'],
    homes: 4,
    kits: [{ name: 'VIP' }, { name: 'VIP+' }, { name: 'MVP' }],
    extraPerksKa: [
      'ყველა VIP და VIP+ პრივილეგია',
      '[MVP] ოქროსფერი პრეფიქსი ჩატში',
      '4 სახლის წერტილი (Homes)',
      'ფრენის ბრძანება (/fly) და ნივთების შეკეთება (/repair)',
    ],
    topPerksKa: ['ფრენა (/fly) და /heal, /repair', '4 სახლის წერტილი (Homes)', 'კიტები: VIP, VIP+, MVP'],
    chatPrefixPreview: {
      prefix: '[MVP]',
      color: '#FFD03B',
      sampleMessageKa: 'გამარჯობა! /fly-ით მშენებლობა ბევრად სწრაფია!',
    },
    faq: [
      {
        q: 'შედის თუ არა /fly ბრძანება MVP რანკში?',
        a: 'დიახ, MVP რანკიდან იხსნება /fly, /heal, /repair და /ie rename ბრძანებები.',
      },
      {
        q: 'რომელი კიტები მეკუთვნის MVP რანკზე?',
        a: 'MVP რანკზე ხელმისაწვდომია სამივე კიტი: VIP, VIP+ და MVP.',
      },
    ],
  },
  {
    id: 'mvp-plus',
    mode: 'smp',
    name: 'MVP+',
    price: 36.99,
    durationKa: DURATION_KA,
    material: 'diamond',
    materialLabelKa: 'ალმასი (Diamond)',
    accentColor: '#4EE8FF',
    iconPath: '/assets/ranks/smp/mvp-plus.png',
    inherits: ['vip', 'vip-plus', 'mvp'],
    ownCommands: ['/invsee', '/chatcolor', '/repair all', '/ie lore'],
    homes: 6,
    kits: [{ name: 'VIP' }, { name: 'VIP+' }, { name: 'MVP' }, { name: 'MVP+' }],
    extraPerksKa: [
      'ყველა VIP, VIP+ და MVP პრივილეგია',
      '[MVP+] ალმასის პრეფიქსი და /chatcolor',
      '6 სახლის წერტილი (Homes)',
      'ყველა ნივთის შეკეთება (/repair all) და /invsee',
    ],
    topPerksKa: ['6 სახლის წერტილი (Homes)', '/repair all, /invsee და /chatcolor', 'კიტები: VIP, VIP+, MVP, MVP+'],
    chatPrefixPreview: {
      prefix: '[MVP+]',
      color: '#4EE8FF',
      sampleMessageKa: 'გამარჯობა! ყველას წარმატებულ თამაშს გისურვებთ!',
    },
    faq: [
      {
        q: 'რა განსხვავებაა /repair-სა და /repair all-ს შორის?',
        a: '/repair აკეთებს მხოლოდ ხელში არსებულ ნივთს, ხოლო /repair all ერთდროულად აკეთებს მთელ ინვენტარს.',
      },
      {
        q: 'შემიძლია ჩატის ფერის შეცვლა?',
        a: 'დიახ, /chatcolor ბრძანებით შეგიძლიათ აირჩიოთ სასურველი ჩატის ფერი.',
      },
    ],
  },
  {
    id: 'sponsor',
    mode: 'smp',
    name: 'SPONSOR',
    price: 62.99,
    durationKa: DURATION_KA,
    material: 'netherite',
    materialLabelKa: 'ნეზერითი (Netherite Ingot)',
    accentColor: '#FF7A00',
    iconPath: '/assets/ranks/smp/sponsor.png',
    inherits: ['vip', 'vip-plus', 'mvp', 'mvp-plus'],
    ownCommands: ['/tpahere', '/pweather', '/ptime', '/socialspy'],
    homes: 8,
    kits: [{ name: 'VIP' }, { name: 'VIP+' }, { name: 'MVP' }, { name: 'MVP+' }, { name: 'SPONSOR' }],
    extraPerksKa: [
      'ყველა ქვედა რანკის (VIP, VIP+, MVP, MVP+) სრული პრივილეგია',
      'უმაღლესი [SPONSOR] სტატუსი და პრეფიქსი',
      '8 სახლის წერტილი (Homes)',
      'ექსკლუზიური ბრძანებები: /tpahere, /pweather, /ptime, /socialspy',
    ],
    topPerksKa: ['8 სახლის წერტილი (Homes)', '/tpahere, /ptime, /pweather, /socialspy', 'ყველა 5 კიტი (SPONSOR-ის ჩათვლით)'],
    chatPrefixPreview: {
      prefix: '[SPONSOR]',
      color: '#FF7A00',
      sampleMessageKa: 'გამარჯობა! ADRENALINEE საუკეთესო სერვერია!',
    },
    faq: [
      {
        q: 'არის თუ არა SPONSOR ყველაზე მაღალი რანკი SMP-ზე?',
        a: 'დიახ, SPONSOR არის უმაღლესი რანკი SMP რეჟიმში და მოიცავს ყველა არსებულ პრივილეგიასა და 5-ვე კიტს.',
      },
      {
        q: 'რას აკეთებს /ptime და /pweather?',
        a: 'ეს ბრძანებები გაძლევთ საშუალებას მართოთ დღე/ღამე და ამინდი ინდივიდუალურად თქვენი ეკრანისთვის.',
      },
    ],
  },
];

export const BOXPVP_RANKS: RankConfig[] = [
  {
    id: 'nile',
    mode: 'boxpvp',
    name: 'NILE',
    price: 6.99,
    durationKa: DURATION_KA,
    material: 'coal',
    materialLabelKa: 'ქვანახშირი (Coal)',
    accentColor: '#7E8694',
    iconPath: '/assets/ranks/boxpvp/nile.png',
    inherits: [],
    ownCommands: ['/repair hand', '/ie lore add'],
    gearKeys: 2,
    playerVaults: 3,
    kits: [{ name: 'NILE', cooldownHours: 6 }],
    extraPerksKa: [
      'x2 Gear Key',
      '+3 PlayerVaults (/pv 1-3)',
      'რანკის ჩატის პრეფიქსი [NILE]',
      'Donator ზონაში შესვლის უფლება',
    ],
    topPerksKa: ['x2 Gear Key და +3 PlayerVaults (/pv 1-3)', 'Donator ზონაში წვდომა', 'კიტი: NILE (Cooldown: 6 სთ)'],
    chatPrefixPreview: {
      prefix: '[NILE]',
      color: '#9BA3B0',
      sampleMessageKa: 'გამარჯობა! დონატორ ზონაში ვარ!',
    },
    faq: [
      {
        q: 'რამდენ ხანში ერთხელ შემიძლია NILE კიტის აღება?',
        a: 'NILE კიტის აღება შესაძლებელია ყოველ 6 საათში ერთხელ (Cooldown: 6 სთ).',
      },
      {
        q: 'შედის თუ არა Donator ზონა NILE რანკში?',
        a: 'დიახ, NILE რანკიდან იხსნება წვდომა BoxPvp-ის Donator ზონაზე.',
      },
    ],
  },
  {
    id: 'obelisk',
    mode: 'boxpvp',
    name: 'OBELISK',
    price: 14.99,
    durationKa: DURATION_KA,
    material: 'iron',
    materialLabelKa: 'რკინა (Iron Ingot)',
    accentColor: '#D6DFEC',
    iconPath: '/assets/ranks/boxpvp/obelisk.png',
    inherits: ['nile'],
    ownCommands: ['/ie rename'],
    gearKeys: 3,
    playerVaults: 4,
    kits: [
      { name: 'NILE', cooldownHours: 6 },
      { name: 'OBELISK', cooldownHours: 4 },
    ],
    extraPerksKa: [
      'ყველა NILE პრივილეგია',
      'x3 Gear Key',
      '+4 PlayerVaults (/pv 1-4)',
      'Donator ზონაში წვდომა',
    ],
    topPerksKa: ['x3 Gear Key და +4 PlayerVaults (/pv 1-4)', 'ბრძანება /ie rename + ყველა NILE ბრძანება', 'კიტები: NILE (6 სთ), OBELISK (4 სთ)'],
    chatPrefixPreview: {
      prefix: '[OBELISK]',
      color: '#E2E8F0',
      sampleMessageKa: 'გამარჯობა! OBELISK კიტი უკვე ავიღე!',
    },
    faq: [
      {
        q: 'რამდენი PlayerVault მეხსნება OBELISK რანკზე?',
        a: 'OBELISK რანკზე გეხსნებათ +4 PlayerVault (/pv 1-4).',
      },
      {
        q: 'რა Cooldown აქვს OBELISK კიტს?',
        a: 'OBELISK კიტის Cooldown შეადგენს 4 საათს, ასევე გრჩებათ წვდომა NILE კიტზე (6 სთ).',
      },
    ],
  },
  {
    id: 'osiris',
    mode: 'boxpvp',
    name: 'OSIRIS',
    price: 24.99,
    durationKa: DURATION_KA,
    material: 'gold',
    materialLabelKa: 'ოქრო (Gold Ingot)',
    accentColor: '#FFD03B',
    iconPath: '/assets/ranks/boxpvp/osiris.png',
    inherits: ['nile', 'obelisk'],
    ownCommands: ['/repair all', '/ie armortrim', '/enderchest', '/heal'],
    gearKeys: 5,
    playerVaults: 6,
    kits: [
      { name: 'NILE', cooldownHours: 6 },
      { name: 'OBELISK', cooldownHours: 4 },
      { name: 'OSIRIS', cooldownHours: 3 },
    ],
    extraPerksKa: [
      'ყველა NILE და OBELISK პრივილეგია',
      'x5 Gear Key',
      '+6 PlayerVaults (/pv 1-6)',
      'Donator ზონაში წვდომა',
    ],
    topPerksKa: ['x5 Gear Key და +6 PlayerVaults (/pv 1-6)', '/repair all, /enderchest, /heal, /ie armortrim', 'კიტი OSIRIS (Cooldown: 3 სთ)'],
    chatPrefixPreview: {
      prefix: '[OSIRIS]',
      color: '#FFD03B',
      sampleMessageKa: 'გამარჯობა! მზად ვარ BoxPvp არენისთვის!',
    },
    faq: [
      {
        q: 'შემიძლია თუ არა მთელი ინვენტარის შეკეთება OSIRIS რანკით?',
        a: 'დიახ, OSIRIS რანკს მოყვება /repair all ბრძანება, ასევე /heal და /enderchest.',
      },
      {
        q: 'რამდენი Gear Key მოყვება OSIRIS რანკს?',
        a: 'OSIRIS რანკს მოყვება x5 Gear Key.',
      },
    ],
  },
  {
    id: 'anubis',
    mode: 'boxpvp',
    name: 'ANUBIS',
    price: 36.99,
    durationKa: DURATION_KA,
    material: 'diamond',
    materialLabelKa: 'ალმასი (Diamond)',
    accentColor: '#4EE8FF',
    iconPath: '/assets/ranks/boxpvp/anubis.png',
    inherits: ['nile', 'obelisk', 'osiris'],
    ownCommands: ['/invsee'],
    gearKeys: 5,
    playerVaults: 8,
    kits: [
      { name: 'NILE', cooldownHours: 6 },
      { name: 'OBELISK', cooldownHours: 4 },
      { name: 'OSIRIS', cooldownHours: 3 },
      { name: 'ANUBIS', cooldownHours: 3 },
    ],
    extraPerksKa: [
      'ყველა NILE, OBELISK და OSIRIS პრივილეგია',
      'x5 Gear Key',
      '+8 PlayerVaults (/pv 1-8)',
      'ყველა Chatcolor (ჩატის ფერები)',
      'Donator ზონაში წვდომა',
    ],
    topPerksKa: ['x5 Gear Key და +8 PlayerVaults (/pv 1-8)', 'ყველა Chatcolor + /invsee', '4 კიტი: NILE, OBELISK, OSIRIS, ANUBIS (3 სთ)'],
    chatPrefixPreview: {
      prefix: '[ANUBIS]',
      color: '#4EE8FF',
      sampleMessageKa: 'გამარჯობა! ANUBIS სეტმა არენაზე ყველაფერი შეცვალა!',
    },
    faq: [
      {
        q: 'რამდენი საცავი (PlayerVault) აქვს ANUBIS რანკს?',
        a: 'ANUBIS რანკს აქვს +8 PlayerVault (/pv 1-8) და წვდომა ყველა ჩატის ფერზე.',
      },
      {
        q: 'რა Cooldown აქვს ANUBIS კიტს?',
        a: 'ANUBIS კიტის Cooldown არის 3 საათი (Cooldown: 3 სთ).',
      },
    ],
  },
  {
    id: 'sponsor',
    mode: 'boxpvp',
    name: 'SPONSOR',
    price: 62.99,
    durationKa: DURATION_KA,
    material: 'emerald',
    materialLabelKa: 'ზურმუხტი (Emerald)',
    accentColor: '#36F27A',
    iconPath: '/assets/ranks/boxpvp/sponsor.png',
    inherits: ['nile', 'obelisk', 'osiris', 'anubis'],
    ownCommands: ['/invsee'],
    gearKeys: 5,
    playerVaults: 8,
    kits: [
      { name: 'NILE', cooldownHours: 6 },
      { name: 'OBELISK', cooldownHours: 4 },
      { name: 'OSIRIS', cooldownHours: 3 },
      { name: 'ANUBIS', cooldownHours: 3 },
      { name: 'SPONSOR', cooldownHours: 3 },
    ],
    extraPerksKa: [
      'სპეციალური Discord სერვერის როლი (Special Discord Role)',
      'ყველა NILE, OBELISK, OSIRIS და ANUBIS პრივილეგია',
      'x5 Gear Key',
      '+8 PlayerVaults (/pv 1-8)',
      'ყველა Chatcolor (ჩატის ფერები)',
      'Donator ზონაში წვდომა',
    ],
    topPerksKa: ['სპეციალური Discord როლი + 5 კიტი (SPONSOR 3 სთ)', 'x5 Gear Key და +8 PlayerVaults (/pv 1-8)', 'ყველა Chatcolor და სრული ბრძანებების პაკეტი'],
    chatPrefixPreview: {
      prefix: '[SPONSOR]',
      color: '#36F27A',
      sampleMessageKa: 'გამარჯობა! SPONSOR კიტი და სპეციალური როლი გააქტიურებულია!',
    },
    faq: [
      {
        q: 'რით გამოირჩევა BoxPvp SPONSOR რანკი?',
        a: 'SPONSOR მოიცავს ყველა ქვედა რანკის პრივილეგიას, უძლიერეს SPONSOR კიტს (Cooldown: 3 სთ) და სპეციალურ როლს ჩვენს Discord სერვერზე.',
      },
      {
        q: 'როგორ მივიღებ Discord სერვერის სპეციალურ როლს?',
        a: 'რანკის შეძენისას თიქეთშივე მოგენიჭებათ სპეციალური SPONSOR როლი Discord-ზე.',
      },
    ],
  },
];

export function getRanksByMode(mode: RankMode): RankConfig[] {
  return mode === 'smp' ? SMP_RANKS : BOXPVP_RANKS;
}

export function getRankById(mode: RankMode, rankId: string): RankConfig | undefined {
  const list = getRanksByMode(mode);
  return list.find((r) => r.id.toLowerCase() === rankId.toLowerCase());
}

export interface CumulativeRankData {
  rank: RankConfig;
  allCommands: string[];
  inheritedRanks: RankConfig[];
  previousRank?: RankConfig;
  nextRank?: RankConfig;
  upgradeDiffPrice?: string;
}

export function getCumulativeRankData(mode: RankMode, rankId: string): CumulativeRankData | undefined {
  const list = getRanksByMode(mode);
  const idx = list.findIndex((r) => r.id.toLowerCase() === rankId.toLowerCase());
  if (idx === -1) return undefined;

  const rank = list[idx];
  const inheritedRanks = (rank.inherits || [])
    .map((id) => list.find((item) => item.id === id))
    .filter((item): item is RankConfig => Boolean(item));

  const commandSet = new Set<string>();
  for (const inh of inheritedRanks) {
    for (const cmd of inh.ownCommands) {
      commandSet.add(cmd);
    }
  }
  for (const cmd of rank.ownCommands) {
    commandSet.add(cmd);
  }

  const previousRank = idx > 0 ? list[idx - 1] : undefined;
  const nextRank = idx < list.length - 1 ? list[idx + 1] : undefined;
  const upgradeDiffPrice = nextRank ? (nextRank.price - rank.price).toFixed(2) : undefined;

  return {
    rank,
    allCommands: Array.from(commandSet),
    inheritedRanks,
    previousRank,
    nextRank,
    upgradeDiffPrice,
  };
}

export function formatPrice(price: number, currency = '₾'): string {
  return `${price.toFixed(2)}${currency}`;
}

export function formatKitChipKa(kit: KitInfo): string {
  if (kit.cooldownHours) {
    return `${kit.name} · Cooldown: ${kit.cooldownHours} სთ`;
  }
  return kit.name;
}

export function buildTicketMessage(params: {
  mode: RankMode;
  rankName: string;
  price: number;
  nickname?: string;
}): string {
  const modeLabel = params.mode === 'smp' ? 'SMP' : 'BoxPvp';
  const nick = params.nickname && params.nickname.trim().length > 0 ? params.nickname.trim() : 'ჩემი_ნიკი';
  return `გამარჯობა! მინდა შევიძინო ${modeLabel} – ${params.rankName} (${formatPrice(params.price)}). ნიკი: ${nick}`;
}
