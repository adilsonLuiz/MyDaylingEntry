/*
    Call the API to get database data for entrys
*/



function generateNewEntryID() {
    
    const path = window.location.pathname.split("/").pop();

    if (path == 'newEntry.html') {

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

}

generateNewEntryID();


/*
    Make post in API with new EntryID

*/
function postEntryID() {


    /*
    ao clicar no botao
    Coletar todos os valores necessarios para a chamada da API
    Checar se os valores de titulo e content não estão vazios
    Se valores estiverem vazios
        exibir uma mensagme informando que é necessario preencher e não prosseguir
    senao
        realizar chamada para API e enviar dados para post
        se 200
            informar usuario que nota foi inserida com sucesso
        se nao
            informar que houve um erro e para tentar novamente mais tarde
    */


    let id = document.getElementsByClassName('page__entry-id-number')[0].innerHTML;
    let entryTitle = document.getElementById('entry-title').value;
    let entryContet = document.getElementById('entry-content').value;


    if (!entryTitle || !entryContet) { // Se o title estiver sem preenchimento

        alert('Verifique se o Titulo ou Conteudo da nota não esta vazio!');
    }
    else {
        alert('Enviando conteudo...');


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
                alert('Nova entrada registrada com sucesso!')
    
            })
            .catch((error) => { // Error
    
                alert('Erro ao realizar nova entrada: ' + error);
            })
    }


    
}


function getAllEntrys() {

    const path = window.location.pathname.split("/").pop();

    if (path == 'showEntrys.html') {

        fetch('http://127.0.0.1:5000/entrys', {
        method: 'get'
        })
        .then(response  => response.json())
        .then(data => { // Sucess response
  


            const tableEntrys = document.getElementById('table-entrys');
            const entrysData = data['entrys'];
            const hrefLinkShowEntry = '../pages/showEntry.html';
            
            // Create <a> tag and sett the link


            // Populate table dinamic with data
            for (var row = 0; row <= entrysData.length; row++) {
                
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

}

getAllEntrys();


