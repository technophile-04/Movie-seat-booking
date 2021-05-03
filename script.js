const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value; //added the plus sign to convert it into number

populateUI();

//save selected movie index and price 
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
};

//updates total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    //... is known as spered operator it used to copy all the the elements of old array to new one
    //example: here we have copied the selectedSeats array into new array

    //.map function is same as forEach loop but the difference is forEach loop doesnt returns anythig, but map method returns the array aftert performing certain tasks

    //wahts is indexOf?
    //example : if I have and array a = [1,2,3,4] and i do console.log(a.indexOf(3))==> this will give me the idex of 3 that is 2  
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });

    // this will store the selectedSeats to local storage in the browser and it is key vlaue pair and takes string
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


// get data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    
    if(selectedSeats !== null && selectedSeats.length > 0)
    {
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex !== null)
    {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//movie select element
movieSelect.addEventListener("change", e =>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//seat click Event listner
container.addEventListener("click",(e) =>{
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

//intial count and total set 
updateSelectedCount();