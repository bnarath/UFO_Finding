// from data.js
var tableData = data;

function filterUnique(value, index, array){
    return array.indexOf(value)==index; //Returns true only if the value is the first occurance of that value; else false
}

function addTableAndDropdown(selector, tableData){
    //This function chooses the tableData and appends that to the selector in html (which is supposed to be a tablebody) 
    //Also adds the dropdown with the unique values

    //Select the table body element from html page
    tbody=d3.select(selector)
    //To make sure that data is not appended over and over
    tbody.html("")
    //Take out each row and display
    
    //Select and clear infobox (to clear off any previous info)
    infobox = d3.select('#info-box');
    infobox.html("");

    //Revert to the initial dropdown each time
    d3.select("#date-dropdown").html('<option disabled class="bg-danger">date</option>');
    d3.select("#city-dropdown").html('<option disabled class="bg-danger">city</option>');
    d3.select("#state-dropdown").html('<option disabled class="bg-danger">state</option>');
    d3.select("#country-dropdown").html('<option disabled class="bg-danger">country</option>');
    d3.select("#shape-dropdown").html('<option disabled class="bg-danger">shape</option>');

    //console.log(tableData.length)
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

    //Select the unique values of city, state, country and shape
    //Add these values as dropdown options to the respective table columns
    tableData.map(row=>row.datetime).filter(filterUnique).forEach(function(item) {
        d3.select("#date-dropdown").append("option").html(item)
                                                    .property("value", item);
    })
    tableData.map(row=>row.city).filter(filterUnique).forEach(function(item) {
        d3.select("#city-dropdown").append("option").html(item)
                                                    .property("value", item);
    })
    tableData.map(row=>row.state).filter(filterUnique).forEach(function(item) {
        d3.select("#state-dropdown").append("option").html(item)
                                                    .property("value", item);
    })
    tableData.map(row=>row.country).filter(filterUnique).forEach(function(item) {
        d3.select("#country-dropdown").append("option").html(item)
                                                    .property("value", item);
    })
    tableData.map(row=>row.shape).filter(filterUnique).forEach(function(item) {
        d3.select("#shape-dropdown").append("option").html(item)
                                                    .property("value", item);
    })
}

function filterTable(){
    //select the values of the filters
    var dates = [];
    for (var option of d3.select("#date-dropdown").property("selectedOptions")){
        dates.push(option.value)
    }
    //Map dates to timestamp
    dates = dates.map(date => {
        date_modified = new Date(date);
        date_modified = date_modified.getTime();
        return date_modified;
    })
    //city
    var city = [];
    for (var option of d3.select("#city-dropdown").property("selectedOptions")){
        city.push(option.value)
    }
    //state
    var state = [];
    for (var option of d3.select("#state-dropdown").property("selectedOptions")){
        state.push(option.value)
    }
    //country
    var country = [];
    for (var option of d3.select("#country-dropdown").property("selectedOptions")){
        country.push(option.value)
    }
    //shape
    var shape = [];
    for (var option of d3.select("#shape-dropdown").property("selectedOptions")){
        shape.push(option.value)
    }
    //Filter based on all the chosen values if any
    var filteredTableData = tableData;
    if(dates.length){
        filteredTableData =  filteredTableData.filter(row => {
            date = new Date(row.datetime);
            console.log(date.getTime())
            if (dates.includes(date.getTime())) return true; else false;
        })
    }
    if(city.length){
        filteredTableData =  filteredTableData.filter(row=>city.includes(row.city))
    }
    if(state.length){
        filteredTableData =  filteredTableData.filter(row=>state.includes(row.state))
    }
    if(country.length){
        filteredTableData =  filteredTableData.filter(row=>country.includes(row.country))
    }
    if(shape.length){
        filteredTableData =  filteredTableData.filter(row=>shape.includes(row.shape))
    }
    //console.log(filteredTableData);
    addTableAndDropdown('#ufo-table>tbody', filteredTableData);
    if (! filteredTableData.length){
        d3.select("#info-block").style("display", "block");
        infobox.html(`<p>There is no alien info available on the chosen filters.</p><p>Try to chose filters one after the other!</p>`);
    }

}

addTableAndDropdown('#ufo-table>tbody', tableData);

button = d3.select('#filter-btn');
button.on("click", filterTable);

reset = d3.select('#reset-filter-btn');
reset.on("click", function(){
    addTableAndDropdown('#ufo-table>tbody', tableData);
})

