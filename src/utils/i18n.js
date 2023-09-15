import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        About: "About me",
        Author: "Author",
        bookQuoteMain:
          "Learning without thinking is useless, thinking without learning is dangerous.",
        bookQuoteBody:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa distinctio, officiis, possimus hic officia pariatur id perferendis error porro quia quibusdam et voluptas animi suscipit ipsam tempore soluta quod amet?",
        bookQuoteFrom: "Confucius",
        Books: "Books",
        Available: "Available",
        CoAuthor: "Co-Author",
        CoAuthors: "Co-Authors",
        Contact: "Contact me",
        Courses: "Courses",
        Dashboard: "Dashboard",
        Description: "Description",
        Edition: "Edition",
        Gallery: "Gallery",
        Home: "Home",
        imageDrop: "Click to add Image or Drop your image here",
        ISBN: "ISBN",
        numberOfPages: "Number of pages",
        openQuote: "“",
        closeQuote: "”",
        Papers: "Papers",
        Price: "Price",
        Publisher: "Publisher",
        Remove: "Remove",
        Search: "Search",
        SearchInTheSite: "Search in the site",
        SearchFor: "Search for ...",
        Soon: "Soon",
        Submit: "Submit",
        T: "T",
        Title: "Title",
        Unavailable: "Unavailable",
        Year: "Year of publish",
      },
    },
    fa: {
      translation: {
        About: "درباره‌ی من",
        Author: "نویسنده",
        Available: "موجود",
        Books: "کتابنامه",
        bookQuoteMain:
          "خواندن بی اندیشیدن بیهوده است، و اندیشیدن بدون خواندن خطرناک...",
        bookQuoteBody:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ",
        bookQuoteFrom: "کنفسیوس",
        closeQuote: '”',
        CoAuthors: "همکاران",
        CoAuthor: "همکار",
        Contact: "تماس با من",
        Courses: "دوره‌ها",
        Dashboard: "داشبورد",
        Description: "توضیحات",
        Edition: "نوبت چاپ",
        Gallery: "گالری",
        Home: "خانه",
        imageDrop:
          "برای افزودن تصویر کلیک کنید یا تصویر را در این محل رها کنید.",
        ISBN: "شابک",
        numberOfPages: "تعداد صفحات",
        openQuote: "“",
        Papers: "مقالات",
        Price: "قیمت",
        Publisher: "ناشر",
        Remove: "حذف",
        Search: "جستجو",
        SearchInTheSite: "جستجو در سایت",
        SearchFor: "جستجو برای ...",
        Soon: "به زودی",
        Submit: "ثبت",
        T: "تومان",
        Title: "عنوان",
        Unavailable: "ناموجود",
        Year: "سال نشر",
      },
    },
  },
  lng: "fa",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
