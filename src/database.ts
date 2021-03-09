import { connect, ConnectionOptions} from 'mongoose';
import config from './config';

export async function startConnection() {

    const mongooseOptions: ConnectionOptions = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        //user: config.MONGO_USER,
        //pass:config.MONGO_PASS
    }
    try{
        //const db = await connect('mongodb://localhost/anime-quiz-API', mongooseOptions);
        const db = await connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, mongooseOptions);
        console.log("Database is connected to: " + db.connection.name);
    } catch(error) {
        console.error(error);
    }
    
}