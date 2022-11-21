const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "4337f678819832a67aaf852627eb2107",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
