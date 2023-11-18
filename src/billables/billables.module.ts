import { Module } from '@nestjs/common';
import { BillablesService } from './billables.service';
import { BillablesController } from './billables.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Billable } from '@/billables/entities/billable.entity';
import { Category } from '@/category/entities/category.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Billable, Category])],
  controllers: [BillablesController],
  providers: [BillablesService],
})
export class BillablesModule {}
