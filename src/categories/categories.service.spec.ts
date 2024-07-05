import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  //* creo el categories services, xq? porque lo voy  a necesistar dentro del it
  let service: CategoriesService;

  beforeEach(async () => {
    //* por ahora no me interesa que es lo que hace este mock-
    const mockCategoriesService: Partial<CategoriesService> = {
      addCategories: () => Promise.resolve(undefined)
    };
    //*La copia del modulo- 
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: CategoriesService, useValue: mockCategoriesService },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
});
