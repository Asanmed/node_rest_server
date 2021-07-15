const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Database status ONLINE');
    } catch (error) {
        throw new Error('Error while initializing the database');
    }
};

module.exports = {
    dbConnection,
};
