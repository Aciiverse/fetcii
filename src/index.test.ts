import assert = require("node:assert");
import { describe, it } from "node:test";
import { getcii } from ".";

interface Config {
    url: string
}

describe('json is valid', () => {
    const config = getConfig();

    it('has url', () => {
        assert(config?.url !== undefined
            && config.url   !== '', 'URL is defined');
    })
});

describe('get data from api', () => {
    const config = getConfig();

    it('should be 3', async () => {
        const result = await getcii(config?.url!);
        assert(typeof result.message === 'string', 'result is valid')
    });
});

/**
 * @method gets the config file
 * @returns {Config | undefined} the config file
 * @author Flowtastisch
 * @memberof Aciiverse
 */
function getConfig(): Config | undefined {
    try {
        const config: Config = require('../config.json');
        return config
    } catch (err) {
        console.error(err)
    }
}