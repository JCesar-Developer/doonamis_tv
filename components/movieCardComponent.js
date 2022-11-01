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
        .a-elem {
            text-decoration: none;
        }
        .card-container {
            border: solid 8px var(--main-bg-contrast);
            width: 300px;
            height: 540px;
            margin-bottom: 30px;
            background-color: white;
            cursor: pointer;
        }
            .card-container:hover {
                transform: scale(1.075);
                transition: .3s ease all;
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
        
        <a class="a-elem" href="#appComponent">
            <div class="card-container">
                <img class="card-img" 
                    src="${api_img + this.poster_img_path}"
                    alt="${api_img + this.name}">
                <h5 class="card-title super-title">${this.name}</h5>
            </div>
        </a>`;

    }
    
}

/**
 * Fetch the details from a specific SELECTED movie 
 * to render them into the web hero.
 * @param requires the ID of the specific movie 
 */
const handleShowDetailsOfSelectedMovie = ( ID_movieSelected ) => {
    const api_details_url = `https://api.themoviedb.org/3/tv/${ID_movieSelected}?api_key=${api_key}&language=en-US`;

    fetch(api_details_url)
    .then((response) => response.json())
    .then((apiResult) => {

        movieSelectedData = apiResult;
        //CHANGING HERO-IMG
        handleChangeHeroImg( movieSelectedData );
        //CHANGING HERO-DETAILS
        handleSetHeroDetails( movieSelectedData );
    })
}

/**
 * Changes the hero image for the image from a specific SELECTED movie.
 * @param requires the DATA of the specific movie. 
 */
const handleChangeHeroImg = ( movieSelectedData ) => {
    const hero_img = document.querySelector('#movieDetails #hero-img')
    hero_img.style = `
    background-image: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6612529002320185) 10%, rgba(0,0,0,0.3364269141531323) 20%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 100%), 
                      url(${api_img + movieSelectedData.backdrop_path});
                      background-repeat: no-repeat; background-size: cover;`
}

window.customElements.define('movie-card' , movieCard);
