export function getFormData(obj) {
  const formData = new FormData();
  const keys = Object.keys(obj);

  keys.forEach(key => {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      formData.append(key, obj[key]);
    }
  });

  return formData;
}
