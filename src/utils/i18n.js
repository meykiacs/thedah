import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        About: "About me",
        activities: "Fields of Activities",
        Author: "Author",
        Available: "Available",
        awardsAndHonors: 'Awards and Honors',
        bookQuoteMain:
          "Learning without thinking is useless, thinking without learning is dangerous.",
        bookQuoteBody:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa distinctio, officiis, possimus hic officia pariatur id perferendis error porro quia quibusdam et voluptas animi suscipit ipsam tempore soluta quod amet?",
        bookQuoteFrom: "Confucius",
        buyBooks: 'Buy Books',
        paperQuoteMain:
          "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking...",
        paperQuoteBody:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam perspiciatis, omnis officia fugiat modi nulla sed neque ducimus odit qui minus quas facere odio adipisci doloribus delectus tenetur dignissimos officiis?",
        paperQuoteFrom: "Albert Einstein",
        Books: "Books",
        closeQuote: "”",
        CoAuthor: "Co-Author",
        CoAuthors: "Co-Authors",
        comma: ",",
        Contact: "Contact me",
        Courses: "Courses",
        Dashboard: "Dashboard",
        Description: "Description",
        Design: "Design",
        Designer: "Yalda Dehshiri",
        Edition: "Edition",
        edition: "edition",
        enrollInCourses: 'Enroll in Courses',
        Education: 'Education',
        executiveRecords: 'Executive Records',
        firstFooterTitle:
          "PhD in philosophy of education, member of the faculty of Tehran University",
        secondFooterTitle:
          "Associate professor specializing in education and educational psychology",
        thirdFooterTitle:
          "Specialist and flag bearer of creative education and creativity development methods",
        Gallery: "Gallery",
        Home: "Home",
        imageDrop: "Click to add Image or Drop your image here",
        intro:
          "Dr. Afzal al-Sadat Hosseini, though being a professor at the University of Tehran, has always been concerned with educational reforms in the educational system and schools. She has worked for many years to achieve educational reforms and has designed a model that has trained thousands of teachers, administrators, and university professors over several decades…",
        ISBN: "ISBN",
        Link: "Link",
        moreBooks: 'More Books',
        moreInfo: 'More information',
        numberOfPages: "Number of pages",
        Order: "Order",
        openQuote: "“",
        pages: "pages",
        Papers: "Papers",
        Price: "Price",
        Publisher: "Publisher",
        Remove: "Remove",
        rights: "All Rights Reserved.",
        Search: "Search",
        SearchInTheSite: "Search in the site",
        SearchFor: "Search for ...",
        Send: "Send",
        Soon: "Soon",
        subscribeDescription:
          "Send us your e-mail address to know about the courses and the latest news.",
        subscribeTitle: "Join the Newsletter",
        Submit: "Submit",
        T: "T",
        Title: "Title",
        Unavailable: "Unavailable",
        watch: 'Watch',
        Year: "Year of publish",
      },
    },
    fa: {
      translation: {
        About: "درباره‌ی من",
        activities: "زمینه‌های فعالیت",
        Author: "نویسنده",
        Available: "موجود",
        awardsAndHonors: 'جوایز و افتخارات',
        Books: "کتابنامه",
        bookQuoteMain:
          "خواندن بی اندیشیدن بیهوده است، و اندیشیدن بدون خواندن خطرناک...",
        bookQuoteBody:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ",
        bookQuoteFrom: "کنفسیوس",
        buyBooks: 'خرید کتاب‌ها',
        paperQuoteMain:
          "جهانی که خلق کرده‌ایم، فرآیند افکار ماست. بدون تغییر افکارمان، نمی‌توان جهان را تغییر داد...",
        paperQuoteBody:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ",
        paperQuoteFrom: "آلبرت اینشتین",
        closeQuote: "”",
        CoAuthors: "همکاران",
        CoAuthor: "همکار",
        comma: "،",
        Contact: "تماس با من",
        Courses: "دوره‌ها",
        Dashboard: "داشبورد",
        Description: "توضیحات",
        Design: "طراحی",
        Designer: "یلدا دهشیری",
        Edition: "نوبت چاپ",
        edition: "چاپ",
        Education: 'تحصیلات',
        enrollInCourses: 'ثبت‌نام در دوره‌ها',
        executiveRecords: 'سوابق اجرایی',
        firstFooterTitle:
          "دکترای فلسفه تعلیم و تربیت, عضو هیئت علمی دانشگاه تهران",
        secondFooterTitle:
          "دانشیار متخصص در زمینه آموزش و روانشناسی تعلیم و تربیت",
        thirdFooterTitle:
          "متخصص و پرچم‌دار آموزش خلاقانه و روشهای پرورش خلاقیت",
        Gallery: "گالری",
        Home: "خانه",
        imageDrop:
          "برای افزودن تصویر کلیک کنید یا تصویر را در این محل رها کنید.",
        intro:
          "دکتر افضل السادات حسینی هرچند استاد دانشگاه تهران است، اما همواره دغدغه اصلاحات آموزشی در نظام آموزشی و مدارس را داشته است. او سالیان طولانی برای تحقق اصلاحات آموزشی تلاش کرده و مدلی را طراحی کرده است که طی چند دهه هزاران معلم، مدیر و استاد دانشگاه را آموزش داده...",
        ISBN: "شابک",
        Link: "لینک",
        moreBooks: 'کتاب‌های بیشتر',
        moreInfo: 'آشنایی بیشتر',
        numberOfPages: "تعداد صفحات",
        Order: "سفارش خرید",
        openQuote: "“",
        pages: "صفحه",
        Papers: "مقالات",
        Price: "قیمت",
        Publisher: "ناشر",
        Remove: "حذف",
        rights: "تمامی حقوق برای این وبسایت محفوظ است.",
        Search: "جستجو",
        SearchInTheSite: "جستجو در سایت",
        SearchFor: "جستجو برای ...",
        Send: "ارسال",
        Soon: "به زودی",
        subscribeDescription:
          "برای اطلاع از دوره‌ها و آخرین اخبار نشانی الکترونیکی خود را برای ما ارسال نمایید",
        subscribeTitle: "عضویت در خبرنامه",
        Submit: "ثبت",
        T: "تومان",
        Title: "عنوان",
        Unavailable: "ناموجود",
        watch: 'ببینید',
        Year: "سال نشر",
      },
    },
  },
  // detection: {
  //   order: ['querystring'],
  //   lookupQuerystring: 'lang',
  // },
  // lng: "fa",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
