import { Test, TestingModule } from '@nestjs/testing';
import { ClimsService } from './clims.service';

describe('ClimsService', () => {
  let service: ClimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimsService],
    }).compile();

    service = module.get<ClimsService>(ClimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
