burger = document.querySelector(".burger");
navbar = document.querySelector(".navbar");
rightnav = document.querySelector(".rightnav");
navlist = document.querySelector(".nav-list");

burger.addEventListener("click",()=>{
    rightnav.classList.toggle('visibility-class-resp');
    navlist.classList.toggle('visibility-class-resp');
    navbar.classList.toggle('height-nav-resp');
})