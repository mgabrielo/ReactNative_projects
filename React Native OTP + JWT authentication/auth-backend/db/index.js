const mongoose = require('mongoose')
mongoose.set('strictQuery', false);


mongoose.connect('mongodb+srv://greyscott:greys@cluster0.dsnwlyv.mongodb.net/authotp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }
).then(() =>
    console.log('db is connected')).catch((err) => console.log(err))