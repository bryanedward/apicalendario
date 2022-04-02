const { default: mongoose } = require("mongoose");


const dbMongoose = async () => {
    try {
        await mongoose.connect("mongodb://mongodb:27017/calendario",{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }).then((item) => console.log('mongoose'))
        .catch((err) => console.log(err))
    } catch (error) {
        console.log(error);
    }
}
 

module.exports = dbMongoose

