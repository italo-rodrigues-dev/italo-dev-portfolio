let imagens = document.querySelectorAll(".mini");
let modal = document.getElementById("modal");
let grande = document.getElementById("grande");
let fechar = document.getElementById("close");

imagens.forEach(function(img){
    img.addEventListener("click", function(){
        modal.style.display = "block";
        grande.src = img.getAttribute("src");
    });
});

fechar.addEventListener("click", function(){
    modal.style.display = "none";
});

window.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        modal.style.display = "none";
    }
});

modal.addEventListener("click", function(event){
    if(event.target === modal){
        modal.style.display = "none";
    }
});