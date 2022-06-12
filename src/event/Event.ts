import CocoaClient from "../core/CocoaClient";

export default abstract class Event {
    constructor(public client: CocoaClient, protected name: string) {

    }

    getName() {
        return this.name;
    }

    public abstract run(...args: any[]): Promise <void>;
}