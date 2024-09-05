export enum CompareOperator {
    Equal = "eq",
    NotEqual = "neq",
    GreaterThan = "gt",
    GreaterEqual = "ge",
    LessThan = "lt",
    LessEqual = "le",
}

interface Filter {
    property: string;
    operator: CompareOperator;
    value: any;
}
interface Filters {
    filters: Filter[];
    and?: boolean;
}
export type FilterType = Filter | Filters;

interface OrderBy {
    property: string;
    ascending: boolean;
}
export type OrderByType = OrderBy | OrderBy[];

export interface GetOptions {
    filters?: FilterType;
    select?: string[];
    orderBy?: OrderByType;
    top?: number;
    skip?: number;
}

interface Result {
    response?: Response;
    data?: any;
    err?: Error;
}

export interface UserData {
    [key: string]: any;
}

export interface SaveData {
    accessToken: string;
    userData: UserData;
    tokenExp: Date;
}

/**
 * @method gets the data by using the ```GET``` request
 * @param {string} url the url where you want to fetch from
 * @param {GetOptions?} options optional filter, sorting, skip and top
 * @param {string?} token optional the auth token
 * @returns {Promise<Result>} ```err``` is undefined if the function **OR** request failed; ```response.ok``` and ```response.status``` shows if the request succeeded
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function getcii(
    url: string,
    options?: GetOptions,
    token?: string
): Promise<Result> {
    try {
        const queryParams = new URLSearchParams();

        // Manage Options
        if (options) {
            // -> options defined
            if (options.filters) {
                // -> filters exists
                queryParams.append("$filters", JSON.stringify(options.filters));
            }

            if (options.top) {
                // -> top exists
                queryParams.append("$top", String(options.top));
            }

            if (options.skip) {
                // -> skip exists
                queryParams.append("$skip", String(options.skip));
            }

            if (options.orderBy) {
                // -> orderBy exists
                queryParams.append("$orderBy", JSON.stringify(options.orderBy));
            }

            if (options.select) {
                // -> select exists
                queryParams.append("$select", JSON.stringify(options.select));
            }

            if (queryParams.size > 0) {
                // -> queryParams exists -> add params to url
                url = `${url}/?${String(queryParams)}`;
            }
        }

        // set header
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (token && !checkTokenExpired()) {
            // -> token is set
            headers["authorization"] = token;
        }

        // fire Request
        const response = await fetch(url, {
                method: "GET",
                headers: headers,
            }),
            json = await response.json();

        if (!response.ok) {
            // -> Response not okay -> fill err field
            let errMsg = response.statusText;

            if (json.data?.message) {
                // -> message is in data
                errMsg = json.data.message;
            }
            return {
                response: response,
                data: json,
                err: new Error(errMsg),
            };
        }

        return {
            response: response,
            data: json,
        };
    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
            return {
                err: err,
            };
        } else {
            // -> is unknown
            console.error(err);
            return {
                err: new Error(`Unknown Error while fetching: ${err}`),
            };
        }
    }
}

/**
 * @method creates an entry by using the ```POST``` request
 * @param {string} url the url where you want to fetch from
 * @param {Record<string, any>} data you want to create
 * @param {string?} token optional the auth token
 * @returns {Promise<Result>} ```err``` is undefined if the function **OR** request failed; ```response.ok``` and ```response.status``` shows if the request succeeded
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function createcii(
    url: string,
    data: Record<string, any>,
    token?: string
): Promise<Result> {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (token && !checkTokenExpired()) {
            // -> token is set
            headers["authorization"] = token;
        }

        const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            }),
            json = await response.json();

        if (!response.ok) {
            // -> Response not okay -> fill err field
            let errMsg = response.statusText;

            if (json.data?.message) {
                // -> message is in data
                errMsg = json.data.message;
            }
            return {
                response: response,
                data: json,
                err: new Error(errMsg),
            };
        }

        return {
            response: response,
            data: json,
        };
    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
            return {
                err: err,
            };
        } else {
            // -> is unknown
            console.error(err);
            return {
                err: new Error(`Unknown Error while fetching: ${err}`),
            };
        }
    }
}

/**
 * @method updates an entry by using the ```PUT``` request
 * @param {string} url the url where you want to fetch from
 * @param {Record<string, any>} data you want to update
 * @param {string?} token optional the auth token
 * @returns {Promise<Result>} ```err``` is undefined if the function **OR** request failed; ```response.ok``` and ```response.status``` shows if the request succeeded
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function updatecii(
    url: string,
    data: Record<string, any>,
    token?: string
): Promise<Result> {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (token && !checkTokenExpired()) {
            // -> token is set
            headers["authorization"] = token;
        }

        const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data),
            }),
            json = await response.json();

        if (!response.ok) {
            // -> Response not okay -> fill err field
            let errMsg = response.statusText;

            if (json.data?.message) {
                // -> message is in data
                errMsg = json.data.message;
            }
            return {
                response: response,
                data: json,
                err: new Error(errMsg),
            };
        }

        return {
            response: response,
            data: json,
        };
    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
            return {
                err: err,
            };
        } else {
            // -> is unknown
            console.error(err);
            return {
                err: new Error(`Unknown Error while fetching: ${err}`),
            };
        }
    }
}

/**
 * @method removes an entry by using the ```DELETE``` request
 * @param {string} url the url where you want to fetch from
 * @param {string?} token optional the auth token
 * @returns {Promise<Result>} ```err``` is undefined if the function **OR** request failed; ```response.ok``` and ```response.status``` shows if the request succeeded
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
export async function removecii(url: string, token?: string): Promise<Result> {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (token && !checkTokenExpired()) {
            // -> token is set
            headers["authorization"] = token;
        }

        const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
            }),
            json = await response.json();

        if (!response.ok) {
            // -> Response not okay -> fill err field
            let errMsg = response.statusText;

            if (json.data?.message) {
                // -> message is in data
                errMsg = json.data.message;
            }
            return {
                response: response,
                data: json,
                err: new Error(errMsg),
            };
        }

        return {
            response: response,
            data: json,
        };
    } catch (err) {
        if (err instanceof Error) {
            // -> is error
            console.error(err.message);
            return {
                err: err,
            };
        } else {
            // -> is unknown
            console.error(err);
            return {
                err: new Error(`Unknown Error while fetching: ${err}`),
            };
        }
    }
}

/**
 * @method saves the login data and the token in the local storage
 * @param {SaveData} data includes `accessToken`: auth token; `userData`; `token_expire`: date when the token expires
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 31.08.24
 */
