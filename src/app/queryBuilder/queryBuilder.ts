import { FilterQuery, Query } from 'mongoose'

export class QueryBuilder<T> {
  public queryMethod: Query<T[], T>
  public query: Record<string, unknown>

  constructor(queryMethod: Query<T[], T>, query: Record<string, unknown>) {
    this.queryMethod = queryMethod
    this.query = query
  }

  serchQuery(serchAbleFelid: string[]) {
    const serchTerm = this?.query?.serchTerm
    if (serchTerm) {
      this.queryMethod = this.queryMethod.find({
        $or: serchAbleFelid.map(
          (fl) =>
            ({ [fl]: { $regex: serchTerm, $options: 'i' } }) as FilterQuery<T>,
        ),
      })
    }
    return this
  }

  filterQuery() {
    const queryObj = {
      ...this.query,
    }
    const excludeFields = ['serchTerm', 'sort', 'page', 'limit', 'feilds']
    excludeFields.forEach((fl) => delete queryObj[fl])
    this.queryMethod = this.queryMethod.find(queryObj as FilterQuery<T>)
    return this
  }

  sort() {
    const sort = this.query?.sort || '-createdAt'
    this.queryMethod = this.queryMethod.sort(sort as string)
    return this
  }

  paginate() {
    const page = Number(this.query?.page) || 1
    const limit = Number(this.query?.limit) || 20
    const skip = (page - 1) * limit
    this.queryMethod = this.queryMethod.skip(skip).limit(limit)
    return this
  }

  feild() {

    const feild = (this.query?.feild as string)?.split(',')?.join(' ')||'-__v'
    this.queryMethod = this.queryMethod.select(feild)
    return this
  }
}




// class QueryBuilder<T> {
//   public modelQuery: Query<T[], T>;
//   public query: Record<string, unknown>;

//   constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
//     this.modelQuery = modelQuery;
//     this.query = query;
//   }

//   search(searchableFields: string[]) {
//     const searchTerm = this?.query?.searchTerm;
//     if (searchTerm) {
//       this.modelQuery = this.modelQuery.find({
//         $or: searchableFields.map(
//           (field) =>
//             ({
//               [field]: { $regex: searchTerm, $options: 'i' },
//             }) as FilterQuery<T>,
//         ),
//       });
//     }

//     return this;
//   }

//   filter() {
//     const queryObj = { ...this.query }; // copy

//     // Filtering
//     const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

//     excludeFields.forEach((el) => delete queryObj[el]);

//     this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

//     return this;
//   }

//   sort() {
//     const sort =
//       (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
//     this.modelQuery = this.modelQuery.sort(sort as string);

//     return this;
//   }

//   paginate() {
//     const page = Number(this?.query?.page) || 1;
//     const limit = Number(this?.query?.limit) || 10;
//     const skip = (page - 1) * limit;

//     this.modelQuery = this.modelQuery.skip(skip).limit(limit);

//     return this;
//   }

//   fields() {
//     const fields =
//       (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

//     this.modelQuery = this.modelQuery.select(fields);
//     return this;
//   }
// }

// export default QueryBuilder;