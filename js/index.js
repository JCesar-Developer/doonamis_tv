let page = 1;

const api_key = 'c6aeee577586ba38e487b74dfede5deb';
const api_img = 'https://image.tmdb.org/t/p/w500/';
const api_url = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=${page}`;

let firstMovieToShow;
let movieSelected;