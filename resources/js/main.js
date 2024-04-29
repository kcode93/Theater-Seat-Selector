//Select Items
const container = document.querySelector('.drop-container');
const seats = document.querySelectorAll('.row .seats:not(.occupied)');
const count = document.querySelector('#seats-count');
const totalPrice = document.querySelector('#total-price');
const movieSelection = document.querySelector('#movie');
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

//movie select Event
movieSelection.addEventListener('change', function(e){
    //updates price dynamically as we change the ticket kind
    ticketPrice = parseInt(e.target.value);
    updateSelectedSeatsCount();
});

//adds event listener to seats in rows not for display
container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedSeatsCount();
    }

});