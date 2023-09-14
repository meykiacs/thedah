import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        About: "About me",
        Author: "Author",
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
        Papers: "Papers",
        Price: "Price",
        Publisher: "Publisher",
        Remove: "Remove",
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
        Papers: "مقالات",
        Price: "قیمت",
        Publisher: "ناشر",
        Remove: "حذف",
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
