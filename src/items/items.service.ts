import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemsDocument } from './entities/item.entity';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemsModule: Model<ItemsDocument>,
  ) {}

  // createItemDto trae la data del body
  async create(createItemDto: CreateItemDto) {
    const itemCreated = await this.itemsModule.create(createItemDto);
    return itemCreated;
  }

  async findAll() {
    return await this.itemsModule.find({});
  }

  async findOne(id: number) {
    return await this.itemsModule.findById(id);
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const itemUpdated = await this.itemsModule.findByIdAndUpdate(
      id,
      updateItemDto,
      { new: true },
    );

    if (!itemUpdated)
      throw new HttpException('ITEM_NOT_FOUND', HttpStatus.NOT_FOUND);

    return itemUpdated;
  }

  async remove(id: number) {
    return await this.itemsModule.findByIdAndDelete(id);
  }
}
