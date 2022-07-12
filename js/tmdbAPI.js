// fetch(`${api_url}`)
//     .then((response) => response.json())
//     .then((apiResult) => {
//         const tvShows = apiResult.results;
//         tvShows.forEach((tvShow) => {

//             const img = document.createElement("img");
//             const title = document.createElement("h1");
//             img.setAttribute('class', 'card-img')
//             img.setAttribute('src', api_img + tvShow.backdrop_path);
//             img.setAttribute('alt', tvShow.name);
//             img.setAttribute('width', 500);
//             title.setAttribute('class', 'card-title')
//             title.appendChild(document.createTextNode(`${tvShow.name}`));

//             newMovieCard.appendChild(img);
//             newMovieCard.appendChild(title);

//             moviesContainer.appendChild(newMovieCard);

//         });
//     })