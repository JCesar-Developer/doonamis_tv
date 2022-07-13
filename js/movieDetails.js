/**
 * Fetch the DATA from the URL of a specific page from the API (TMDB) 
 * to choose a random movie and fetch its details.
 */
const handleShowRandomHero = async () => {
    const randomNumber = Math.floor(Math.random() * 20);
    changeURL(page);
    
    await fetch(`${api_url}`)
    .then((response) => response.json())
    .then((apiResult) => {

        const randomIdsMovie = apiResult.results[randomNumber].id ;
        specificMovieURL = `https://api.themoviedb.org/3/tv/${randomIdsMovie}?api_key=${api_key}&language=en-US`;
        handleRenderHero( specificMovieURL );

    })
}

/**
 * Fetch the details of a specific movie to render the web hero
 * @param requires the URL of a specific movie 
 */
const handleRenderHero = ( specificMovieURL ) => {
    fetch(specificMovieURL) 
    .then((response) => response.json())
    .then((apiResult) => {

        specificMovieData = apiResult;
        //RENDERING HERO-IMG
        handleSetHeroImg( specificMovieData );    
        //RENDERING HERO-DETAILS
        handleSetHeroDetails( specificMovieData );
    })
}

/**
 * Render the image from a specific movie into the hero
 * @param requires the DATA from a specific movie 
 */
const handleSetHeroImg = ( specificMovieData ) => {
    const hero_img = document.querySelector('#movieDetails #hero-img')
    hero_img.setAttribute('style', `
    background-image: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6612529002320185) 10%, rgba(0,0,0,0.3364269141531323) 20%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 100%), 
                    url(${api_img + specificMovieData.backdrop_path});
                    background-repeat: no-repeat; background-size: cover;`);
}

/**
 * Render the details from a specific movie into the hero
 * @param requires the DATA from a specific movie 
 */
 const handleSetHeroDetails = ( specificMovieData ) => {
    const hero_title    = document.querySelector('#movieDetails #hero-details h1');
    hero_title.textContent = specificMovieData.name;
    const hero_overview = document.querySelector('#movieDetails #hero-details h3');
    hero_overview.textContent = specificMovieData.overview;
}