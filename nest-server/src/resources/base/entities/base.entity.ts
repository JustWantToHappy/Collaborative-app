import { BaseEntity } from 'typeorm';

export class Base {
  id: number;
  createAt: Date;
  updateAt: Date;

  constructor(partial: Partial<BaseEntity>) {
    Object.assign(this, partial);
  }

  async findOne(id: number) {
    throw new Error('Method not implemented');
  }

  async findAll(): Promise<BaseEntity[]> {
    throw new Error('Method not implemented');
  }

  async create(data: any): Promise<BaseEntity> {
    throw new Error('Method not implemented');
  }

  async update(id: number, data: any): Promise<BaseEntity> {
    throw new Error('Method not implemented');
  }

  async remove(id: number): Promise<BaseEntity> {
    throw new Error('Method not implemented');
  }
}
