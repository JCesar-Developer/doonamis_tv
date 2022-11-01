class sliderComponent extends HTMLElement {
    constructor(){
        super();
        this.id;
        this.first; //First movie to show into the Slider
        this.last;  //Last movie to show into the Slider
    }

    static get observedAttributes() {
        return ['first', 'last'];
    }

    attributeChangedCallback(nameAtr, oldValue, newValue){
        switch(nameAtr){
            case "id":
                this.id = newValue;
            break;
            case "first":
                this.first = newValue;
            break;
            case "last":
                this.last = newValue;
            break;
        }
    }

    connectedCallback(){
        this.innerHTML = `
            <style>
            .controls-${this.id} i {
                color: white;
                font-size: 1rem;
            }
            .previous, .next {
                padding: 2px;
                width: 48px;
                cursor: pointer;
                border-radius: 50%;
                outline: none;
                transition: 0.3s ease-in-out;
                border: 3px solid white;
                background-color: black;
                box-shadow: 0 0 5px #bbb;
            }
                .previous:hover, .next:hover {
                    border: 3px solid gray;
                }
            </style>
        
            <div class="controls-${this.id}">
                <button class="previous">
                    <i class="fa-solid fa-angle-left"></i>
                </button>
                <button class="next">
                    <i class="fa-solid fa-angle-right"></i>
                </button>
            </div>
            <div class="movie-cards-slider"></div>
        `;

        handleShowMovieCards( this, renderSlider );  

    }
}

/**
 * Fetch the DATA from the URL of a specific page from the API (TMDB) 
 * to get the data of all the movies stored on that page. 
 * Finally creates a MOVIE-CARD component for each film obtained.
 */
 const handleShowMovieCards = async ( sliderComponent, renderSlider ) => {
    const sliderContainer = sliderComponent.querySelector('.movie-cards-slider');
    changeURL(page);

    await fetch(`${api_url}`)
    .then((response) => response.json())
    .then((apiResult) => {

        const movies = apiResult.results;

        for (sliderComponent.first; sliderComponent.first <= sliderComponent.last ; sliderComponent.first++) {
            const movie = movies[sliderComponent.first];
            const newMovieCard = document.createElement("movie-card");
            
            newMovieCard.setAttribute('id', movie.id);
            newMovieCard.setAttribute('class', 'movieCard col');
            newMovieCard.setAttribute('style', 'padding-left: 10px; padding-right: 10px;')
            newMovieCard.setAttribute('name', movie.name);
            newMovieCard.setAttribute('img_path', movie.backdrop_path);
            newMovieCard.setAttribute('poster_img_path', movie.poster_path);
            newMovieCard.setAttribute('onclick', `handleShowDetailsOfSelectedMovie(${movie.id})`);

            sliderContainer.appendChild(newMovieCard);
        }
        
    })
    .then(() => {
        renderSlider( sliderComponent, sliderContainer );
    })
}

/**
 * 
 */
const renderSlider = ( sliderComponent, sliderContainer ) => {
    let slider = tns({
        container: sliderContainer,
        "slideBy": 1,
        "speed": 400,
        "autoWidth": true,
        "nav": false,
        constrolsContainer: `.controls-${sliderComponent.id}`,
        prevButton: `.controls-${sliderComponent.id} .previous`,
        nextButton: `.controls-${sliderComponent.id} .next`,
    })
}

window.customElements.define('slider-component' , sliderComponent);