import {
  type DataSource,
  type EntityTarget,
  type ObjectLiteral,
  Repository,
} from 'typeorm';

/**
 * @public
 * @class
 * base class for creating persistence entity repository.
 *
 * takes a generic parameter which is just an object literal or struct type for
 * the shape of the persistence entity. Which can also be used as a generic
 * parameter when constructing `EntitySchema<Entity>` for the entity definition
 * or schema ({@link https://typeorm.io/separating-entity-definition}).
 *
 * just keep in mind to use the `@Injectable` decorator from `@nestjs/common`
 * for the subclass that extends from this abstract class. I don't know why it
 * won't work with extending `Repository<T>` and use `@InjectRepository`, but
 * this is a workaround which _(hopefully)_ should be fine.
 */
export abstract class IRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  public constructor(target: EntityTarget<Entity>, data_source: DataSource) {
    super(
      target,
      data_source.createEntityManager(),
      data_source.createQueryRunner(),
    );
  }
}
