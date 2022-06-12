import Command from "../../src/command/Command";
import CocoaClient from "../../src/core/CocoaClient";

describe("Command objects", () => {
    it('can be instanciated', () => {
        new class extends Command {
            constructor(client: CocoaClient) {
                super(client, 'test');
            }

            async run() {
                return 'Hello world';
            }
        } (new CocoaClient('.', { intents: [] }));
    });

    test('if the run() method works', async () => {
        const command = new class extends Command {
            constructor(client: CocoaClient) {
                super(client, 'test');
            }

            async run() {
                return 'Hello world';
            }
        } (new CocoaClient('.', { intents: [] }));

        const output = await command.run();

        expect(output).toBe('Hello world');
    });
});