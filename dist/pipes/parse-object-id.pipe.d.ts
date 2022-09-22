import { PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';
export default class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
    transform(value: string): ObjectId;
}
