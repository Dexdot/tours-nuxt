import client from "~/api/client";

export const findYearInString = s =>
  s.split(/[^\d]/).filter(n => {
    if (n >= 1900 && n <= 2099) return n;
  });

export const setCaseYear = project => {
  if (project.fields) {
    project.fields.year = +findYearInString(project.fields.date)[0];
  } else {
    project.year = +findYearInString(project.date)[0];
  }
  return project;
};

export const isImage = ({ fields }) =>
  fields.file.contentType.split("/")[0] === "image";

export const isJPG = img =>
  isImage(img) && img.fields.file.contentType.split("/")[1] === "jpeg";

export const isVideo = ({ fields }) =>
  fields.file.contentType.split("/")[0] === "video";

export const getRandomFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomElementFromArray = arr =>
  arr[Math.floor(Math.random() * arr.length)];

export const addItemToArrayAt = (item, i, arr) => {
  const copy = [...arr];
  copy.splice(i, 0, item);
  return copy;
};

// Get image optimized image url (webp, size, progressive jpeg)
const getSupports = () => {
  // FF
  const ffMatch = navigator.userAgent.match(/Firefox\/(.*)$/);
  let ffv = 0;

  if (ffMatch && ffMatch.length > 1) {
    ffv = parseInt(ffMatch[1]);
  }

  // WEBP
  const webp =
    (ffMatch && ffv >= 65) ||
    document
      .createElement("canvas")
      .toDataURL("image/webp")
      .indexOf("data:image/webp") == 0;

  return {
    isMob: window.innerWidth <= 500,
    webp
  };
};

const encodeParams = data => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
};

export const getImageUrl = (img, useOriginalSizeOnMob = false) => {
  const supports = getSupports();
  const url = img.fields.file.url;

  const fmfl = isJPG(img)
    ? {
        fm: supports.webp ? "webp" : "jpg",
        fl: supports.webp ? "" : "progressive"
      }
    : {};

  const params = {
    ...fmfl,
    w: supports.isMob ? (useOriginalSizeOnMob ? "" : "1125") : "",
    fit: supports.isMob ? "fill" : ""
  };

  return `${url}?${encodeParams(params)}`;
};

// Cases assets / links
const loadContentItem = item =>
  new Promise(resolve => {
    const isAssetLink =
      item.nodeType === "embedded-entry-block" &&
      item.data.target.sys.type === "Link";

    if (!isAssetLink) {
      resolve(item);
    } else {
      client.getEntry(item.data.target.sys.id).then(entry => {
        item.data.target = { ...entry };
        resolve(item);
      });
    }
  });

const processCase = project =>
  new Promise(async resolve => {
    // Categories
    const categoriesPromises = project.fields.categories.map(({ sys }) =>
      loadCategory(sys.id)
    );
    const categories = await Promise.all(categoriesPromises);
    project.fields.categories = [...categories];

    // Rich content
    const contentPromises = project.fields.content.content.map(item =>
      loadContentItem(item)
    );
    const content = await Promise.all(contentPromises);
    project.fields.content.content = [...content];

    project = { ...setCaseYear(project) };
    resolve(project);
  });

export const loadCasesAssets = cases =>
  new Promise(async resolve => {
    const casesPromises = cases.map(processCase);
    const processedCases = await Promise.all(casesPromises);
    resolve(processedCases);
  });

export const copyObject = obj => JSON.parse(JSON.stringify(obj));
