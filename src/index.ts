import { users as usersModule } from "./users";

export enum CompareOperator {
    Equal = "eq",
    NotEqual = "neq",
    GreaterThan = "gt",
    GreaterEqual = "ge",
    LessThan = "lt",
    LessEqual = "le",
    Inside = "in",
    NotInside = "ni",
}

// export fetcii's users module
export const users = usersModule;

export namespace fetcii {
    // export fetcii's users module
    export const users = usersModule;

    interface Filter {
        operator: CompareOperator;
        value: any;
    }

    interface FiltersType {
        [key: string]: FilterContent;
    }

    interface FilterContent {
        filters: Filter[];
        and: boolean;
    }

    interface OrderBy {
        property: string;
        ascending: boolean;
    }
    export type OrderByType = OrderBy | OrderBy[];

    export interface GetOptions {
        filters?: FiltersType;
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

    export class FilterCollection {
        constructor() {}

        protected filters: FiltersType = {};

        /**
         * @method gets all filters
         * @author Flowtastisch
         * @memberof Aciiverse
         * @date 20.11.2024
         */
        public getAllFilters() {
            return this.filters;
        }

        /**
         * @method gets a filter by property
         * @param {string} property key
         * @author Flowtastisch
         * @memberof Aciiverse
         * @date 20.11.2024
         */
        public getFilter(property: string) {
            return this.filters[property];
        }

        /**
         * @method adds a filter to the filter (NO filters replace -> only the and property will be replaced)
         * @param {string} property to filter
         * @param {Filter[]} filters array
         * @param {boolean} and? optional -> standard is `true`
         * @author Flowtastisch
         * @memberof Aciiverse
         * @date 20.11.2024
         */
        public add(property: string, filters: Filter[], and: boolean = true) {
            const content = this.filters[property];

            if (!content) {
                // -> filter NOT existing
                this.replace(property, filters, and);
                return;
            }
            const existFilters = content.filters;
            content.filters = existFilters.concat(filters);
            content.and = and;
        }

        /**
         * @method replaces a filter to the filter | old filter will be **DELETED**
         * @param {string} property to filter
         * @param {Filter[]} filters array
         * @param {boolean} and? optional -> standard is `true`
         * @author Flowtastisch
         * @memberof Aciiverse
         * @date 21.11.2024
         */
        public replace(
            property: string,
            filters: Filter[],
            and: boolean = true
        ) {
            this.filters[property] = {
                filters: filters,
                and: and,
            };
        }

        /**
         * @method removes a filter by property
         * @param {string} property key
         * @author Flowtastisch
         * @memberof Aciiverse
         * @date 20.11.2024
         */
        public remove(property: string) {
            if (!this.filters[property]) {
                // -> property doesn't exist
                return;
            }

            delete this.filters[property];
        }
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
                    queryParams.append(
                        "$filters",
                        JSON.stringify(options.filters)
                    );
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
                    queryParams.append(
                        "$orderBy",
                        JSON.stringify(options.orderBy)
                    );
                }

                if (options.select) {
                    // -> select exists
                    queryParams.append(
                        "$select",
                        JSON.stringify(options.select)
                    );
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
            if (token && !users.checkTokenExpired()) {
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

                if (json.message) {
                    // -> message is in data
                    errMsg = json.message;
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
            if (token && !users.checkTokenExpired()) {
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

                if (json.message) {
                    // -> message is in data
                    errMsg = json.message;
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
            if (token && !users.checkTokenExpired()) {
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

                if (json.message) {
                    // -> message is in data
                    errMsg = json.message;
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
    export async function removecii(
        url: string,
        token?: string
    ): Promise<Result> {
        try {
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };
            if (token && !users.checkTokenExpired()) {
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

                if (json.message) {
                    // -> message is in data
                    errMsg = json.message;
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
}

// export FilterCollection
export const FilterCollection = fetcii.FilterCollection;
