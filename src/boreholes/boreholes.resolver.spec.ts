import { Test, TestingModule } from '@nestjs/testing';
import { BoreholesResolver } from './boreholes.resolver';

describe('BoreholesResolver', () => {
  let resolver: BoreholesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoreholesResolver],
    }).compile();

    resolver = module.get<BoreholesResolver>(BoreholesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
