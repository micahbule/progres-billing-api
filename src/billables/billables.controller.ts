import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { BillablesService } from '@/billables/billables.service';
import { CreateBillableDto } from '@/billables/dto/create-billable.dto';
import { UpdateBillableDto } from '@/billables/dto/update-billable.dto';
import { EntityTransformerInterceptor } from '@/entity-transformer/entity-transformer.interceptor';

@Controller('billables')
export class BillablesController {
  constructor(private readonly billablesService: BillablesService) {}

  @Post()
  @UseInterceptors(EntityTransformerInterceptor)
  create(@Body() createBillableDto: CreateBillableDto) {
    return this.billablesService.create(createBillableDto);
  }

  @Get()
  @UseInterceptors(EntityTransformerInterceptor)
  findAll() {
    return this.billablesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(EntityTransformerInterceptor)
  findOne(@Param('id') id: string) {
    return this.billablesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(EntityTransformerInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateBillableDto: UpdateBillableDto,
  ) {
    return this.billablesService.update(id, updateBillableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billablesService.remove(id);
  }
}
