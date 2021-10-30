import { Test, TestingModule } from '@nestjs/testing';
import { AteliersResolver } from './ateliers.resolver';

describe('AteliersResolver', () => {
  let resolver: AteliersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AteliersResolver],
    }).compile();

    resolver = module.get<AteliersResolver>(AteliersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
