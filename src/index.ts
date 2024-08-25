export enum CompareOperator {
    Equal           = 'eq',
    NotEqual        = 'neq',
    GreaterThan     = 'gt',
    GreaterEqual    = 'ge',
    LessThan        = 'lt',
    LessEqual       = 'le',
}

export interface Filter {
    filter: {
        property: string,
        operator: CompareOperator,
        value: any
    } | Filter[],
    and?: boolean
};

export interface OrderBy {
    property: string,
    ascending: boolean
}

export interface GetOptions {
    filters?: Filter | Filter[],
    select?: string[],
    orderBy?: OrderBy | OrderBy[],
    top?:   number,
    skip?:  number
}

interface Result {
    response?: Response,
    data?: any,
    err?: Error
}

export interface FilterProperty {

}

/**
 * @method gets the data by using the ```GET``` request
 * @param {string} url the url where you want to fetch from
 * @returns {Promise<Result>} ```err``` is undefined if the function **OR** request failed; ```response.ok``` and ```response.status``` shows if the request succeeded
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function getcii(url: string, options?: GetOptions): Promise<Result> {
    try {
        const queryParams = new URLSearchParams();

        // Manage Options
        if (options) {
            // -> options defined
            if (options.filters) {
                // -> filters exists
                queryParams.append('$filters', JSON.stringify(options.filters));
            }
    
            if (options.top) {
                // -> top exists
                queryParams.append('$top', String(options.top));
            }

            if (options.skip) {
                // -> skip exists
                queryParams.append('$skip', String(options.skip));
            }

            if (options.orderBy) {
                // -> orderBy exists
                queryParams.append('$orderBy', JSON.stringify(options.orderBy));
            }

            if (options.select) {
                // -> select exists
                queryParams.append('$select', JSON.stringify(options.select));
            }
    
            if (queryParams.size > 0) {
                // -> queryParams exists -> add params to url
                url = `${url}/?${String(queryParams)}`;
            }
        }

        // Fire Request
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            // -> Response not okay -> fill err field
            return {
                response: response,
                err: new Error(response.statusText)
            };
        }

        const data = await response.json();

        return {
            response: response,
            data: data
        };

    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
            return {
                err: err
            };
        } else {
            // -> is unknown
            console.error(err);
            return {
                err: new Error(`Unknown Error while fetching: ${err}`)
            };
        }
    }
}

/**
 * @method creates an entry by using the ```POST``` request
 * @param {string} url the url where you want to fetch from
 * @returns {Promise<Result>} ```err``` is undefined if the function **OR** request failed; ```response.ok``` and ```response.status``` shows if the request succeeded
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function createcii(url: string): Promise<Result> {
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            // -> Response not okay -> fill err field
            return {
                response: response,
                err: new Error(response.statusText)
            };
        }

        const data = await response.json();

        return {
            response: response,
            data: data
        };

    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
            return {
                err: err
            };
        } else {
            // -> is unknown
            console.error(err);
            return {
                err: new Error(`Unknown Error while fetching: ${err}`)
            };
        }
    }
}

/**
 * @method updates an entry by using the ```PUT``` request
 * @param {string} url the url where you want to fetch from
 * @returns {Promise<Result>} ```err``` is undefined if the function **OR** request failed; ```response.ok``` and ```response.status``` shows if the request succeeded
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function updatecii(url: string): Promise<Result> {
    try {

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            // -> Response not okay -> fill err field
            return {
                response: response,
                err: new Error(response.statusText)
            };
        }

        const data = await response.json();

        return {
            response: response,
            data: data
        };

    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
            return {
                err: err
            };
        } else {
            // -> is unknown
            console.error(err);
            return {
                err: new Error(`Unknown Error while fetching: ${err}`)
            };
        }
    }
}

/**
 * @method removes an entry by using the ```DELETE``` request
 * @param {string} url the url where you want to fetch from
 * @returns {Promise<Result>} ```err``` is undefined if the function **OR** request failed; ```response.ok``` and ```response.status``` shows if the request succeeded
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function removecii(url: string): Promise<Result> {
    try {

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            // -> Response not okay -> fill err field
            return {
                response: response,
                err: new Error(response.statusText)
            };
        }

        const data = await response.json();

        return {
            response: response,
            data: data
        };

    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
            return {
                err: err
            };
        } else {
            // -> is unknown
            console.error(err);
            return {
                err: new Error(`Unknown Error while fetching: ${err}`)
            };
        }
    }
}