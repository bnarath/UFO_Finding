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


function dateFilter(){
    //To prevent from reloading the page
    d3.event.preventDefault();
    //Clear previous errors
    error=d3.select('#input-error');
    error.html("");
    infobox = d3.select('#info-box');
    infobox.html("");
    //Default infoblock visibility to none
    d3.select("#info-block").style("display", "none");
    try{

        var entered = form.select('#datetime').property("value");
        //Create a date object with year-month-date
        //Assuming all the timevalues are in UTC
        var date_array = entered.split("/")
        var mydate = new Date(`${date_array[0]}-${date_array[1]}-${date_array[2]}`);
        console.log(mydate.valueOf())
        //console.log(mydate.toUTCString())
        if (isNaN(mydate.valueOf())){
            error.html("Please enter the date in the correct format :MM/DD/YYYY (Year strictly in 4 digits)");
            d3.select('#ufo-table>tbody').html("");
        }
        else {
            //Filter table based on date
            //console.log(mydate.getTime())//Timestamp format
            var filtered_table = tableData.filter(row=>
                {date = new Date(row.datetime)
                return date.getTime()==mydate.getTime()});
            console.log(filtered_table)
            addTable('#ufo-table>tbody', filtered_table);
            if (! filtered_table.length){
                d3.select("#info-block").style("display", "block");
                infobox.html(`<p>There is no alien info available on the date ${entered}.</p><p>Try a date between 1/1/2010 and 1/13/2010 !</p>`);
            }
        }
    }
    catch(err){
        error.html("Please enter the date in the correct format :MM/DD/YYYY (Year strictly in 4 digits)");
    }
    
}
//on submit
form = d3.select('#form-date');
button = d3.select('#filter-btn');
form.on("submit",dateFilter);
button.on("click",dateFilter);
//reset
reset = d3.select('#reset-filter-btn');
reset.on("click", function(){
    addTable('#ufo-table>tbody', tableData);
})