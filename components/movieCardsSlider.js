const renderSlider = () => {

    const sliderComponent = document.getElementsByClassName('movie-cards-slider');

    for( let sliderContainer of sliderComponent) {

        let slider = tns({
            container: sliderContainer,
            "slideBy": 1,
            "speed": 400,
            "autoWidth": true,
        })

    }

}