let navClick = document.querySelector("#nav");
let click = navClick.querySelector("a");
let ul = navClick.querySelector("ul")
navClick.addEventListener("click", todo);
function todo(e){
    if (e.target.parentNode.parentNode !== navClick.children[3] && e.target.parentNode.parentNode !== navClick.children[1]) {
        if(click.className === "open"){
            navClick.className = "on";
            click.className = "close";
        } else {
            navClick.className = "";
            click.className = "open"
        }
    } else {
        log(e.target.baseURI);
        location.href = e.target.href;
    }
    e.preventDefault();
}