import { Client, Message } from "discord.js";
import CocoaClient from "../core/CocoaClient";

/**
 * The command class.
 * 
 * @abstract
 */
export default abstract class Command {
    constructor(public client: CocoaClient, public name: string, public category: string | null = null, public aliases: string[] = []) {

    }

    getName() {
        return this.name;
    }

    abstract run(message: Message, args?: string[]): Promise <any>;
}