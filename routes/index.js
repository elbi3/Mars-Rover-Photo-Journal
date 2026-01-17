var express = require('express');
var router = express.Router();
// const request = require("request"); //deprecated
const { getRoverPhotos } = require("../services/rovers");

const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
let nowObject = dayjs();
let nowYear = nowObject.$y;
let nowMonth = nowObject.$M;
let nowDay = nowObject.$D;
let today = `${nowYear}-${nowMonth}-${nowDay}`;

const apiKey = process.env.API_KEY;

const roversList = ["curiosity", "opportunity", "perseverance", "spirit"];

// * Mars Rover Photos
const apiRoversUrlDefault = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity";
const apiRoversBaseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers";
const apiParamEarthDate = `/photos?earth_date=${today}&page=1&api_key=${apiKey}`;
const apiParamLatestPhotos = `/latest_photos?api_key=${apiKey}`;
const currentPhoto = `${apiRoversUrlDefault}${apiParamLatestPhotos}`;

router.use((req, res, next) => {
  res.locals.roversList = roversList;
  res.locals.apiRoversBaseUrl = apiRoversBaseUrl;
  res.locals.apiParamEarthDate = apiParamEarthDate;
  next();
});


router.get("/", async (req, res, next) => {
  try {
    const photos = await getRoverPhotos("curiosity");
    res.render("index", { parsedData: photos });
  } catch (err) {
    next(err);
  }
});

router.get("/curiosity", async (req, res, next) => {
  console.log("rover param: ", req.params.rover);
  try {
    const photos = await getRoverPhotos("curiosity");
    res.render("curiosity", { parsedData2: photos });
  } catch ( err) {
    next(err);
  }
});

router.get("/opportunity", async (req, res, next) => {
  console.log("rover param: ", req.params.rover);
  try {
    const photos = await getRoverPhotos("opportunity");
    res.render("opportunity", { parsedData3: photos });
  } catch ( err) {
    next(err);
  }
});

router.get("/perseverance", async (req, res, next) => {
  console.log("rover param: ", req.params.rover);
  try {
    const photos = await getRoverPhotos("perseverance");
    res.render("perseverance", { parsedData4: photos });
  } catch ( err) {
    next(err);
  }
});

router.get("/spirit", async (req, res, next) => {
  console.log("rover param: ", req.params.rover);
  try {
    const photos = await getRoverPhotos("spirit");
    res.render("spirit", { parsedData5: photos });
  } catch ( err) {
    next(err);
  }
});


// saving old routes for future reference

// router.get('/', function(req, res, next) {
//   request.get(currentPhoto, (error, response, roverData) => {
//     const parsedData = JSON.parse(roverData);
//     res.render("index", {
//       parsedData: parsedData.latest_photos
//     })
//   });
// });

// router.get("/curiosity", (req, res, next) => {
//   const curiosityPicsToday = `${apiRoversBaseUrl}/curiosity${apiParamLatestPhotos}`;
//   request.get(curiosityPicsToday, (error, response, curiosityData) => {
//     const parsedData2 = JSON.parse(curiosityData);
//     res.render("curiosity", {
//       parsedData2: parsedData2.latest_photos
//     })
//   })
// });


// router.get("/opportunity", (req, res, next) => {
//   const curiosityPicsToday = `${apiRoversBaseUrl}/opportunity${apiParamLatestPhotos}`;
//   request.get(curiosityPicsToday, (error, response, curiosityData) => {
//     const parsedData3 = JSON.parse(curiosityData);
//     res.render("opportunity", {
//       parsedData3: parsedData3.latest_photos
//     }) 
//   })
// });


// router.get("/perseverance", (req, res, next) => {
//   const curiosityPicsToday = `${apiRoversBaseUrl}/perseverance${apiParamLatestPhotos}`;
//   request.get(curiosityPicsToday, (error, response, curiosityData) => {
//     const parsedData4 = JSON.parse(curiosityData);
//     res.render("perseverance", {
//       parsedData4: parsedData4.latest_photos
//     })
//   })
// });

// router.get("/spirit", (req, res, next) => {
//   const curiosityPicsToday = `${apiRoversBaseUrl}/spirit${apiParamLatestPhotos}`;
//   request.get(curiosityPicsToday, (error, response, curiosityData) => {
//     const parsedData5 = JSON.parse(curiosityData);
//     res.render("spirit", {
//       parsedData5: parsedData5.latest_photos
//     })
//   })
// });

module.exports = router;
