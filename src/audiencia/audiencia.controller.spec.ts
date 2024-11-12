import { Test, TestingModule } from '@nestjs/testing';
import { AudienciaController } from './audiencia.controller';
import { AudienciaService } from './audiencia.service';

describe('AudienciaController', () => {
  let controller: AudienciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudienciaController],
      providers: [AudienciaService],
    }).compile();

    controller = module.get<AudienciaController>(AudienciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
