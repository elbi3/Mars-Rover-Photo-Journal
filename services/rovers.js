const path = require("path");
const fs = require("fs/promises");

const USE_MOCK_DATA = true; //toggle if find new API
const apiKey = process.env.API_KEY;
const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers";


// import Curiosity mock data
// const curiosityMock = require("../data/sol1000Data.js");

// import mock data
const mockData = {
    curiosity: require("../data/sol1000Data.js"),
    opportunity: require("../data/opportunitySol1.js"),
    spirit: require("../data/spiritSol1.js"),
    perseverance: require("../data/perseveranceSol0.js")
};

async function getRoverPhotos(rover) {
    if(USE_MOCK_DATA) {
        // const filePath = path.join(__dirname, `../mock/${rover}.json`);
        // const raw = await fs.readFile(filePath, "utf-8");
        // const data = JSON.parse(raw);

        // compatibility shim for historical NASA endpoints
        // if (curiosityMock.latest_photos) {
        //     return curiosityMock.latest_photos;
        // }

        // if (curiosityMock.photos) {
        //     return curiosityMock.photos;
        // }
        const photos = mockData[rover]?.photos ?? mockData.curiosity.photos;

        return photos.map(photo => ({
            ...photo,
            img_src: photo.img_src?.replace(/^http:\/\//, "https://")
        }));
        // throw new Error(`Mock data has no photos array`);
    }

    const url = `${baseUrl}/${rover}/latest_photos?api_key=${apiKey}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.latest_photos;
}

module.exports = { getRoverPhotos };