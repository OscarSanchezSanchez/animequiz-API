import { Schema, model, Document} from 'mongoose';

const querySchema = new Schema(
    {
        serie_id: String,
        query_text: String,
        imagePath: String,
        responses: [{
            response: String,
            correct: Boolean
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

interface IQuery extends Document{
    serie_id: string,
    query_text: string,
    responses: [{
        response: string,
        correct: boolean
    }]
}

export default model<IQuery>('Query', querySchema);