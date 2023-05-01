const lang = {
  chooseTour: "Выбрать тур",
  orderCall: "Заказать звонок",
  orderTicket: "Купить билет",
  cities: {
    spb: "Санкт-Петербург",
    tallinn: "Таллин"
  },
  navLinks: [
    {
      to: "/tours",
      text: "Экскурсии"
    },
    {
      to: "/reviews",
      text: "Отзывы"
    },
    {
      to: "/blog",
      text: "Блог"
    },
    {
      to: "/faq",
      text: "FAQ"
    },
    {
      to: "/contacts",
      text: "Контакты"
    },
    {
      to: "/shop/certificates",
      text: "Сертификаты"
    }
  ],
  tours: {
    title: "Экскурсии",
    choose: "Выбери свою экскурсию"
  },
  tour: {
    routeTitle: "Что увидим",
    roadmapTip: "Наведите курсор на заголовок, чтобы увидеть фото",
    venueTitle: "Место встречи",
    priceFrom: "от",
    otherToursTitle: "Другие экскурсии, которые вам понравятся"
  },
  tourTypes: {
    group: "Групповые",
    individual: "Индивидуальные",
    children: "Детские",
    newbie: "Для новичков",
    unusual: "Необычные маршруты"
  },
  reviewsTourTypes: {
    all: "Все",
    group: "Групповые",
    individual: "Индивидуальные"
  },
  footer: {
    companyName: "Пешеход Тур",
    reservedRights: "Все права защищены",
    policy: "Правовая информация"
  },
  formOrder: {
    price: "для взрослых",
    priceChild: "для детей до 12 лет",
    title: "Ближайшая экскурсия",
    subtitle: "Сразу платить не нужно",
    button: "Записаться"
  },
  reviews: {
    title: "Отзывы",
    otherToursTitle: "Время выбирать свое приключение",
    sectionButton: "Все отзывы",
    selectTourNotChosenTitle: "Название экскурсии",
    selectTourNotChosen: "Не выбрано",
    selectTypeTitle: "Тип экскурсии",
    watchReviews: "Смотреть отзывы",
    goTo: "Перейти к отзыву",
    add: "Написать отзыв",
    chooseTour: "На какую экскурсию вы хотите оставить отзыв?",
    scoreTour: "Оцените экскурсию (от 1 до 5)",
    textPlaceholder: "Напишите свой отзыв"
  },
  main: {
    toursButton: "Смотреть все",
    faqTitle: "FAQ"
  },
  blog: {
    title: "Блог",
    categoryAll: "Все",
    otherTitle: "Другие статьи",
    readArticle: "Читать статью"
  },
  faq: {
    title: "FAQ",
    subtitle: "Остались вопросы?",
    call: "Позвоните",
    text: "или пишите на почту"
  },
  form: {
    name: "Имя",
    nameError: "введите имя",
    email: "Email",
    emailError: "неправильный формат",
    message: "Привет, Пешеход Тур!",
    messageError: "минимум 10 символов",
    button: "Отправить",
    buttonSuccess: "Отправлено",
    buttonError: "Есть ошибки"
  },
  ntf: {
    title: "Ууупс!",
    text:
      "Похоже, такой страницы не существует. Выберите в меню нужный раздел или посмотрите самые популярные экскурсии ниже",
    button: "На главную"
  },
  shop: {
    button: "Купить"
  }
};

export default context =>
  new Promise(resolve => {
    resolve(lang);
  });
