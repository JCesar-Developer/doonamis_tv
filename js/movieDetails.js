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

    const hero_title    = document.querySelector('#movieDetails #hero-details #hero-title');
    const hero_tagline  = document.querySelector('#movieDetails #hero-details #hero-tagline');
    const hero_status  = document.querySelector('#movieDetails #hero-details #hero-status');
    const hero_voteCount = document.querySelector('#movieDetails #hero-details #hero-vote-count');
    const hero_numberOfSeasons  = document.querySelector('#movieDetails #hero-details #hero-number-of-seasons');
    const hero_numberOfEpisodes  = document.querySelector('#movieDetails #hero-details #hero-number-of-episodes');
    const hero_overview = document.querySelector('#movieDetails #hero-details #hero_overview');

    //TITLE & SUB-TITLE
    hero_title.textContent = specificMovieData.name;
    hero_tagline.textContent = specificMovieData.tagline;

    //DETAILS: ROW_1
    hero_status.textContent = `STATUS: ${specificMovieData.status} |\u00A0`;
    getRating( specificMovieData );
    hero_voteCount.textContent = `\u00A0|\u00A0 ${specificMovieData.vote_count} votes.`;

    //DETAILS: ROW_2
    hero_numberOfSeasons.textContent = `SEASONS: ${specificMovieData.number_of_seasons} |\u00A0`;
    hero_numberOfEpisodes.textContent = `Episodes: ${specificMovieData.number_of_episodes}.`;

    //OVERVIEW
    hero_overview.textContent = specificMovieData.overview;

    //RE-SIZE IF IS NECESARY
    resizeTitle();
    resizeOverview();
    
}
 
/**
 * 
 * @param {*} specificMovieData 
 */
const getRating = ( specificMovieData ) => {
    const starsTotal = 10;
    const voteAvarage = specificMovieData.vote_average;
    const starPercentage = voteAvarage / starsTotal * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    document.querySelector('#stars-inner').style.width = starPercentageRounded;

}

const resizeTitle = () => {
    const heroContainer = document.querySelector('.hero-container');
    const heroTitle = document.querySelector('#hero-title');

    if (heroTitle.offsetHeight > (heroContainer.offsetHeight * 25 / 100) ) {
        heroTitle.style.fontSize = '2.4em';
    } else {
        heroTitle.style.fontSize = '3.4em';
    }
}

const resizeOverview = () => {
    const heroContainer = document.querySelector('.hero-container');
    const heroOverview = document.querySelector('#hero_overview');

    if (heroOverview.offsetHeight > (heroContainer.offsetHeight * 35 / 100) ) {
        heroOverview.style.fontSize = "80%";
    } else {
        heroOverview.style.fontSize = '100%';
    }
}