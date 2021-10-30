import { Test, TestingModule } from '@nestjs/testing';
import { ClimsResolver } from './clims.resolver';

describe('ClimsResolver', () => {
  let resolver: ClimsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimsResolver],
    }).compile();

    resolver = module.get<ClimsResolver>(ClimsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
