//Select Items
const container = document.querySelector('.drop-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#seats-count');
const totalPrice = document.querySelector('#total-price');
const movieSelection = document.querySelector('#movie');
const clear_btn = document.querySelector('#btn-clr');
let ticketPrice = parseInt(movieSelection.value);
let movieSelectionIndex = movieSelection.selectedIndex;
console.log(ticketPrice);

//updates the Selected Seats count
function updateSelectedSeatsCount(){
    //updates ticket price and seat count dynamically 
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    //get array of seats from nodelist
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });
    
    //save selected seat index array on local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //console.log(seatsIndex);

    //print out the values to HTML element
    count.innerText = selectedSeatsCount;
    totalPrice.innerText = selectedSeatsCount * ticketPrice;


}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMovieCost = localStorage.getItem('selectedMovieCost');

    //check if selectedSeats array is NOT empty
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            //checks if array item is in array
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    if(selectedMovieIndex !== null){
        //adds the proper movie selection index on loading
       movieSelection.selectedIndex = selectedMovieIndex;
       updateSelectedSeatsCount();
    }
}

function saveMovieData(movieIndex, movieCost){
    //saves movie details to local storage
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMovieCost', movieCost);
}

//clears the current seat selections
function clearSeatSelection(){
    const selectSeats = document.querySelectorAll('.row .seat.selected');
    //go thru node list and remove the proper class
    selectSeats.forEach((seat)=> {
        seat.classList.remove('selected');
    });

    //update the proper value
    count.innerText = 0;
    totalPrice.innerText = ticketPrice * 0;
}

//movie select Event
movieSelection.addEventListener('change', function(e){
    //updates price dynamically as we change the ticket kind
    ticketPrice = parseInt(e.target.value);
    movieSelectionIndex = e.target.selectedIndex;
    saveMovieData(movieSelectionIndex, ticketPrice);
    updateSelectedSeatsCount();
});

//clears selection
clear_btn.addEventListener('click', function(e){
    //log out for testing
    clearSeatSelection();
});

//adds event listener to seats in rows not for display
container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedSeatsCount();
    }

});

//adds the preselected movie values on load
window.addEventListener('DOMContentLoaded', saveMovieData(movieSelectionIndex, ticketPrice));
window.addEventListener('DOMContentLoaded', populateUI);