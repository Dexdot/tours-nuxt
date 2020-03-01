const lang = {
  chooseTour: "Choose a tour",
  orderCall: "Request a call",
  orderTicket: "Buy a ticket",
  cities: {
    spb: "Saint-Petersburg",
    tallin: "Tallin"
  },
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
  tour: {
    routeTitle: "What will we see",
    roadmapTip: "Hover over the title to see the photo.",
    venueTitle: "Venue"
  },
  footer: {
    companyName: "Peshehod Tour",
    reservedRights: "All rights reserved",
    policy: "Policy"
  },
  formOrder: {
    price: "for adults",
    priceChild: "for children under 12 years old",
    title: "Nearest excursion",
    subtitle: "No need to pay right away",
    button: "Buy a ticket"
  },
  reviews: {
    sectionButton: "All reviews"
  }
};

export default context =>
  new Promise(resolve => {
    resolve(lang);
  });
