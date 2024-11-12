import { Test, TestingModule } from '@nestjs/testing';
import { AudienciaService } from './audiencia.service';

describe('AudienciaService', () => {
  let service: AudienciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudienciaService],
    }).compile();

    service = module.get<AudienciaService>(AudienciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
