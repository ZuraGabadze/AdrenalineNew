export type StaffGroup = 'owner' | 'developer';

export interface StaffMember {
  id: string;
  name: string;
  role: StaffGroup;
  group: StaffGroup;
  roleTitleKa: string;
  discord: string;
  discordUsername: string;
  minecraftName: string;
  namemcUrl?: string;
  skinFile?: string;
  skinPath: string;
  bioKa: string;
}

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'chabskeyyy',
    name: 'CHABSKEYYY',
    role: 'owner',
    group: 'owner',
    roleTitleKa: 'მფლობელი (Owner)',
    discord: 'chabskeyyyy',
    discordUsername: 'chabskeyyyy',
    minecraftName: 'CHABSKEYYY',
    namemcUrl: 'https://namemc.com/profile/CHABSKEYYY',
    skinFile: 'skins/chabskeyyy.png',
    skinPath: '/assets/skins/chabskeyyy.png',
    bioKa: 'სერვერის დამფუძნებელი და მთავარი ადმინისტრატორი. პასუხისმგებელია პროექტის განვითარებასა და მოთამაშეების მხარდაჭერაზე.',
  },
  {
    id: 'saito',
    name: 'SAITO',
    role: 'owner',
    group: 'owner',
    roleTitleKa: 'მფლობელი (Owner)',
    discord: 'Ryota52_',
    discordUsername: 'Ryota52_',
    minecraftName: 'SAITO',
    namemcUrl: 'https://namemc.com/profile/SAITO',
    skinFile: 'skins/saito.png',
    skinPath: '/assets/skins/saito.png',
    bioKa: 'სერვერის თანადამფუძნებელი და მენეჯერი. კურირებს გეიმპლეის ბალანსს, ივენთებსა და საზოგადოების მართვას.',
  },
  {
    id: 'jajo_1121',
    name: 'Jajo_1121',
    role: 'developer',
    group: 'developer',
    roleTitleKa: 'დეველოპერი (Developer)',
    discord: 'Ankaadev',
    discordUsername: 'Ankaadev',
    minecraftName: 'Jajo_1121',
    namemcUrl: 'https://namemc.com/profile/Jajo_1121',
    skinFile: 'skins/jajo_1121.png',
    skinPath: '/assets/skins/jajo_1121.png',
    bioKa: 'სერვერის სისტემური დეველოპერი. მუშაობს პლაგინების კონფიგურაციაზე, ოპტიმიზაციასა და უსაფრთხოებაზე.',
  },
  {
    id: 'mchedlishvili',
    name: 'Mchedlishvili',
    role: 'developer',
    group: 'developer',
    roleTitleKa: 'დეველოპერი (Developer)',
    discord: 'deleteduser_718f61',
    discordUsername: 'deleteduser_718f61',
    minecraftName: 'Mchedlishvili',
    namemcUrl: 'https://namemc.com/profile/Mchedlishvili',
    skinFile: 'skins/mchedlishvili.png',
    skinPath: '/assets/skins/mchedlishvili.png',
    bioKa: 'ტექნიკური დეველოპერი. პასუხისმგებელია SMP და BoxPvp მექანიკების გამართულ მუშაობაზე.',
  },
  {
    id: 'kaulmc',
    name: 'KaulMc',
    role: 'developer',
    group: 'developer',
    roleTitleKa: 'დეველოპერი (Developer)',
    discord: 'Kaulavar',
    discordUsername: 'Kaulavar',
    minecraftName: 'KaulMc',
    namemcUrl: 'https://namemc.com/profile/KaulMc',
    skinFile: 'skins/kaulmc.png',
    skinPath: '/assets/skins/kaulmc.png',
    bioKa: 'სერვერის დეველოპერი. მუშაობს ახალ რეჟიმებზე, კიტების ბალანსსა და ტექნიკურ განახლებებზე.',
  },
];

export const STAFF_GROUPS_KA: { id: StaffGroup; titleKa: string; subtitleKa: string }[] = [
  {
    id: 'owner',
    titleKa: 'მფლობელები (Owners)',
    subtitleKa: 'ADRENALINEE-ს ხელმძღვანელობა და პროექტის ადმინისტრაცია',
  },
  {
    id: 'developer',
    titleKa: 'დეველოპერები (Developers)',
    subtitleKa: 'ტექნიკური გუნდი, რომელიც ზრუნავს სერვერის სტაბილურობასა და განახლებებზე',
  },
];
