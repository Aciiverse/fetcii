export interface GetOptions {
    // cooming soon
}

/**
 * @method gets the data by using the ```GET``` request
 * @param {string} url the url where you want to fetch from
 * @returns
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function getcii(url: string, options?: GetOptions) {
    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
        } else {
            // -> is unknown
            console.error(err)
        }
    }
}

/**
 * @method creates an entry by using the ```POST``` request
 * @param {string} url the url where you want to fetch from
 * @returns
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function createcii(url: string) {
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
        } else {
            // -> is unknown
            console.error(err)
        }
    }
}

/**
 * @method updates an entry by using the ```PUT``` request
 * @param {string} url the url where you want to fetch from
 * @returns
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function updatecii(url: string) {
    try {

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
        } else {
            // -> is unknown
            console.error(err)
        }
    }
}

/**
 * @method removes an entry by using the ```DELETE``` request
 * @param {string} url the url where you want to fetch from
 * @returns
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function removecii(url: string) {
    try {

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
        } else {
            // -> is unknown
            console.error(err)
        }
    }
}