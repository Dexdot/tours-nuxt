const lang = {
  orderCall: "Request a call",
  orderTicket: "Buy a ticket",
  navLinks: [
    {
      to: "/tours",
      text: "Excursions"
    },
    {
      to: "/reviews",
      text: "Reviews"
    },
    {
      to: "/blog",
      text: "Blog"
    },
    {
      to: "/faq",
      text: "FAQ"
    },
    {
      to: "/contacts",
      text: "Contacts"
    }
  ],
  footer: {
    companyName: "Peshehod Tour",
    reservedRights: "All rights reserved",
    policy: "Policy"
  }
};

export default context =>
  new Promise(resolve => {
    resolve(lang);
  });
