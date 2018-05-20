import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    // console.log('VALUE> ',value)
    console.log('METATYPE> ', metatype)
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    // console.log('OBJECT> ', object)
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed')
    }
    return value
  }

  private toValidate(metatype): boolean {
    // console.log('METATYPE> ', metatype)

    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}
