import client from "~/api/client";

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

export const copyObject = obj => JSON.parse(JSON.stringify(obj));
