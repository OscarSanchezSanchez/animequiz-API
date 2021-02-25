import  { connect } from 'mongoose';

export async function startConnection() {
    await connect('mongodb://localhost/anime-quiz-API',
    {
        useNewUrlParser: true,
        useFindAndModify: false
    });
    console.log("Database is connected");
}