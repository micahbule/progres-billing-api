import { Test, TestingModule } from '@nestjs/testing';
import { BillablesService } from './billables.service';

describe('BillablesService', () => {
  let service: BillablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillablesService],
    }).compile();

    service = module.get<BillablesService>(BillablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
