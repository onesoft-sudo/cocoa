import { Client as DiscordClient, ClientOptions, Collection } from "discord.js";
import Command from "../command/Command";
import Loader from "./Loader";

export default class CocoaClient extends DiscordClient {
    protected __commands: Collection <string, Command> = new Collection();
    protected __events: Collection <string, any> = new Collection();
    
    protected services: {
        [key: string]: any;
    } = {};

    public loader: Loader;

    constructor(public rootdir: string, options: ClientOptions) {
        super(options);

        this.loader = new Loader(this);
    }

    get commands() {
        return this.__commands;
    }

    get events() {
        return this.__events;
    }

    getService(key: string) {
        return this.services[key];
    }

    setService(key: string, service: any) {
        this.services[key] = service;
    }
}