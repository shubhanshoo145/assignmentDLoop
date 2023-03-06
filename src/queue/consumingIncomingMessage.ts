import streetsModel from "../models/streets.model";
import { MongooseService } from "../mongodb/mongoose.service";

export interface IIncomingMessage {
    consumeIncomingMessage(message: any): Promise<void>
}

export class IncomingMessage implements IIncomingMessage {
    public async consumeIncomingMessage(message): Promise<void> {
        try {
            const mongooseService = new MongooseService();
            await mongooseService.openConnection();
            await streetsModel.create(message);
        } catch (err) {
            console.log(`Error while consuming queue message, error: ${err}, message: ${message}`);
            throw new Error(`Error while consuming queue message, error: ${err.message}, message: ${message}`)
        }
    }
}