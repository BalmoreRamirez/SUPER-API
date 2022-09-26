const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('****DATABASE RUN ONLINE ');
    } catch (error) {
        console.log(error);
        throw new Error('***ERROR NOT DATABASE ONLINE***');
    }
}

module.exports = {
    dbConnection
}
