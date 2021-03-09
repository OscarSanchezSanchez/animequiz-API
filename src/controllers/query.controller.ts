import { request, Request, Response} from 'express';
import Query from '../models/Query';
import fs from 'fs-extra';
import path from 'path'

export async function getQueryBySerieId(req: Request, res: Response): Promise<Response> {
    let serie_id = req.params.id;
    const queries = await Query.find({"serie_id": serie_id});
    return res.json(queries);
}

export async function saveQuery(req: Request, res: Response): Promise<Response> {
    let serie_id = req.params.id;
    const { query_text, difficult, responsesQuery, responsesCorrect } = req.body;

    //parsing response by Postman, con angular puede que se tenga que modificar.
    let responses = [];
    for(let i=0; i<responsesQuery.length; i++){
        responses[i] = {
            response: responsesQuery[i],
            correct: responsesCorrect[i]
        };
    }

    const newQuery = {
        serie_id: serie_id,
        query_text: query_text,
        difficult: difficult,
        imagePath: req.file.path,
        responses: responses
    }
    const query = new Query(newQuery);

    await query.save();

    return res.json({
        message: "Query successfully saved"
    });
}

export async function deleteQuery(req: Request, res: Response): Promise<Response> {
    let id = req.params.id;
    const query = await Query.findByIdAndDelete(id);

    if (query) {
        fs.unlink(path.resolve(query.imagePath));
    }
    return res.json(
        {
            message: "Query Deleted",
            title: query?.query_text
        }
    );
}