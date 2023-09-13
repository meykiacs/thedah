import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Title: "Title",
        Dashboard: "Dashboard",
        Description: "Description",
        Publisher: "Publisher",
        Year: "Year of publish",
        Edition: "Edition",
        numberOfPages: "Number of pages",
        Author: "Author",
        ISBN: "ISBN",
        CoAuthors: "Co-Authors",
        CoAuthor: "Co-Author",
        Price: "Price",
        T: "T",
        imageDrop: "Click to add Image or Drop your image here",
        Available: "Available",
        Unavailable: "Unavailable",
        Soon: "Soon",
        Books: "Books",
        Papers: "Papers",
        Submit: "Submit",
        Remove: "Remove",
        Home: "Home",
      },
    },
    fa: {
      translation: {
        Home: "خانه",
        Title: "عنوان",
        Dashboard: "داشبورد",
        Description: "توضیحات",
        Publisher: "ناشر",
        Year: "سال نشر",
        Edition: "نوبت چاپ",
        numberOfPages: "تعداد صفحات",
        Author: "نویسنده",
        ISBN: "شابک",
        CoAuthors: "همکاران",
        CoAuthor: "همکار",
        Price: "قیمت",
        T: "تومان",
        imageDrop:
        "برای افزودن تصویر کلیک کنید یا تصویر را در این محل رها کنید.",
        Available: "موجود",
        Unavailable: "ناموجود",
        Soon: "به زودی",
        Books: "کتاب ها",
        Papers: "مقالات",
        Submit: "ثبت",
        Remove: "حذف",
      },
    },
  },
  lng: "fa",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
