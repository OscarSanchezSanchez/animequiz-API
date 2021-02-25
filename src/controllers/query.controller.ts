import { request, Request, Response} from 'express';
import Query from '../models/Query';
import fs from 'fs-extra';
import path from 'path'

export async function getQueryBySerieId(req: Request, res: Response): Promise<Response> {
    let serie_id = req.params.id;
    const queries = await Query.find({"__id": serie_id});
    return res.json(queries);
}

export async function saveQuery(req: Request, res: Response): Promise<Response> {
    let serie_id = req.params.id;
    const { query_text, responses } = req.body;
    const newQuery = {
        serie_id: serie_id,
        query_text: query_text,
        imagePath: req.file.path,
        responses: responses
    }

    const query = new Query(newQuery);

    await query.save();

    return res.json({
        message: "Query successfully saved"
    });
}