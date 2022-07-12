class movieCard extends HTMLElement {
    constructor(){
        super();
        this.name;
        this.img_path;
    }

    static get observedAttributes() {
        return ['name', 'img_path', 'poster_img_path'];
    }

    attributeChangedCallback(nameAtr, oldValue, newValue){
        switch(nameAtr){
            case "name":
                this.name = newValue;
            break;
            case "img_path":
                this.img_path = newValue;
            break;
            case "poster_img_path":
                this.poster_img_path = newValue;
            break;
        }
    }

    connectedCallback(){
        this.innerHTML = `  
        <style>
        .card-container {
            border: solid 7px var(--main-bg-contrast);
            min-width: 250px;
            max-width: 300px;
            width: auto;
            margin-bottom: 40px;
            cursor: pointer;
        }
            .card-container:hover {
                transform: scale(1.075);
                transition: .4s ease all;
            }
        .card-img {
            border: solid 4px var(--darkhighlighted-color);
            border-radius: 0px;
            height: auto;
            margin: auto;
        }
        .card-title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3.25em;
            margin-bottom: 0px;
            background-color: white;
            text-align: center;
            text-transform: uppercase;
        }
        </style>
        
        <a href="#appComponent">
            <div class="card-container">
                <img class="card-img" 
                    src="${api_img + this.poster_img_path}"
                    alt="${api_img + this.name}">
                <h2 class="card-title super-title">${this.name}</h2>
            </div>
        </a>`;

    }
    
}

const handleShowMovieCards = () => {
    const movieCardsContainer = document.querySelector('#movieCardsContainer');

    fetch(`${api_url}`)
    .then((response) => response.json())
    .then((apiResult) => {
        const tvShows = apiResult.results;
        tvShows.forEach((tvShow) => {         

            const tvShowId = tvShow.id;
            const newMovieCard = document.createElement("movie-card");
            
            newMovieCard.setAttribute('id', tvShowId);
            newMovieCard.setAttribute('class', 'movieCard col');
            newMovieCard.setAttribute('style', 'padding-left: 10px; padding-right: 10px;')
            newMovieCard.setAttribute('name', tvShow.name);
            newMovieCard.setAttribute('img_path', tvShow.backdrop_path);
            newMovieCard.setAttribute('poster_img_path', tvShow.poster_path);

            newMovieCard.setAttribute('onclick', `handleShowSelectedMovie(${tvShowId})`);

            movieCardsContainer.appendChild(newMovieCard);

        });
    })
}

const handleShowSelectedMovie = (tvShowSelected) => {
    const api_details_url = `https://api.themoviedb.org/3/tv/${tvShowSelected}?api_key=${api_key}&language=en-US`;

    fetch(api_details_url)
    .then((response) => response.json())
    .then((apiResult) => {

        movieSelected = apiResult;
        console.log(movieSelected);

        //CHANGING HERO-DETAILS
        handleChangeHeroDetails();
        //CHANGING HERO-IMG
        handleChangeHeroImg();
    })
}

const handleChangeHeroDetails = () => {
    const hero_title    = document.querySelector('#movieDetails #hero-details h1');
    hero_title.textContent = movieSelected.name;
    const hero_overview = document.querySelector('#movieDetails #hero-details h3');
    hero_overview.textContent = movieSelected.overview;
}

const handleChangeHeroImg = () => {
    const hero_img = document.querySelector('#movieDetails #hero-img')
    hero_img.style = `
    background-image: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6612529002320185) 10%, rgba(0,0,0,0.3364269141531323) 20%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 100%), 
                      url(${api_img + movieSelected.backdrop_path});
                      background-repeat: no-repeat; background-size: cover;`
}

window.customElements.define('movie-card' , movieCard);