// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

//Add hidden class to the modal so it doesn't appear when the screen is first loaded
const error = document.getElementById('modal');
error.className = 'hidden';

// When a user clicks on an empty heart:
// Invoke mimicServerCall to simulate making a server request
// When the "server" returns a failure status:
// Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
// Display the error modal by removing the .hidden class
// Display the server error message in the modal
// Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
// When the "server" returns a success status:
// Change the heart to a full heart
// Add the .activated-heart class to make the heart appear red


const likeGlyph = document.querySelectorAll('footer li .like-glyph');
likeGlyph.forEach(emoji => emoji.addEventListener('click', handleHeartClick));


function handleHeartClick(event) {
  mimicServerCall()
  .then(completeSuccessfulServerCall(event))
  .catch((resp) => completeFailedServerCall(resp))
}

function completeSuccessfulServerCall (event) {
  console.log('success')
 // console.log('target value:', event.target.textContent)
  if(event.target.textContent === EMPTY_HEART) {
    event.target.textContent = FULL_HEART;
    event.target.className = 'activated-heart';
  }
  else if (event.target.textContent === FULL_HEART) {
    event.target.textContent = EMPTY_HEART;
    event.target.classList.remove('activated-heart');
  }
}

function completeFailedServerCall (resp) {
  console.log(resp);
  error.classList.remove('hidden');
  const errorP = document.getElementById('modal-message');
  errorP.textContent = resp;
  setTimeout(() => error.className = 'hidden', 3000);
}

//likeGlyph.addEventListener('click', event => console.log(event));

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
