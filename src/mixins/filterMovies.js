export default function filterMovies(url){
  return new Promise((resolve, reject) => {
    // Do something here... lets say, a http call using vue-resource
    fetch(url)
      .then((resp) => resp.json())
      .then(function(data) {
        let current_page = data.page;
        let total_pages = data.total_pages;
        let movies = data.results.filter((movie) => {
          return movie.poster_path
        }).map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
        }));
        resolve({current_page, total_pages ,movies});
      })
      .catch((err) => {
        reject(`Error Fetching ${err}`);
      })
  });
}