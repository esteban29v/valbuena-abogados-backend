import { Test, TestingModule } from '@nestjs/testing';
import { ProcesosController } from './procesos.controller';
import { ProcesosService } from './procesos.service';

describe('ProcesosController', () => {
  let controller: ProcesosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcesosController],
      providers: [ProcesosService],
    }).compile();

    controller = module.get<ProcesosController>(ProcesosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
