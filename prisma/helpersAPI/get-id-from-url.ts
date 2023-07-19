export const getIdFromUrl = (url: string) => {
  const splitedUrl = url.split('/');

  return Number(splitedUrl[splitedUrl.length - 1]);
};
