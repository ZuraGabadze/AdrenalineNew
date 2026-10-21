export interface FaqItem {
  id: string;
  category: 'store' | 'server' | 'ranks';
  categoryLabelKa: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'how-to-buy',
    category: 'store',
    categoryLabelKa: 'მაღაზია და შეძენა',
    question: 'როგორ ხდება რანკის შეძენა საიტზე?',
    answer:
      'აირჩიეთ სასურველი რანკი SMP ან BoxPvp კატეგორიაში და დააჭირეთ ღილაკს „ყიდვა“. გამოჩნდება ფანჯარა მზა ტექსტით — გადადით ჩვენს Discord სერვერზე (https://dsc.gg/adrenalinee), გახსენით თიქეთი და ჩააგდეთ დაკოპირებული შეტყობინება.',
  },
  {
    id: 'rank-duration',
    category: 'ranks',
    categoryLabelKa: 'რანკები და ვადები',
    question: 'რამდენ ხანს მოქმედებს შეძენილი რანკი?',
    answer:
      'ყველა რანკის (როგორც SMP, ისე BoxPvp რეჟიმში) მოქმედების ვადა არის 4 კვირა (1 თვე) გააქტიურების მომენტიდან.',
  },
  {
    id: 'rank-inheritance',
    category: 'ranks',
    categoryLabelKa: 'რანკები და ვადები',
    question: 'მოყვება თუ არა მაღალ რანკს დაბალი რანკების პრივილეგიები?',
    answer:
      'დიახ! ყოველი მომდევნო რანკი სრულად მოიცავს ყველა ქვედა რანკის ბრძანებებსა და კიტებს. მაგალითად, SMP-ის SPONSOR რანკს მოყვება VIP, VIP+, MVP და MVP+ რანკების ყველა ბრძანება და ხუთივე კიტი.',
  },
  {
    id: 'delivery-time',
    category: 'store',
    categoryLabelKa: 'მაღაზია და შეძენა',
    question: 'რამდენ დროში გამიაქტიურდება რანკი გადახდის შემდეგ?',
    answer:
      'Discord თიქეთში გადახდის დადასტურების შემდეგ ადმინისტრაცია რანკს ააქტიურებს რამდენიმე წუთში. სერვერზე ყოფნისას პრივილეგიები მყისიერად აისახება.',
  },
  {
    id: 'server-ip-version',
    category: 'server',
    categoryLabelKa: 'სერვერი და კავშირი',
    question: 'რა არის სერვერის IP მისამართი და პინგი?',
    answer:
      'სერვერის ოფიციალური IP მისამართია adrenalinee.run. საშუალო პინგი საქართველოდან და ევროპიდან შეადგენს 60-90ms-ს.',
  },
  {
    id: 'oneblock-status',
    category: 'server',
    categoryLabelKa: 'სერვერი და კავშირი',
    question: 'როდის გაიხსნება OneBlock რეჟიმი?',
    answer:
      'OneBlock რეჟიმი ამჟამად მუშავდება და მონიშნულია სტატუსით „SOON / მალე“. გახსნის ზუსტი თარიღი გამოცხადდება ჩვენს Discord სერვერზე.',
  },
  {
    id: 'rank-upgrade',
    category: 'ranks',
    categoryLabelKa: 'რანკები და ვადები',
    question: 'შემიძლია თუ არა არსებული რანკის უფრო მაღალ რანკზე განახლება (Upgrade)?',
    answer:
      'დიახ, აქტიური რანკის პერიოდში შეგიძლიათ გახსნათ თიქეთი Discord-ზე და მოითხოვოთ უფრო მაღალ რანკზე გადასვლა ფასთა სხვაობის დამატებით.',
  },
  {
    id: 'profile-nick',
    category: 'store',
    categoryLabelKa: 'მაღაზია და შეძენა',
    question: 'რისთვის გამოიყენება „პროფილი“ ღილაკი საიტის მენიუში?',
    answer:
      '„პროფილი“ საშუალებას გაძლევთ შეინახოთ თქვენი Minecraft ნიკი პირდაპირ ბრაუზერში (პაროლისა და რეგისტრაციის გარეშე), რათა რანკის ყიდვისას თიქეთის ტექსტში თქვენი ნიკი ავტომატურად ჩაისვას.',
  },
];
