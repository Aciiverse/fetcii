import express = require('express');
const router = express.Router();

interface Game {
    id: string;
    title: string;
    description: string;
    release: string;
    developingLanguage: string;
    developer: string;
}

interface Data {
    games: Game[];
}

/**
 * @method service status route
 * @param {string} "/" the route
 * @param {express.Request} req requested fields
 * @param {express.Response} res Result
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 15.08.2024
 */
router.get('/', (req: express.Request, res: express.Response) => {
    const   today   = new Date(),
            options = {
                day:    '2-digit' as "2-digit" | "numeric",
                month:  '2-digit' as "2-digit" | "numeric",
                year:   'numeric' as "2-digit" | "numeric",
                hour:   '2-digit' as "2-digit" | "numeric",
                minute: '2-digit' as "2-digit" | "numeric",
                second: '2-digit' as "2-digit" | "numeric"
            };
    res.status(200).send({
        message: `Service alive! Time: ${today.toLocaleDateString('de-DE', options)}`
    });
});

/**
 * @async
 * @method gets games
 * @param {string} "/games" the route
 * @param {express.Request} req requested fields
 * @param {express.Response} res Result
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.2024
 */
router.get('/games', async (req: express.Request, res: express.Response) => {
    const data = await getData();

    if (!data) {
        return res.status(404).send({
            message: 'No data founded'
        });
    }

    res.status(200).send({
        message: 'Success',
        data: data.games
    });
});

/**
 * @method creates a games (only handle)
 * @param {string} "/games" the route
 * @param {express.Request} req requested fields
 * @param {express.Response} res Result
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.2024
 */
router.post('/games', (req: express.Request, res: express.Response) => {
    const body: Game = req.body;

    if (    !body.description || !body.developer || !body.developingLanguage
        ||  !body.id || !body.release || !body.title) {
        // -> fields not valid
        return res.status(406).send({
            message: 'Invalid data'
        });
    }

    res.status(200).send({
        message: 'Success'
    });
});

/**
 * @async
 * @method gets the dummy database
 * @returns {Data | undefined} the dummy database
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.2024
 */
async function getData(): Promise<Data | undefined> {
    try {
        const data = await require('../data.json') as Data;
        return data
    } catch (err) {
        console.error(err);
        return undefined;
    }

}

module.exports = router;