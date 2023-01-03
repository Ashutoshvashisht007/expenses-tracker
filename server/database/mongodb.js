import mongoose from 'mongoose'; 

async function connect()
{
    const username = process.env.MONGO_DB_USERNAME;
    const password = process.env.MONGO_DB_PASSWORd;
    const url = process.env.MONGO_DB_URL;
    // connecting with mongodb
    await mongoose.connect(`mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`)
    console.log('MongoDB connection is successful');
}
 
export default connect;