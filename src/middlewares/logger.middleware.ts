import { Request, Response, NextFunction } from 'express';

export function logger (req: Request, res: Response, next: NextFunction) {

        const newDate = new Date()
        const hours = newDate.toLocaleTimeString()
        const date = newDate.toLocaleDateString()

        console.log(`Hola, soy un middleware GLOBAL que logueo la ruta "${req.url}" del metodo "${req.method}" a la hora "${hours}" y la fecha "${date}".`);
        next()
    }
