import { Schema, model, Document} from 'mongoose'

const serieSchema = new Schema(
    {
        title: String,
        description: String,
        imagePath: String
    },
    {
        timestamps: true,
        versionKey: false
    }
);

//Para que Typescript conozca el modelo de la BBDD 
interface ISerie extends Document{
    title: string,
    description: string,
    imagePath: string
}

export default model<ISerie>('Serie', serieSchema);