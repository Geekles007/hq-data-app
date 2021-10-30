import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorsResolver } from './generators.resolver';

describe('GeneratorsResolver', () => {
  let resolver: GeneratorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratorsResolver],
    }).compile();

    resolver = module.get<GeneratorsResolver>(GeneratorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
