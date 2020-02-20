import client from '~/api/client';

const formatDate = date => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];

  return `${day} ${months[month]} ${year}`;
};

// Articles
export const fetchArticles = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: 'article',
        ...options
      })
      .then(async ({ items }) => {
        const articles = items
          .filter(article => 'fields' in article)
          .map(article => {
            // Date
            article.fields.formattedDate = formatDate(article.fields.date);

            return article;
          });

        // Sort
        articles.sort((a, b) => {
          const aTime = new Date(a.fields.date).getTime();
          const bTime = new Date(b.fields.date).getTime();
          return bTime - aTime;
        });

        resolve(articles);
      });
  });

export const fetchArticle = slug =>
  new Promise((resolve, reject) => {
    client
      .getEntries({
        content_type: 'article',
        'fields.slug': slug
      })
      .then(({ items }) => {
        const article = items[0] ? items[0].fields : null;

        if (article) {
          article.formattedDate = formatDate(article.date);
          resolve(article);
        } else {
          reject();
        }
      });
  });
