export module users {
    export interface UserData {
        [key: string]: any;
    }

    export interface SaveData {
        accessToken: string;
        userData: users.UserData;
        tokenExp: Date;
    }

    /**
     * @method saves the login data and the token in the local storage
     * @param {SaveData} data includes `accessToken`: auth token; `userData`; `tokenExp`: date when the token expires
     * @author Flowtastisch
     * @memberof Aciiverse
     * @date 31.08.24
     */
    export function saveData(data: SaveData) {
        if (typeof window === "undefined") return;

        window.localStorage.setItem("access_token", JSON.stringify(data.accessToken));
        window.localStorage.setItem("userData", JSON.stringify(data.userData));
        window.localStorage.setItem("tokenExp", JSON.stringify(data.tokenExp));
    }

    /**
     * @method gets the user data
     * @returns {users.UserData | undefined} the userdata object
     * @author Flowtastisch
     * @memberof Aciiverse
     * @date 31.08.24
     */
    export function getData(): users.UserData | undefined {
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
    export function getToken(): users.UserData | undefined {
        if (typeof window === "undefined") return;

        const userData = window.localStorage.getItem("access_token");
        if (!userData) return undefined;

        return JSON.parse(userData);
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

        const tokenExp = new Date(Number(localTokenExp)),
            today = new Date();

        if (tokenExp > today) return false; // -> token valid

        if (deleteDataIfUnvalid) {
            deleteData();
        }
        return true;
    }
}
