import type { SkinMode } from '../lib/skin';

export interface GameModeConfig {
  id: 'smp' | 'boxpvp' | 'oneblock';
  title: string;
  name: string;
  titleKa: string;
  shortDescKa: string;
  fullDescKa: string;
  image: string;
  locked: boolean;
  badgeKa: string;
  storePath?: string;
  highlightsKa: string[];
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface TermsSection {
  id: string;
  title: string;
  paragraphs: string[];
}

const GAME_MODES: GameModeConfig[] = [
  {
    id: 'smp',
    title: 'SMP',
    name: 'SMP',
    titleKa: 'SMP რეჟიმი',
    shortDescKa:
      'კლასიკური გადარჩენის რეჟიმი მეგობრებთან ერთად, ბაზების მშენებლობით, ეკონომიკითა და დაბალანსებული გეიმპლეით.',
    fullDescKa:
      'SMP რეჟიმი გთავაზობთ სტაბილურ და დახვეწილ გადარჩენის გარემოს. ააშენეთ საკუთარი ტერიტორია, განავითარეთ რესურსები, გამოიყენეთ დამატებითი სახლის წერტილები და ისარგებლეთ კომფორტული სამუშაო ბრძანებებით.',
    image: '/assets/gamemodes/smp.png',
    locked: false,
    badgeKa: 'აქტიური',
    storePath: '/store/smp',
    highlightsKa: [
      '5 უნიკალური რანკი: VIP-დან SPONSOR-მდე',
      'დამატებითი სახლები (Homes) და პორტატული მენიუები',
      'ექსკლუზიური კიტები და ItemEdit პერსონალიზაცია',
    ],
  },
  {
    id: 'boxpvp',
    title: 'BoxPvp',
    name: 'BoxPvp',
    titleKa: 'BoxPvp რეჟიმი',
    shortDescKa:
      'დინამიკური არენა-ბრძოლები, რესურსების მოპოვება, გასაღებები (Gear Keys), საცავები (PlayerVaults) და სწრაფი PvP.',
    fullDescKa:
      'BoxPvp შექმნილია ინტენსიური ბრძოლებისა და სწრაფი პროგრესის მოყვარულთათვის. მოიპოვეთ რესურსები, გახსენით Gear Key-ები, შეინახეთ აღჭურვილობა PlayerVault-ებში და შედით დონატორების ზონაში.',
    image: '/assets/gamemodes/boxpvp.png',
    locked: false,
    badgeKa: 'აქტიური',
    storePath: '/store/boxpvp',
    highlightsKa: [
      '5 ეგვიპტური თემატიკის რანკი: NILE-დან SPONSOR-მდე',
      'Gear Key გასაღებები და +8-მდე PlayerVault (/pv)',
      'დონატორის ზონა და სწრაფი Cooldown კიტები',
    ],
  },
  {
    id: 'oneblock',
    title: 'OneBlock',
    name: 'OneBlock',
    titleKa: 'OneBlock რეჟიმი',
    shortDescKa:
      'ახალი რეჟიმი მზადების პროცესშია. დაიწყე ერთი ბლოკიდან და გააფართოვე საკუთარი კუნძული.',
    fullDescKa:
      'OneBlock რეჟიმზე მიმდინარეობს აქტიური სამუშაოები. მალე შეძლებთ ერთი ბლოკიდან საკუთარი სამყაროს აშენებას. სიახლეების გასაგებად შემოგვიერთდით Discord სერვერზე.',
    image: '/assets/gamemodes/oneblock.png',
    locked: true,
    badgeKa: 'SOON / მალე',
    highlightsKa: [
      'რეჟიმი ამჟამად დახურულია და მუშავდება',
      'რანკების შეძენა დროებით მიუწვდომელია',
      'გახსნის თარიღი გამოცხადდება Discord-ზე',
    ],
  },
];

export const SITE_CONFIG = {
  serverName: 'ADRENALINEE',
  ip: 'adrenalinee.run',
  discordUrl: 'https://dsc.gg/adrenalinee',
  ping: {
    min: 60,
    max: 90,
  },
  currency: '₾',
  showLiveStatus: true,
  showCardDetails: false,
  gameModeImageRatio: '1983 / 793',
  skinMode: 'online-first' as SkinMode,
  assets: {
    logo: '/assets/logo/logo.png',
    favicon: '/assets/logo/favicon.png',
    bannerThumbnail: '/assets/banner/thumbnail.png',
    defaultSkin: '/assets/skins/default.png',
    clickSound: '/assets/sounds/click.ogg',
  },
  hero: {
    kicker: 'ოფიციალური სერვერის მაღაზია',
    headline: 'გააძლიერე შენი თამაში ADRENALINEE-ზე',
    subtitle:
      'აირჩიე სასურველი რანკი SMP ან BoxPvp რეჟიმისთვის, მიიღე უნიკალური ბრძანებები, კიტები და პრივილეგიები. ყველა შენაძენი სრულდება სწრაფად და უსაფრთხოდ ჩვენს ოფიციალურ Discord სერვერზე.',
    primaryCta: 'მაღაზია',
    secondaryCta: 'Discord',
  },
  gameModes: GAME_MODES,
  gamemodes: GAME_MODES,
  howToBuySteps: [
    {
      number: '01',
      title: 'აირჩიე სასურველი რანკი',
      description:
        'გადადი მაღაზიაში, შეადარე SMP ან BoxPvp რანკების პრივილეგიები და დააჭირე ღილაკს „ყიდვა“.',
    },
    {
      number: '02',
      title: 'გახსენი თიქეთი Discord-ზე',
      description:
        'გადადი ჩვენს ოფიციალურ Discord სერვერზე (dsc.gg/adrenalinee) და გახსენი თიქეთი შესაბამის არხში.',
    },
    {
      number: '03',
      title: 'გაგზავნე ნიკი და მიიღე რანკი',
      description:
        'მიუთითე შენი Minecraft ნიკი და სასურველი რანკი. დადასტურების შემდეგ რანკი გაგიაქტიურდება სერვერზე.',
    },
  ] as StepItem[],
  howToJoinSteps: [
    {
      number: '01',
      title: 'დააკოპირე სერვერის IP',
      description:
        'დააჭირე მისამართს adrenalinee.run საიტის ზედა პანელში ან ბანერზე, რათა მყისიერად დააკოპირო.',
    },
    {
      number: '02',
      title: 'დაამატე სერვერი Minecraft-ში',
      description:
        'გახსენი Minecraft, გადადი Multiplayer -> Add Server და ჩასვი დაკოპირებული IP მისამართი.',
    },
    {
      number: '03',
      title: 'შემოდი და დაიწყე თამაში',
      description:
        'შემოუერთდი სერვერს, აირჩიე სასურველი გეიმ მოუდი (SMP ან BoxPvp) და დაიწყე თავგადასავალი.',
    },
  ] as StepItem[],
  terms: {
    title: 'შეძენის პირობები და წესები',
    updatedAt: 'განახლებულია: 2026 წელი',
    intro:
      'წინამდებებარე გვერდი განსაზღვრავს ADRENALINEE (adrenalinee.run) სერვერზე რანკებისა და პრივილეგიების შეძენის ძირითად პირობებს. გთხოვთ, ყურადღებით გაეცნოთ ქვემოთ მოცემულ პუნქტებს შეძენამდე.',
    sections: [
      {
        id: 'payment-method',
        title: '1. შეძენის პროცედურა (Discord თიქეთი)',
        paragraphs: [
          'ვებსაიტზე არ ხდება საბანკო ბარათის მონაცემების შეყვანა ან ავტომატური გადახდა. ვებსაიტი წარმოადგენს ოფიციალურ კატალოგს რანკებისა და პრივილეგიების გასაცნობად.',
          'ნებისმიერი რანკის შეძენა ხორციელდება მხოლოდ ჩვენს ოფიციალურ Discord სერვერზე (https://dsc.gg/adrenalinee) თიქეთის (Ticket) გახსნის გზით, სერვერის ადმინისტრაციასთან უშუალო კომუნიკაციით.',
        ],
      },
      {
        id: 'duration',
        title: '2. რანკის მოქმედების ვადა',
        paragraphs: [
          'ყველა რანკის მოქმედების სტანდარტული ვადა შეადგენს 4 კვირას (1 თვე) გააქტიურების მომენტიდან.',
          'ვადის გასვლის შემდეგ მოთამაშეს შეუძლია სურვილისამებრ გააგრძელოს ან განაახლოს რანკი Discord თიქეთის მეშვეობით.',
        ],
      },
      {
        id: 'activation',
        title: '3. რანკის გააქტიურება და ნიკის სიზუსტე',
        paragraphs: [
          'მოთამაშე ვალდებულია თიქეთში ზუსტად მიუთითოს საკუთარი Minecraft ნიკი (Nickname) და არჩეული რეჟიმი (SMP ან BoxPvp).',
          'გადახდის დადასტურების შემდეგ რანკის გააქტიურება ხდება სერვერზე უმოკლეს დროში ადმინისტრაციის მიერ.',
        ],
      },
      {
        id: 'rules-and-refunds',
        title: '4. ზოგადი პირობები და სერვერის წესები',
        paragraphs: [
          'რანკის შეძენა არ ათავისუფლებს მოთამაშეს სერვერის საერთო წესების დაცვის ვალდებულებისგან. წესების უხეში დარღვევის შემთხვევაში ადმინისტრაცია იტოვებს უფლებას გამოიყენოს შესაბამისი სასჯელი.',
          'ციფრული პრივილეგიის გააქტიურების შემდეგ თანხის უკან დაბრუნება არ ხორციელდება, გარდა ადმინისტრაციასთან წინასწარ შეთანხმებული გამონაკლისი ტექნიკური შემთხვევებისა.',
        ],
      },
    ] as TermsSection[],
  },
  footer: {
    disclaimer:
      'ეს ვებსაიტი და სერვერი ADRENALINEE არ არის დაკავშირებული Mojang AB-სთან ან Microsoft-თან. Minecraft არის Mojang AB-ის სავაჭრო ნიშანი.',
    copyright: '© 2026 ADRENALINEE (adrenalinee.run). ყველა უფლება დაცულია.',
  },
} as const;
