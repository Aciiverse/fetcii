import assert = require("node:assert");
import { describe, it } from "node:test";
import { getcii } from "..";

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

describe('getcii data from api', () => {
    const config = getConfig();

    it('have valid data', async () => {
        const result = await getcii(config?.url!);

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');

        const data: { message: string } = result.data;
        assert(typeof data.message, 'response ');
        assert(typeof data.message, 'result is valid');
    });
});

/**
 * @method gets the config file
 * @returns {Config | undefined} the config file
 * @author Flowtastisch
 * @memberof Aciiverse
 * @date 24.08.24
 */
function getConfig(): Config | undefined {
    try {
        const config: Config = require('../../config.json');
        return config
    } catch (err) {
        console.error(err)
    }
}