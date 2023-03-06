import { model, Schema } from "mongoose";
import { IStreetDocument } from "./streets.interface";
const streetsSchema = new Schema({
    region_code: { type: Number },
    region_name: { type: String },
    city_code: { type: Number },
    city_name: { type: String },
    street_code: { type: Number },
    street_name: { type: String },
    street_name_status: { type: String },
    official_code: { type: Number },
    streetId: { type: Number }
});

streetsSchema.index({
    city_code:1,
    street_code: 1
}, {
    unique: true
})

export default model<IStreetDocument>('streets', streetsSchema);