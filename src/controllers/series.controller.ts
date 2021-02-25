import { request, Request, Response} from 'express';
import Serie from '../models/Serie';
import fs from 'fs-extra';
import path from 'path'

export async function getSeries(req: Request, res: Response): Promise<Response>{
    const series = await Serie.find();
    return res.json(series);
}

export async function saveSerie(req: Request, res: Response): Promise<Response> {

    const { title, description } = req.body;
    const newSerie = {
        title: title,
        description: description,
        imagePath: req.file.path 
    };

    //parseo al modelo de TS
    const serie = new Serie(newSerie);

    //llamada a la BBDD
    await serie.save();

    return res.json({
        message: "Serie successfully saved"
    });
}

export async function getSerie(req: Request, res: Response): Promise<Response>{
    let id = req.params.id;
    const serie = await Serie.findById(id); 
    return res.json(serie);
}

export async function deleteSerie(req: Request, res: Response): Promise<Response> {
    let id = req.params.id;
    const serie = await Serie.findByIdAndDelete(id);
    if (serie) {
        fs.unlink(path.resolve(serie.imagePath));
    }
    return res.json(
        {
            message: "Serie Deleted",
            title: serie?.title
        }
    );
}

export async function updateSerie(req: Request, res: Response): Promise<Response> {
    let id = req.params.id;
    let { title, description } = req.body;
    console.log(req.body);
    const updatedSerie = await Serie.findByIdAndUpdate(id, {
            title,
            description
        }, {new: true/*para devolver el dato actualizado*/ });
        return res.json({
            message: "Successfully updated",
            updatedSerie
        });
}
