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
  tours: {
    title: "Excursions"
  },
  tour: {
    routeTitle: "What will we see",
    roadmapTip: "Hover over the title to see the photo.",
    venueTitle: "Venue",
    priceFrom: "from",
    otherToursTitle: "Other tours you will like"
  },
  tourTypes: {
    all: "All",
    group: "Group",
    individual: "Individual"
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
    title: "Reviews",
    otherToursTitle: "Time to choose your adventure",
    sectionButton: "All reviews",
    selectTourNotChosenTitle: "Excursion",
    selectTourNotChosen: "Not chosen",
    selectTypeTitle: "Type of tour",
    watchReviews: "Watch reviews",
    goTo: "Go to review"
  },
  main: {
    toursButton: "See all",
    faqTitle: "FAQ"
  },
  faq: {
    title: "FAQ",
    subtitle: "Still have questions?",
    call: "Call",
    text: "or write to the mail"
  },
  form: {
    name: "Name",
    nameError: "enter a name",
    email: "Email",
    emailError: "invalid format",
    message: "Hello, Peshehod Tour!",
    messageError: "minimum 10 characters",
    button: "Submit",
    buttonError: "Errors"
  },
  ntf: {
    title: "Ooops!",
    text:
      "This page does not seem to exist. Below in the section you need a section or see the most popular excursions",
    button: "Home page"
  }
};

export default context =>
  new Promise(resolve => {
    resolve(lang);
  });
