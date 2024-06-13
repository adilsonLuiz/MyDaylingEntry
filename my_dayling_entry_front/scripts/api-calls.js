


/*
    Call the API to get database data for entrys

*/
function getNewEntryID() {

    fetch('http://127.0.0.1:5000/new_entry_id', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(error  => {
        console.log('Error: ' + error);
    })
}


function checkPageToGetEntryID() {

    const path = window.location.pathname;

    if (path == '/newEntry') {
        getNewEntryID();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    
    checkPageToGetEntryID();
});

getNewEntryID();

console.log('teste');
