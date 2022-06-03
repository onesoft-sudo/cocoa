import { Client, Message } from "discord.js";

/**
 * The command class.
 * 
 * @abstract
 */
export default abstract class Command {
    constructor(public name: string, public category: string | null = null, public aliases: string[] = []) {

    }

    public abstract run(client: Client, message: Message, args?: string[]): Promise <void>;
}