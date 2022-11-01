const api_key = 'c6aeee577586ba38e487b74dfede5deb';
const api_img = 'https://image.tmdb.org/t/p/w500/';

let api_url;
let page = 1;

let firstMovieToShow;
let movieSelected;

/**
 * 
 * @param {*} page 
 */
const changeURL = ( page ) => {
    api_url = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=${page}`;
}

/**
 * 
 */
    const changePage = ( btnPressed ) => {
    page = btnPressed.textContent;
    handleShowRandomHero();
    reRenderCards( createNewSliders );
}

/**
 * Destroy and re-render the content of movie cards.
 * This function is called everytime when the page is changed.
 */
const reRenderCards = ( createNewSliders ) => {
    const mainContainer = document.querySelector('#main-container');
    const sliders = document.getElementsByTagName('slider-component');

    Array.from(sliders).forEach((slider) => {
        slider.remove();
    }) 

    createNewSliders();
}

/**
 * 
 */
const createNewSliders = () => {
    const mainContainer = document.querySelector('#main-container');

    const firstSlider = document.createElement("slider-component");
    firstSlider.setAttribute('id', '0');
    firstSlider.setAttribute('first', '0');
    firstSlider.setAttribute('last', '9');
    mainContainer.appendChild(firstSlider);
    
    const secondSlider = document.createElement("slider-component");
    secondSlider.setAttribute('id', '1');
    secondSlider.setAttribute('first', '10');
    secondSlider.setAttribute('last', '19');
    mainContainer.appendChild(secondSlider);

}