const { QueryTypes } = require("sequelize");
const { DBConnection } = require("./ConnectionObject");
const queries = require("../config/dbQueries.json").queries;
const {rooms} = require("../config/rooms.json")
const moviesToPopulate = require("../config/movies.json").movies;
let finalFirstPopulationQuery = queries.firstMoviesTablePopulation;
let finalRoomsFirstPopulationQuery = queries.firstRoomsPopulation

moviesToPopulate.forEach((element) => {
  finalFirstPopulationQuery += `("${element.original_title}","${
    element.poster_path
  }","${element.overview}",${element.duration_ms},${element.movie_time.join(
    ""
  )},"${element.genre_ids}"),`;
});
// console.log(finalFirstPopulationQuery);

DBConnection.query(
  finalFirstPopulationQuery.substring(0, finalFirstPopulationQuery.length - 1),
  {
    type: QueryTypes.INSERT,
  }
)
  .then(() => { 
      console.log("Table movies populated correctly")
  })
  .catch((error) => {
    console.log(error.sqlMessage);
    console.log("error");
  });
rooms.forEach(element=>{
  finalRoomsFirstPopulationQuery += `(${element.room_capacity},"${element.room_type}"),`
})
DBConnection.query(finalRoomsFirstPopulationQuery.substring(0,finalRoomsFirstPopulationQuery.length-1), {
  type: QueryTypes.INSERT
}).then(() => { 
  console.log("Table rooms populated correctly")
})
.catch((error) => {
console.log(error.sqlMessage);
console.log("error");
});
