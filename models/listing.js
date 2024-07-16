const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [ //one to many relation
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],//location type must be 'point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required:true,
    }
  },
});

listingSchema.post("findOneAndDelete", async (Listing) => {
  if (Listing) {
    await Review.deleteMany({ _id: { $in: Listing.reviews } });
    //je listing ta delete hobe tar reviews array er moddhyer review gulo/the array delete hobe
  }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;