export function saveData(data: SaveData) {
    if (typeof window === "undefined") return;

    window.localStorage.setItem("access_token", data.accessToken);
    window.localStorage.setItem("userData", JSON.stringify(data.userData));
    window.localStorage.setItem("token_expire", data.tokenExp.toISOString());
}

/**
 * @method gets the user data
 * @returns {users.UserData | undefined} the userdata object
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 31.08.24
 */
export function getData(): UserData | undefined {
    if (typeof window === "undefined") return;

    const userData = window.localStorage.getItem("userData");
    if (!userData) return undefined;

    return JSON.parse(userData);
}

/**
 * @method gets the auth token
 * @returns {string} auth token
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 31.08.24
 */
export function getToken(): string | undefined {
    if (typeof window === "undefined") return;

    const userData = window.localStorage.getItem("access_token");
    if (!userData) return undefined;

    return userData;
}

/**
 * @method logouts the user
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 31.08.24
 */
export function deleteData() {
    if (typeof window === "undefined") return;
    const localStorage = window.localStorage;

    localStorage.removeItem("access_token");
    localStorage.removeItem("userData");
    localStorage.removeItem("token_expire");
}

/**
 * @method check if the token is valid -> standard: logout if token is expired
 * @param [deleteDataIfUnvalid=true] optional param: if `not set`: `true`
 * @returns {boolean} `true`: token expired & `false`: token valid
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 31.08.24
 */
export function checkTokenExpired(deleteDataIfUnvalid = true): boolean {
    if (typeof window === "undefined") return true;

    const localStorage = window.localStorage,
        localTokenExp = localStorage.getItem("token_expire");

    if (!localTokenExp) return true;

    const tokenExp = new Date(localTokenExp),
        today = new Date();

    if (tokenExp > today) return false; // -> token valid

    if (deleteDataIfUnvalid) {
        deleteData();
    }
    return true;
}
