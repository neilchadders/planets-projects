const { parse } = require('csv-parse'); //csv-parse is an npm package
const fs = require('fs');

const habitablePlanets = [];


function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'  // On the CSV file simply means planets existence is confirmed
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 //  Amount of light needed for life (where Earth === 1)
        && planet['koi_prad'] < 1.6 // Radius of planet
}


fs.createReadStream('kepler_data.csv') // readable data - stream as lots of data
    .pipe(parse({
        comment: '#', // This is because # is before COMMENT on this particular file
        columns: true  //Will return each row as a javascript object
    })) // pipe method here will connect the readable stream from above into a writable stream using csv-parse
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data)
        }
    })
    .on('error', (err) => {
        console.log(err)
    })
    .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
    });