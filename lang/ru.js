const lang = {
  chooseTour: "Выбрать тур",
  orderCall: "Заказать звонок",
  orderTicket: "Купить билет",
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
  footer: {
    companyName: "Пешеход Тур",
    reservedRights: "Все права защищены",
    policy: "Соглашение"
  }
};

export default context =>
  new Promise(resolve => {
    resolve(lang);
  });
