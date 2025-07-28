const preloader=document.querySelector("[data-preloader]");
window.addEventListener("load",()=>{
 preloader.classList.add("remove");
})


const addEventOnElements=function(elements,eventtype,callback){
    for(let i=0,len=elements.length;i<len;i++){
        elements[i].addEventListener(eventtype,callback);

    }
}




const navbar=document.querySelector("[data-navbar]");
const navTogglers=document.querySelectorAll("[data-nav-toggler]");
const overlay=document.querySelector("[data-overlay]");

const togglenav=function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");

}
addEventOnElements(navTogglers,"click",togglenav);


const header=document.querySelector("[ data-header]");
window.addEventListener("scroll",function(){

    header.classList[this.window.scrollY>100?"add":"remove"]("active");

})



document.getElementById("aboutLink").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "/about/about.html"; 
});

document.getElementById("service_offer").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "/service/service.html"; 
});

document.getElementById("contact_us").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "/contact/contact.html"; 
});

document.getElementById("ab_price").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "/pricing/pricing.html"; 
});




document.getElementById("plan_book").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "/pricing/pricing.html"; 
});




function openVideoInNewTab() {
    window.open('nishane.mp4', '_blank');  
}


document.getElementById("playButton").addEventListener("click", openVideoInNewTab);

document.getElementById("signup_up").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "/login_page/sign_up.html"; 
});
document.getElementById("login_in").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "/login_page/sign_in.html"; 
});

