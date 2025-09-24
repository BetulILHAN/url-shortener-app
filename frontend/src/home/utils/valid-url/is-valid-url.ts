const isValidUrl = (url: string) => {
  const validUrlRegex =
    /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)?$/;
  return validUrlRegex.test(url);
};

export { isValidUrl };
