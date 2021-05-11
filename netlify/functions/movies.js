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
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre

     
  // Check for year and genre, return error if either is undefined
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Tell me what year and genre you want to see!` // a string of data
    }
  }
  // define array to hold results of call
  else {
    let movieResultsToReturn = {
      numResults: 0,
      movies: []
    }
    // loop through data
    for (let i=0; i < moviesFromCsv.length; i++) {
      let result = moviesFromCsv[i]

      // create constraints for year, genre
      let genreCheck = `${result.genres}`
      let yearCheck = `${result.startYear}`

     // check to ensure genre, year match user input, run time is not \\N. Do not need additional check for genre = \\N with first constraint
      if (genreCheck.includes(`${genre}`) == true && yearCheck.includes(`${year}`) && result.runtimeMinutes != `\\N`) {
        let movieToPush = {
         title: result.primaryTitle,
          year: result.startYear,
          genre: result.genres
      }

      // Push result into the movieResults array
      movieResultsToReturn.movies.push(movieToPush)
      // add one to numResults
      movieResultsToReturn.numResults = movieResultsToReturn.numResults + 1
  
    }
  }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(movieResultsToReturn) // a string of data
    }
  }
}