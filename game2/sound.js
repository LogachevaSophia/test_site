const button = document.getElementById('mainButton')

// Disable the selected button in JavaScript based on a condition
// If the button text is 'Can you click me?'
if (button.innerText === 'Can you click me?') {
  button.disabled = true
}


function click(){
    console.log( button.disabled)
}