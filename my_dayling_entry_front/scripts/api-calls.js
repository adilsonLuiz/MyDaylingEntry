


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



generateNewEntryID();

