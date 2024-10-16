const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});//collection khali korbe
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "667ed5ba84ece89075ef580b" }));  
  await Listing.insertMany(initData.data);//new data add korbe
  console.log("data was inistialized");
}

initDB();//calling the func