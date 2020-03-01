const lang = {
  chooseTour: "Выбрать тур",
  orderCall: "Заказать звонок",
  orderTicket: "Купить билет",
  cities: {
    spb: "Санкт-Петербург",
    tallin: "Таллин"
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
    }
  ],
  tour: {
    routeTitle: "Что увидим",
    roadmapTip: "Наведите курсор на заголовок, чтобы увидеть фото",
    venueTitle: "Место встречи"
  },
  footer: {
    companyName: "Пешеход Тур",
    reservedRights: "Все права защищены",
    policy: "Соглашение"
  },
  formOrder: {
    price: "для взрослых",
    priceChild: "для детей до 12 лет",
    title: "Ближайшая экскурсия",
    subtitle: "Сразу платить не нужно",
    button: "Записаться"
  },
  reviews: {
    sectionButton: "Все отзывы"
  }
};

export default context =>
  new Promise(resolve => {
    resolve(lang);
  });
