import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemsDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
