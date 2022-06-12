import CocoaClient from "./CocoaClient";
import { join } from 'path';
import fsPromises from 'fs/promises';
import { statSync } from 'fs';
import Event from "../event/Event";
import Command from "../command/Command";

export default class Loader {
    eventsPath: string;
    commandsPath: string;

    constructor(protected client: CocoaClient) {
        this.eventsPath = join(client.rootdir, 'events');
        this.commandsPath = join(client.rootdir, 'commands');
    }

    async loadEvents(path: string = this.eventsPath) {
        const files = await fsPromises.readdir(path);

        for await (const file of files) {
            if (file === '.' || file === '..')
                continue;
            
            if (statSync(join(path, file)).isDirectory()) {
                await this.loadEvents(join(path, file));
            }
            else {
                const { default: Event } = await import(join(path, file));
                const event = <Event> await new Event(this.client);                
                await this.client.events.set(event.getName(), event);
                await this.client.on(event.getName(), (...args) => event.run(...args));

                console.log('Registered event: ' + event.getName());                
            }
        }
    }

    async loadCommands(path: string = this.commandsPath) {
        const files = await fsPromises.readdir(path);

        for await (const file of files) {
            if (file === '.' || file === '..')
                continue;
            
            if (statSync(join(path, file)).isDirectory()) {
                await this.loadEvents(join(path, file));
            }
            else {
                const { default: Command } = await import(join(path, file));
                const command = <Command> await new Command(this.client);
                await this.client.commands.set(command.getName(), command);

                console.log('Registered command: ' + command.getName());                
            }
        }
    }
}