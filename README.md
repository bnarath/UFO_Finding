# JavaScript and DOM Manipulation

*Aliens definitely exist and it's possible they're living among us on Earth but have gone undetected so far. Here, you find the evidence!!!*

![background](static/images/nasa2.jpg)


WAKE UP SHEEPLE! The extra-terrestrial menace has come to Earth and `ALIENS-R-REAL` have collected all of the eye-witness reports they could to prove it! This data has to be put online for the world to see and then the matter will finally be put to rest.

In this project, we create table dynamically based upon a [dataset](static/js/data.js) and allow users to filter the table data for specific values, by using JavaScript, HTML, CSS, and D3.js.

## Website is published [here](https://bnarath.github.io/UFO_Finding/)

## Features
Website has 2 services

### Basic search
Automatic Table and Date Search

* HTML web page [index.html](index.html) with the table and a date search option.

* [JS code](static/js/app.js) appends a table to the web page and then adds new rows of data for each UFO sighting.

  * Table has columns for `date/time`, `city`, `state`, `country`, `shape`, `duration` and  `comment`.

* User can input `date/time` and the filtered data that match user input is displayed.
* If the user date format is not correct, the error is displayed.
* If there is no data available for the user date input, that is also displayed.
* Reset button to reset the table.
* This page is linked to the advanced search page.

### Multiple Search Categories

* User can select multiple search criteria for the below attributes:

  1. `date/time`
  2. `city`
  3. `state`
  4. `country`
  5. `shape`
* Reset button to reset the table.
* If there is no data available for the user selected options, that is displayed as a notification.
* This page is linked to the basic search page.
* Reset button to reset the table and the search filters.
- - -

### Dataset
* [UFO Sightings Data](static/js/data.js)
