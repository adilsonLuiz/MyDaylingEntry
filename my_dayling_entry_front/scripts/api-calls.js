/*
    Call the API to get database data for entrys
*/


// TODO implementar botões de atualizar e deletar nota
const path = window.location.pathname.split("/").pop();
const endpoint = 'http://127.0.0.1:5000/'

switch (path) {
    
    case 'showEntry.html':
        getEntryData();
        break;
    case 'newEntry.html':
        generateNewEntryID();
        break;
    case 'showEntrys.html':
        getAllEntrys();
        break;
    case 'about.html':
        getAboutInformations();
        break;

}


/*
    GET Method
    Generate next entryID to insert
*/
function generateNewEntryID() {
    
    fetch('http://127.0.0.1:5000/generate_new_entry_id', {
    method: 'get'
    })
    .then(response  => response.json())
    .then(data => { // Sucess response
        
        let daylingID = document.getElementsByClassName('page__entry-id-number')[0];
        daylingID.innerHTML = data['entryID'];

    })
    .catch((error) => { // Error

        let daylingID =  document.getElementsByClassName('page__entry-id-number')[0];
        daylingID.innerHTML = 'DAYGENERIC';
    })

}


/*
    POST Method
    Post new EntryID information in database
*/
function postEntryID() {

    let id = document.getElementsByClassName('page__entry-id-number')[0].innerHTML;
    let entryTitle = document.getElementById('entry-title').value;
    let entryContet = document.getElementById('entry-content').value;


    if (!entryTitle || !entryContet) { // Se o title estiver sem preenchimento

        alert('Verifique se o Titulo ou Conteudo da nota não esta vazio!');
    }
    else {

        const newEntryPost = new FormData();
        
        newEntryPost.append('entryID', id);
        newEntryPost.append('title', entryTitle);
        newEntryPost.append('content', entryContet);

        fetch('http://127.0.0.1:5000/new_entry', {
            method: 'POST',
            body: newEntryPost
            })
            .then(response  => response.json())
            .then(data => { // Sucess response
                alert('Nova entrada registrada com sucesso!');
                window.location.replace('index.html');
    
            })
            .catch((error) => { // Error
    
                alert('Erro ao realizar nova entrada: ' + error);
            })
    }


    
}

/*
    GET Method
    Get all Entrys in database
*/
function getAllEntrys() {


    fetch('http://127.0.0.1:5000/entrys', {
    method: 'get'
    })
    .then(response  => response.json())
    .then(data => { // Sucess response

        const tableEntrys = document.getElementById('table-entrys');
        const entrysData = data['entrys'];
        //const hrefLinkShowEntry = '../pages/showEntry.html';
        
        // Create <a> tag and sett the link


        // Populate table dinamic with data
        for (var row = 0; row <= entrysData.length; row++) {
            
            // Generate link

            const hrefLinkShowEntry = '../pages/showEntry.html?entryID=' + entrysData[row].entryID;
            // Criação de nova linha
            const newRow  = document.createElement('tr');
            
            
            const entryIDCell = document.createElement('td');
            const entryTitleCell = document.createElement('td');
            const entryCreatedCell = document.createElement('td');
            
            // Create EntryID link to append to TD
            const linkShowEntry = document.createElement('a');
            linkShowEntry.setAttribute('href', hrefLinkShowEntry);
            linkShowEntry.text = entrysData[row].entryID;

    
            // Append link to entryID
            entryIDCell.appendChild(linkShowEntry);
            entryTitleCell.textContent = entrysData[row].title;
            entryCreatedCell.textContent = entrysData[row].created;
            

            // Apprend element to new row
            newRow.appendChild(entryIDCell);
            newRow.appendChild(entryTitleCell);
            newRow.appendChild(entryCreatedCell);
            
            // Append new Row to main table
            tableEntrys.appendChild(newRow);
        }

    })
    .catch((error) => { // Error

        console.log('Error: ' + error);
    })
}


/*
    GET Method
    Get unique entryID information
*/
function getEntryData() {

    entryID = new URLSearchParams(window.location.search).get('entryID');


    fetch('http://127.0.0.1:5000/entry?entryID=' + entryID, {
        method: 'get'
        })
        .then(response  => response.json())
        .then(data => { // Sucess response
            
            console.log(data);

            // Sett data valuer
            document.getElementsByClassName('page__entry-id-number')[0].innerHTML = data['entryID'];
            document.getElementById('entry-title').innerHTML = data['title'];
            document.getElementById('entry-content').innerHTML = data['content'];

        })
        .catch((error) => { // Error

            console.log('Error: ' + error);
        })
}


/*
    DELETE Method
    Get unique entryID information
*/
function deleteEntry() {

    entryID = new URLSearchParams(window.location.search).get('entryID');
    confirmDelete = confirm('Deseja realmente deletar a nota atual?');

    if (confirmDelete) {

        fetch('http://127.0.0.1:5000/entry?entryID=' + entryID, {
            method: 'delete'
            })
            .then(response  => response.json())
            .then(data => { // Sucess response
                
                console.log(data);
                alert('Nota deletada com sucesso');
                window.location.replace('showEntrys.html');
    
            })
            .catch((error) => { // Error
                console.log('Error: ' + error);
            })
    }

}


/*
    PUT Method
    Get unique entryID information
*/
function updateEntry() {

    entryID = new URLSearchParams(window.location.search).get('entryID');
 
    let entryTitle = document.getElementById('entry-title').value;
    let entryContet = document.getElementById('entry-content').value;

    if (!entryTitle || !entryContet) { 
        alert('Verifique se o Titulo ou Conteudo da nota não esta vazio!');
    }
    else {

        const updateEntry = new FormData();
        updateEntry.append('title', entryTitle);
        updateEntry.append('content', entryContet);


        fetch('http://127.0.0.1:5000/entry?entryID=' + entryID, {
            method: 'put',
            body: updateEntry
            })
            .then(response  => response.json())
            .then(data => { // Sucess response
                
                console.log(data);
    
                let entryTitle = document.getElementById('entry-title').value;
                let entryContet = document.getElementById('entry-content').value;
            
                const newEntryPost = new FormData();
                newEntryPost.append('title', entryTitle);
                newEntryPost.append('content', entryContet);

                alert('Nota atualizada com sucesso');
                window.location.replace('showEntrys.html');
            })
            .catch((error) => { // Error
                console.log('Error: ' + error);
            })
    }
}

/*
    GET Method
    Get all information necessary from application
*/
function getAboutInformations() {

    let dateNow = new Date();

    
    fetch('http://127.0.0.1:5000/about', {
        method: 'GET'
        })
        .then(response  => response.json())
        .then(data => { // Sucess response
            
            console.log(data);
            
            const timePage = document.getElementById('time-now');
            const apiVersion = document.getElementById('api-version');



            // sett informations
            timePage.innerHTML = `<b>DATE: <b>${dateNow}`;
            apiVersion.innerHTML = `<b>API VERSION: <b> ${data['api_version']}`;

        })
        .catch((error) => { // Error

            alert('Erro ao realizar nova entrada: ' + error);
        })
    

}