const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll(".child")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;

//showing or hiding icons according to carousel scroll Left value
const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;//getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    //observe this section
let firstImgWidth = firstImg.clientWidth + 1; 
    icon.addEventListener("click", () => {
        //if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth
        setTimeout(() => showHideIcons(), 60); //calling show or hide after 60ms
    })
})

const dragStart = (e) => {
    //updating global variables value on mouse down event
     isDragStart = true;
     prevPageX = e.pageX || e.touches[0].pageX;
     prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    //scroll images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
   carousel.scrollLeft = prevScrollLeft - positionDiff;
   showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
