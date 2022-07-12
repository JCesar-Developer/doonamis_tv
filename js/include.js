function includeHTML() {
    var z, i, elmnt, file;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            fetch(file)
                .then(res=>res.text())
                .then(data=>{
                    elmnt.innerHTML=data;
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    if(doc.querySelector('script')) {
                        eval(doc.querySelector('script').textContent);
                }}) 

            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();

            /* Exit the function: */
            return;
        }
    }
}