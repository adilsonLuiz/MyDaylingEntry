


function generateRow(totalRow=20, totalCell=3, data) {

    const tableEntrys = document.getElementById('table-entrys');
    
    for (var row = 0; row <= totalRow; row++) {

        const newRow  = document.createElement('tr');

        for (var cell = 0; cell < totalCell; cell++) {
            
            const tempCell = document.createElement('td');

            tempCell.textContent = row;

            newRow.appendChild(tempCell)
        }

        tableEntrys.appendChild(newRow);
    }
    
}