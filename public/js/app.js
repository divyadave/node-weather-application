console.log('Client Loaded');


const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchInput.value;
    msg1.textContent = "";
    msg2.textContent = "";

    fetch('http://localhost:3000/weather?address='+location).then((res) => {
    res.json().then((data) => {
        if(data.error) {

            msg1.textContent = data.error;
        }
        else {
            console.log(data.location);
            console.log(data.forcast);
           msg1.textContent = data.location;
           msg2.textContent = data.forecast;
        }
    })
})
})