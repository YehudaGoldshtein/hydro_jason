/**
 * Version 1: "Original Comfort" Marketing Angle
 * 
 * Marketing Strategy: Focus on comfort, relief from physical pain, and freedom for the parent.
 * Key Themes: Hands-free, anti-colic benefits, quality materials, peace of mind.
 * 
 * Created: Dec 2025
 * Status: Original baseline version
 */

export const content = {
  // ==================== GLOBAL ====================
  global: {
    brandName: 'FeedEase',
    brandNameHebrew: 'Feed-Ease',
    productName: 'Feed-Ease',
    currency: '₪',
    cartCount: 3,
  },

  // ==================== ANNOUNCEMENT BAR ====================
  announcementBar: {
    items: [
      {
        id: 'customers',
        text: '5000+ לקוחות',
        mobileText: '5000+ לקוחות',
      },
      {
        id: 'gift',
        text: 'מוצר משלים במתנה',
        mobileText: 'מוצר משלים במתנה',
      },
      {
        id: 'shipping',
        text: 'משלוח חינם עד הבית',
        mobileText: 'משלוח חינם עד הבית',
      },
    ],
  },

  // ==================== HEADER ====================
  header: {
    navigation: [
      { label: 'שאלות נפוצות', href: '/faq' },
      { label: 'ביקורות', href: '/reviews' },
      { label: 'איך זה עובד?', href: '/how-it-works' },
      { label: 'המוצרים שלנו', href: '/products' },
    ],
  },

  // ==================== HERO VIDEO CAROUSEL ====================
  heroVideoCarousel: {
    slides: [
      {
        id: 1,
        type: 'video' as const,
        alt: 'תינוק אוכל בנוחות עם Feed-Ease',
      },
      {
        id: 2,
        type: 'image' as const,
        alt: 'המוצר שלנו בפעולה',
      },
    ],
    ariaLabels: {
      previous: 'הקודם',
      next: 'הבא',
      pause: 'השהה',
      play: 'הפעל',
      goToSlide: 'עבור לשקופית',
    },
    placeholders: {
      video: 'VIDEO',
      image: 'IMAGE',
      browserNotSupported: 'הדפדפן שלך לא תומך בווידאו.',
    },
  },

  // ==================== HERO SECTION ====================
  hero: {
    headline: {
      part1: 'סוף סוף, ',
      part2Highlight: 'היד השלישית',
      part3: ' שתמיד חלמת עליה',
    },
    subtitle:
      'ערכת Feed-Ease היא לא רק כרית, היא החופש שלך. הניחי את הבקבוק בזווית יציבה ובטוחה שמונעת נזילה, והחמי מזון איכות רגע במשרדים שלך פנויות לתינוקי למנוחה',
    socialProofBadge: '5,000+ לקוחות מרוצים',
    rating: '4.8',
    benefits: [
      {
        id: 'quality',
        text: 'התחייבות לאיכות- 100% כותנה',
      },
      {
        id: 'returns',
        text: 'החזרים עד 30 יום - אפס סיכון',
      },
      {
        id: 'shipping',
        text: 'משלוח עד הבית בחינם (לזמן מוגבל)',
      },
    ],
  },

  // ==================== BENEFITS LIST ====================
  benefitsList: {
    items: [
      {
        id: 'quality',
        text: 'התחייבות לאיכות- 100% כותנה',
        mobileText: '100% כותנה',
      },
      {
        id: 'returns',
        text: 'החזרים עד 30 יום - אפס סיכון',
        mobileText: 'החזרות 30 יום',
      },
      {
        id: 'shipping',
        text: 'משלוח עד הבית בחינם (לזמן מוגבל)',
        mobileText: 'משלוח חינם',
      },
    ],
  },

  // ==================== PRICING SECTION ====================
  pricing: {
    heading: 'קנו עכשיו במחירי השקה חסרי תקדים',
    options: [
      {
        id: 'option1',
        label: 'קנה 1',
        shippingText: 'משלוח חינם עד הבית',
      },
      {
        id: 'option2',
        label: 'קנה 2',
        floatingBadge: 'לבית ולבחוץ',
        shippingText: 'משלוח חינם עד הבית',
      },
      {
        id: 'option3',
        label: 'קנה 3',
        floatingBadge: 'לך ולחברה',
        shippingText: 'משלוח חינם עד הבית',
      },
    ],
    ctaButton: {
      default: 'אני רוצה פחות גזים לתינוק שלי',
      submitting: 'מוסיף לעגלה...',
    },
    savingsText: 'חסוך',
    paymentMethodsAlt: 'אמצעי תשלום - Visa, Mastercard, Bit, Apple Pay, Google Pay',
  },

  // ==================== WHY CHOOSE US ====================
  whyChooseUs: {
    heading: 'למה הורים בוחרים ב-EasyFeed בראש שקט?',
    features: [
      {
        id: 1,
        title: 'בטיחות לפני הכל',
        description: 'עיצוב ארגונומי המותאם למבנה התינוק ומונע החלקה.',
      },
      {
        id: 2,
        title: 'שירות אישי',
        description: 'אבא ואמא (תיתיר משמש) לכל שאלה, משלוח מהיר ואחריות.',
      },
      {
        id: 3,
        title: 'חומרים איכותיים',
        description: 'בד קטיפתי, נושם ועמיד למכונה. בניין לכביסה במכונה.',
      },
      {
        id: 4,
        title: 'התאמה אוניברסלית',
        description: 'מתאים לכל סוגי הבקבוקים והסטנדרטים בשוק.',
      },
    ],
  },

  // ==================== PAYMENT & TESTIMONIAL ====================
  paymentTestimonial: {
    quote: '"לא האמנתי שמשהו ככה פשוט יכול לכל כך לשנות את היממה"',
    author: 'זהבה ג.',
    authorAlt: 'זהבה ג.',
  },

  // ==================== PROBLEM SOLUTION ====================
  problemSolution: {
    imageAlt: 'תינוק אוכל בנוחות עם Feed-Ease',
    imagePlaceholder: {
      title: 'הוסיפו כאן תמונה',
      subtitle: 'מומלץ יחס ריבועי 1:1',
    },
    mainHeadline: 'למה את מחכה שהגבי ישבר?',
    subheadline:
      'כל האמא פטפטת עם האלתור פיש איטמטיה טופרם שקר - את צום מספקח "יכל", את תיכית את זה לעצמך',
    painPoints: [
      {
        id: 1,
        text: 'במטפט שנדט שנע דוח המינלייכי כי כהניה טעלדלה דבא שונה של ',
        highlight: 'המינדס',
      },
      {
        id: 2,
        text: 'היד עלי בלתדך ',
        highlight: '"וגומרה"',
        textAfter: ', אבל את סמטפנת לסרחד אחרה',
      },
      {
        id: 3,
        text: 'בטטכסע לטסען אחרי תכאבל, תפתל סמטטפיים-דים שונע על נזיזות ',
        highlight: 'עתיס',
      },
      {
        id: 4,
        text: 'היפטבא טעלי עבידרככהיי, זאת תיפטבע באתלהא הזרטדן היב 32 ',
        highlight: 'דקה',
      },
      {
        id: 5,
        text: 'את עשוסע ומדך דין פזרוו, זאת זאת תידיערים שהדיי - ',
        highlight: 'עכשיו',
      },
    ],
    solutionBox: {
      headline: 'הפתרון: היד השלישית שתמיד חלמת עליה',
      bodyText:
        'בטמטפט שקר יחנות מטסען, הטמטרע כל נטלה שונשה את הבתדבא בינטבין - את מתקבלע ילרים פגושות להתווטען (לצפיה: לירר את למפנות), היתינו עקטטיה מומבלכה יציבה ובטוחה, שמונעת נזיס',
      italicText: 'חייבו מעוסס להרליקו',
    },
    videoPlaceholder: {
      title: 'וידאו סטורי',
      subtitle: 'תינוק אוכל בנוחות עם Feed-Ease',
    },
  },

  // ==================== ANTI-COLIC BENEFITS ====================
  antiColicBenefits: {
    headline: 'שרפת הרבה כסף על "בקבוקים נגד גזים"?',
    subtext:
      'בואי נדבר תכלס: גם הבקבוק הכי משוכלל לא יעזור אם היד שלך מתעייפת והזווית צונחת. ברגע שהבקבוק יורד למטה – האוויר נכנס, והגזים בדרך.',
    highlightText: 'הכרית הזו הופכת כל בקבוק פשוט למערכת אנטי-קוליק מושלמת',
    benefits: [
      {
        id: 1,
        text: 'התינוק אוכל נקי ורגוע: 100% חלב, 0% בועות אוויר שגורמות לכאב',
      },
      {
        id: 2,
        text: 'את חוסכת הוצאות מיותרות על מותגים – ומשקיעה בפתרון שבאמת עובד.',
      },
      {
        id: 3,
        text: 'והבונוס? הידיים שלך משתחררות לקפה חם, והלב שלך שקט מדאגות',
      },
    ],
    ctaButton: {
      default: 'עזבי מותגים - תסדרי לו את הזווית',
      submitting: "מעביר לצ'קאאוט...",
    },
  },

  // ==================== SUITABILITY CHECK ====================
  suitabilityCheck: {
    heading: 'רגע לפני, בואי נוודא שהערכת הזו באמת מתאימה לך',
    notForYou: {
      heading: 'הערכה הזו לא בשבילך אם:',
      items: [
        'את מחפשת "ביייביסיטר" שיחליף השגחת הורים',
        'את מתעקשת שרק מותגים יקרים עובדים (ומעדיפה לשפוך כסף סתם)',
        'את לא מאמינה שהקריב את הגב והבריאות שלך זה חלק מחוויית "אמא טובה"',
      ],
    },
    perfectForYou: {
      heading: 'הערכה הזו בשבילך אם:',
      items: [
        'נמאס לך "לבנות שריפות" של גזים ואת רוצה למנוע אותם מראש',
        'הבנת שחיתול מגולגל זה הימור מסוכן, ואת עוברת לפתרון יציב',
        'את חייבת את הידיים שלך בחזרה (לקפה או לגדולים) בלי להתנצל על זה',
      ],
    },
  },

  // ==================== BENEFITS GRID ====================
  benefitsGrid: {
    heading: 'כל היתרונות שיהפכו את החיים שלך לקלים יותר',
    items: [
      {
        title: 'ביי ביי לכאבי ידיים',
        text: 'החזקה ממושכת של הבקבוק גורמת לעומס וכאבים. הכרית משחררת אותך מהמאמץ הפיזי השוחק.',
        imagePlaceholder: 'https://placehold.co/600x400/fff6f2/52423d?text=Placeholder',
      },
      {
        title: 'הצלה להורי תאומים',
        text: 'סוף סוף אפשר להאכיל שני תינוקות במקביל בלי להזדקק לעוד זוג ידיים. מתנה משמיים.',
        imagePlaceholder: 'https://placehold.co/600x400/fff6f2/52423d?text=Placeholder',
      },
      {
        title: 'פחות גזים, יותר שלווה',
        text: 'הכרית מניחה את הבקבוק בזווית הנכונה והאופטימלית להאכלה. הזווית המדויקת הזו מונעת כניסת אוויר מיותרת.',
        imagePlaceholder: 'https://placehold.co/600x400/fff6f2/52423d?text=Placeholder',
      },
      {
        title: 'קלה וניידת לכל מקום',
        text: 'הערכת קלת משקל ונוחה לנשיאה, כך שהחופש שלך הולך איתך לכל מקום.',
        imagePlaceholder: 'https://placehold.co/600x400/fff6f2/52423d?text=Placeholder',
      },
      {
        title: 'די לאלתורים!',
        text: 'הפסיקי להעמיד בקבוקים על חיתולים מגולגלים. ה-EasyFeed הוא הפתרון המקצועי והיציב.',
        imagePlaceholder: 'https://placehold.co/600x400/fff6f2/52423d?text=Placeholder',
      },
      {
        title: 'צעד ראשון לעצמאות',
        text: 'הכרית מאפשרת לתינוק להתחיל לפתח הרגלי אכילה עצמאיים בסביבה בטוחה ותומכת.',
        imagePlaceholder: 'https://placehold.co/600x400/fff6f2/52423d?text=Placeholder',
      },
    ],
  },

  // ==================== HOW IT WORKS ====================
  howItWorks: {
    heading: 'אז איך בדיוק זה הופך להיות כל כך פשוט?',
    steps: [
      {
        number: '1',
        title: 'הניחי את הכרית',
        text: 'הבד הקטיפתי יעניק לתינוק תחושת רוגע מיידית.',
        highlight: false,
      },
      {
        number: '2',
        title: 'הצמידי את הבקבוק',
        text: 'רצועת האחיזה הגמישה תחזיק אותו יציב בזווית הנכונה.',
        highlight: true,
      },
      {
        number: '3',
        title: 'שחררי את הידיים',
        text: 'התינוק אוכל בבטחה, ואת סוף סוף מתפנה לעצמך.',
        highlight: false,
      },
    ],
  },

  // ==================== SOCIAL PROOF / REVIEWS ====================
  socialProof: {
    badge: 'צילום מסך מפיד אמיתי (UGC)',
    heading: 'ככה זה נראה כשהבטן רגועה והלילות חוזרים לשקט',
    subheading:
      'פיד תגובות אמיתי, כמו צילום מסך מפייסבוק: זמן אמת, רכישה מאומתת, והורים שמגיבים.',
    verifiedPurchase: 'רכישה מאומתת',
    likeButton: 'אהבתי',
    replyButton: 'הגב',
    reviews: [
      {
        name: 'יעל לוי',
        initials: 'יל',
        text: 'היינו בסיוט של צרחות כל ערב ב-18:00. מהרגע שהתחלנו להשתמש בכרית, רואים בעיניים איך הבועות נשארות למעלה ולא נכנסות לפטמה. ההתקפים נעלמו כמעט לגמרי. זה לא מוצר פינוק, זה מוצר בריאות.',
        timeAgo: 'לפני יומיים',
        likes: 132,
        comments: 9,
      },
      {
        name: 'דנה ישראלי',
        initials: 'די',
        text: 'שרפנו הון על בקבוקים מיוחדים נגד גזים ושום דבר לא עזר. רק כשהבנתי שהבעיה היא הזווית ולא הבקבוק, הכל השתנה. הילדה אוכלת רגוע, לא בולעת אוויר, והלילות שלנו חזרו להיות שפויים. חבל שלא הכרתי את זה קודם.',
        timeAgo: 'לפני 4 שעות',
        likes: 214,
        comments: 17,
      },
      {
        name: 'מיכל כהן',
        initials: 'מק',
        text: 'חשבתי שהכרית זה סתם לנוחות שלי, אבל הייתי בשוק מההשפעה על הבטן שלו. ברגע שהבקבוק יציב ולא זז מילימטר, אין בועות אוויר. הוא מסיים לאכול, עושה גרעפס והולך לישון. פשוט קסם.',
        timeAgo: 'לפני 3 ימים',
        likes: 98,
        comments: 6,
      },
      {
        name: 'שני דוידי',
        initials: 'שד',
        text: "הרופא אמר ש'זה יעבור לבד', אבל לא היינו מוכנים לחכות שהם יסבלו. הכרית הזו הצילה אותנו. הם אוכלים בזווית מושלמת, רגועים לחלוטין, ואנחנו זכינו בחיים שלנו בחזרה. חובה לכל הורה.",
        timeAgo: 'לפני שבוע',
        likes: 167,
        comments: 11,
      },
    ],
  },

  // ==================== FOUNDER STORY ====================
  founderStory: {
    headline: 'הבנתי בדרך הקשה: כדי להיות אמא רגועה בשבילו, אני חייבת לדאוג גם לידיים שלי',
    paragraph1:
      'רציתי להיות שם בשבילו ב-100%, אבל הגב ושורש כף היד שלי פשוט קרסו מהעומס. מצאתי את עצמי מתמקדת בחוסר הנוחות שלי במקום להנות מהרגע. ניסיתי לאלתר "מגדלי כריות", אבל שום דבר לא החזיק באמת, והפחד שזה ייפול על הבייבי לא נתן לי מנוח.',
    paragraph2Highlight:
      'אי אפשר לטפל בתינוק בנחת כשכואב לך הגוף. כדי שהתינוק יהיה רגוע - את חייבת להיות פנויה ונינוחה.',
    paragraph3:
      'משם נולדה השליחות שלי: ליצור את "היד הנוספת" שתעזור לכולנו. Feed Ease הוא לא סתם מחזיק – הוא מערכת שנותנת לתינוק ארוחה בטוחה ויציבה (בזווית בריאה), ומחזירה לך את הידיים, את השפיות ואת הקפה החם.',
  },

  // ==================== BONUS PRODUCTS ====================
  bonusProducts: {
    heading: 'מהסלון ועד הטיול בעגלה: סגרנו לך את הפינה עם 2 מוצרי חובה (במתנה!)',
    includedBadge: 'כלול בחבילה',
    products: [
      {
        id: 1,
        title: 'ידיות אוניברסליות',
        subtitle: 'מתאימות לכל סוג בקבוק!',
        description:
          'ידיות איכותיות שמתאימות לכל סוגי הבקבוקים בשוק - לא משנה איזה בקבוק יש לך, זה יתאים בדיוק.',
        imagePlaceholder: 'https://placehold.co/400x400/fff6f2/52423d?text=Universal+Handles',
      },
      {
        id: 2,
        title: 'מחזיק בקבוק לעגלה',
        subtitle: 'כדי שיהיה לך נוח גם בחוץ',
        description:
          'מתלה נוח ומעשי שמתחבר לעגלת התינוק, מאפשר לך להאכיל בבחות גם בטיולים ובחוץ.',
        imagePlaceholder: 'https://placehold.co/400x400/fff6f2/52423d?text=Stroller+Holder',
      },
      {
        id: 3,
        title: 'הכרית החכמה',
        subtitle: 'הפתרון שלך לידיים חופשיות',
        description:
          'כרית מעוצבת ואיכותית שמחזיקה את הבקבוק במקום בזמן ההאכלה, כך שהידיים שלך פנויות לעשות מה שאת רוצה.',
        imagePlaceholder: 'https://placehold.co/400x400/fff6f2/52423d?text=Smart+Pillow',
      },
    ],
  },

  // ==================== INDEPENDENCE VIDEO ====================
  independenceVideo: {
    heading: 'זה נראה כמו קסם, אבל זו פשוט עצמאות בפעולה',
    videoAlt: 'וידאו הדגמה',
    videoPlaceholder: 'Video+Placeholder',
    ctaButton: {
      default: 'כן, אני רוצה את החופש שלי בחזרה!',
      submitting: "מעביר לצ'קאאוט...",
    },
    paymentMethodsAlt: 'אמצעי תשלום',
    paymentIconsPlaceholder: 'Payment+Icons+Image',
    avatarAlt: 'אמא',
    socialProofText: 'הצטרפי למאות אמהות שכבר נהנות מהחופש',
  },

  // ==================== GUARANTEE ====================
  guarantee: {
    heading: 'ההתחייבות המוחלטת שלנו',
    subheading: '100% שקט נפשי או כסף בחזרה',
    bodyText:
      'נסי את ה-Feed-Ease למשך 30 ימים. אנחנו כל כך בטוחים שזה ישנה לך את החיים, שאם לא תרגישי ירידה בלחץ - פשוט תקבלי החזר כספי מלא, בלי שאלות ובלי אותיות קטנות.',
  },

  // ==================== FAQ ====================
  faq: {
    heading: 'שאלות נפוצות',
    items: [
      {
        question: 'מאיזה גיל זה מתאים?',
        answer:
          'הערכה מתאימה לשימוש מגיל לידה (0+) ועד שהתינוק מתחיל להחזיק בקבוק באופן עצמאי ויציב.',
      },
      {
        question: 'האם זה מתאים לכל סוגי הבקבוקים?',
        answer:
          'כן, רצועת האחיזה האלסטית והאוניברסלית תוכננה להתאים ל-99% מהבקבוקים הסטנדרטיים בשוק, רחבים וצרים כאחד.',
      },
      {
        question: 'האם זה בטוח לשימוש?',
        answer:
          'בהחלט. המוצר עשוי מחומרים בטוחים ורכים. חשוב להדגיש: המוצר נועד לסייע להורה, אך אינו מחליף השגחת מבוגר. תמיד יש להישאר בסביבת התינוק בזמן ההאכלה.',
      },
      {
        question: 'איך מכבסים את זה?',
        answer:
          'פשוט מאוד! ניתן לשלוף את הכרית ולכבס במכונת כביסה בתוכנית עדינה (עד 30 מעלות). ייבוש באוויר הפתוח (לא במייבש).',
      },
      {
        question: 'תוך כמה זמן זה מגיע?',
        answer: 'זמן המשלוח הממוצע הוא בין 3 ל-5 ימי עסקים, תלוי במיקום שלך בארץ.',
      },
    ],
  },

  // ==================== FINAL CTA ====================
  finalCta: {
    heading: 'הגיע הזמן להחזיר לעצמך את הידיים, את הזמן ואת השקט.',
    ctaButton: {
      default: 'לחצי כאן והזמיני את הערכה שלך עכשיו!',
      submitting: "מעביר לצ'קאאוט...",
    },
    paymentMethodsAlt: 'אמצעי תשלום',
    paymentIconsPlaceholder: 'Payment+Methods',
    guaranteeText: '100% החזר כספי מובטח ל-30 יום',
  },

  // ==================== STICKY BUY BAR ====================
  stickyBuyBar: {
    productName: 'FeedEase',
    stockWarning: 'המלאי מוגבל',
    ctaButton: {
      default: 'לרכישה | 199 ₪',
      submitting: "מעביר לצ'קאאוט...",
    },
    fallbackImageAlt: 'FeedEase',
  },

  // ==================== FOOTER ====================
  footer: {
    about: {
      heading: 'אודות Feed-Ease',
      text: 'המוצר המושלם לאמהות שמעוניינות בהנקה נוחה, קלה ונעימה. אנחנו כאן כדי להקל עליך את תהליך ההנקה.',
    },
    quickLinks: {
      heading: 'קישורים מהירים',
      links: [
        { label: 'מדיניות פרטיות', href: '#' },
        { label: 'תנאי שימוש', href: '#' },
        { label: 'תקנון האתר', href: '#' },
      ],
    },
    contact: {
      heading: 'צרי קשר',
      phone: '055-9397716',
      email: 'feedeasebrand@gmail.com',
      whatsappNumber: '972559397716',
      followUs: 'עקבי אחרינו',
    },
    whatsappButton: {
      ariaLabel: 'צ\'אט וואטסאפ',
      whatsappNumber: '972559397716',
    },
  },
};

export type LandingContent = typeof content;

