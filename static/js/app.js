// from data.js
var tableData = data;

function addTable(selector, tableData){
    //This function chooses the tableData and appends that to the selector in html (which is supposed to be a tablebody) 
    //Select the table body element from html page
    tbody=d3.select(selector)
    //To make sure that data is not appended over and over
    tbody.html("")
    //Take out each row and display
    tableData.forEach(row => {
        //Append the dable
        //Append data in the order of City, State, Country, Shape, Duration and comments
        //as td in the table body
        tr=tbody.append('tr');
        tr.append('td').html(row.datetime);
        tr.append('td').html(row.city);
        tr.append('td').html(row.state);
        tr.append('td').html(row.country);
        tr.append('td').html(row.shape);
        tr.append('td').html(row.durationMinutes);
        tr.append('td').html(row.comments);
    })
}

addTable('#ufo-table>tbody', tableData);
