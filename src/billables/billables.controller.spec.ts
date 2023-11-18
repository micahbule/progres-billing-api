import { Test, TestingModule } from '@nestjs/testing';
import { BillablesController } from './billables.controller';
import { BillablesService } from './billables.service';

describe('BillablesController', () => {
  let controller: BillablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillablesController],
      providers: [BillablesService],
    }).compile();

    controller = module.get<BillablesController>(BillablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
