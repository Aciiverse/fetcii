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

enum CompareOperator {
    Equal           = 'eq',
    NotEqual        = 'neq',
    GreaterThan     = 'gt',
    GreaterEqual    = 'ge',
    LessThan        = 'lt',
    LessEqual       = 'le',
}

interface Filter {
    filter: {
        property: string,
        operator: CompareOperator,
        value: any
    } | Filter[],
    and?: boolean
}

interface OrderBy {
    property: string,
    ascending?: boolean
}

interface GetQueryParamsOptions {
    all?:       boolean;
    filters?:   boolean;
    orderBy?:   boolean;
    topSkip?:   boolean;
    select?:    boolean;
}
interface GetQueryParams {
    filters?:   Filter  | Filter[];
    orderBy?:   OrderBy | OrderBy[];
    top?:       number;
    skip?:      number;
    select?:    string[];
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
    const   data    = await getData(),
            query   = await getQueryParams(req, {topSkip: true});

    if (!data) {
        return res.status(404).send({
            message: 'No data founded'
        });
    }

    // Set games in loop bcs binding behavior
    const games: Game[] = [];
    data.games.forEach(e => {
        games.push(e);
    });

    if (query.top) {
        games.splice(0, query.skip);
        games.length = query.top;
    }

    res.status(200).send({
        message: 'Success',
        data: games
    });
});

/**
 * @method geta a single game
 * @param {string} "/games/:id" the route
 * @param {express.Request} req requested fields
 * @param {express.Response} res Result
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.2024
 */
router.get('/games/:id', async (req: express.Request, res: express.Response) => {
    const   gameId  = req.params.id,
            data    = await getData();

    if (!data || !data.games) {
        // -> dummy data not founded
        return res.status(404).send({
            message: 'No data founded'
        });
    }

    const   games   = data.games,
            game    = games.find(e => e.id === gameId);

    if (!game) {
        // -> old game not exists
        return res.status(404).send({
            message: 'Game not exists'
        });
    }

    res.status(200).send({
        message: 'Success',
        data: game
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

    res.status(201).send({
        message: 'Success'
    });
});

/**
 * @method updates a games (only handle)
 * @param {string} "/games" the route
 * @param {express.Request} req requested fields
 * @param {express.Response} res Result
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.2024
 */
router.put('/games', async (req: express.Request, res: express.Response) => {
    const   body: Game = req.body,
            data = await getData();

    if (!data || !data.games) {
        // -> dummy data not founded
        return res.status(404).send({
            message: 'No data founded'
        });
    }

    const games = data.games;

    if (    !body.description || !body.developer || !body.developingLanguage
        ||  !body.id || !body.release || !body.title) {
        // -> fields not valid
        return res.status(406).send({
            message: 'Invalid data'
        });
    }

    const oldGame = games.find(e => e.id === body.id);

    if (!oldGame) {
        // -> old game not exists
        return res.status(404).send({
            message: 'Game not exists'
        });
    }

    res.status(202).send({
        message: 'Success',
        data: body
    });
});

/**
 * @method deletes a games (only handle)
 * @param {string} "/games/:id" the route
 * @param {express.Request} req requested fields
 * @param {express.Response} res Result
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.2024
 */
router.delete('/games/:id', async (req: express.Request, res: express.Response) => {
    const   data    = await getData(),
            gameId  = req.params.id;

    if (!data || !data.games) {
        // -> dummy data not founded
        return res.status(404).send({
            message: 'No data founded'
        });
    }

    const   games   = data.games,
            game    = games.find(e => e.id === gameId);

    if (!game) {
        // -> game not exists
        return res.status(404).send({
            message: 'Game not exists'
        });
    }

    res.status(202).send({
        message: 'Success'
    });
});

/**
 * @async
 * @method gets the dummy database
 * @returns {Promise<Data | undefined>} the dummy database
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

/**
 * @async
 * @method gets the query params
 * @param {express.Request} req the route request
 * @param {GetQueryParamsOptions} options for defining which params should readed
 * @returns {Promise<GetQueryParams>} all ```query params``` as an object
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 25.08.2024
 */
async function getQueryParams(req: express.Request, options: GetQueryParamsOptions): Promise<GetQueryParams> {
    const response: GetQueryParams = {};

    if (options.all || options.filters) {
        // -> filters set -> read filters
        const filters = req.query.$filters;

        if (    filters
            &&  typeof filters === "string") {
            // -> filter string not undefined & valid
            try {
                response.filters = await JSON.parse(filters);
            } catch (err) {
                // -> response stay undefined
            }
        }
    }

    if (options.all || options.orderBy) {
        // -> orderBy set -> read orderBy
        const orderBy = req.query.$orderBy;

        if (    orderBy
            &&  typeof orderBy === "string" ) {
            // -> orderBy string not undefined & valid
            try {
                const parsed: OrderBy | OrderBy[] = await JSON.parse(orderBy);
                response.orderBy = parsed;
            } catch (err) {
                // -> response stay undefined
            }
        }
    }

    if (options.all || options.select) {
        // -> select set -> read select
        const select = req.query.$select;

        if (    select
            &&  typeof select === "string"  ) {
            // -> select string not undefined & valid
            try {
                const parsed: string[] = await JSON.parse(select);
                response.select = parsed;
            } catch (err) {
                // -> response stay undefined
            }
        } 
    }

    if (options.all || options.topSkip) {
        // -> topSkip set -> read topSkip
        const   top     = parseInt(req.query.$top   as string),
                skip    = parseInt(req.query.$skip  as string);

        if (    !isNaN(top)
            &&  typeof top  === "number"    ) {
            // -> top number not undefined & valid
            response.top = top;
        }

        if (    !isNaN(skip)
            &&  typeof skip === "number"    ) {
            // -> skip number defined & valid
            response.skip = skip;
        } else {
            // -> skip undefined -> skip initially to 0
            response.skip = 0;
        }
    }
    return response;
}

module.exports = router;