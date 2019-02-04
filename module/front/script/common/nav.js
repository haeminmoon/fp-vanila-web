let navClick = document.querySelector("#nav");
let click = navClick.querySelector("a");

function handleClick(){
    const hasClass = navClick.classList.contains("on");
    if(hasClass){
        navClick.classList.remove("on");
        click.className = "open";
    }else{
        navClick.classList.add("on");
        click.className = "close";
    }
}
function init(){
    click.addEventListener("click", handleClick);
}
init();