const mongoose = require('mongoose');
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connection successful.');
  } catch (err) {
    console.log('Error in DB connection : ' + err);
  }
};

const CountrySchema = new mongoose.Schema(
  {
    name: String,
    total: Number,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Country = mongoose.model('Country', CountrySchema);

const StationSchema = new mongoose.Schema(
  {
    id: Number,
    version: Number,
    cityId: Number,
    cityName: String,
    alias: String,
    title: String,
    frequency: String,
    rank: Number,
    radioListeners: String,
    country: String,
    status: Number,
    genres: [String],
    genreIds: [Number],
    catIds: [Number],
    description: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Station = mongoose.model('Station', StationSchema);

const failedSchema = new mongoose.Schema(
  {
    country: String,
    alias: String,
    url: String,
    error: String,
  },
  { timestamps: true },
);

const Failed = mongoose.model('Failed', failedSchema);

module.exports = {
  dbConnect,
  Country,
  Station,
  Failed,
};
