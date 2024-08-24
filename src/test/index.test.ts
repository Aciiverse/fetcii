import assert = require("node:assert");
import { describe, it } from "node:test";
import { getcii } from "..";

interface BasicResponse {
    message: string,
    data?: any
}

const baseUrl = 'http://localhost:3000/api';

describe('getcii dummy api started', () => {
    it('have valid data', async () => {
        const result = await getcii(baseUrl);

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        
        const data: BasicResponse = result.data;
        assert(typeof data.message, 'response ');
        assert(typeof data.message, 'result is valid');
    });
});