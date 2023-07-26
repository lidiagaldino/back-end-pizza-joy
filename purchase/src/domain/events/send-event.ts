export interface SendEvents {
    execute(topic: string, object: any): Promise<void>
}