// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  //console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre

  // create array to be returned by API
  let movieResultsToReturn = {
    title: [],
    yearReleased: [],
    genres: []
  }

  // Loop through movie data
  for (let i = 0 ; i < moviesFromCsv.length ; i++) {
    // store each item as a result
    let result = moviesFromCsv[i]
    if (result.genres != `\\N` && result.runtimeMinutes != `\\N`) {
      let movieToPush = {
        title: result.primaryTitle,
        year: result.startYear,
        genre: result.genres
      }
      // Push result into the movieResults array
      movieResultsToReturn.title.push(movieToPush.title)
      movieResultsToReturn.yearReleased.push(movieToPush.year)
      movieResultsToReturn.genres.push(movieToPush.genre)
    }
  }
  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  }
  else {
    let movieResultsToReturn = {
      numResults: 0,
      movies: []
    }

    for (let i=0; i < moviesFromCsv.length; i++) {

    }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Hello from the back-end!` // a string of data
    }
  }
}