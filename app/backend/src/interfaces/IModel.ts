import { Model, CreateOptions } from 'sequelize';

interface IModel<T extends Model> {
  create(creationAttr: CreateOptions<T>): Promise<T>,
  findOne(creationAttr: CreateOptions<T>): Promise<T>,
}

export default IModel;
