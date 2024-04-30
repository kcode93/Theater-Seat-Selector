//Select Items
const container = document.querySelector('.drop-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#seats-count');
const totalPrice = document.querySelector('#total-price');
const movieSelection = document.querySelector('#movie');
const clear_btn = document.querySelector('#btn-clr');
let ticketPrice = parseInt(movieSelection.value);
console.log(ticketPrice);

//updates the Selected Seats count
function updateSelectedSeatsCount(){
    //updates ticket price and seat count dynamically 
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    totalPrice.innerText = selectedSeatsCount * ticketPrice;
}

//clears the current seat selections
function clearSeatSelection(){
    const selectSeats = document.querySelectorAll('.row .seat.selected');
    selectSeats.forEach((seat)=> {
        seat.classList.remove('selected');
    });

    count.innerText = 0;
    totalPrice.innerText = ticketPrice * 0;
}

//movie select Event
movieSelection.addEventListener('change', function(e){
    //updates price dynamically as we change the ticket kind
    ticketPrice = parseInt(e.target.value);
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