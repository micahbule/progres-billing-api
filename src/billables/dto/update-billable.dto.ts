import { PartialType } from '@nestjs/mapped-types';
import { CreateBillableDto } from './create-billable.dto';

export class UpdateBillableDto extends PartialType(CreateBillableDto) {}
