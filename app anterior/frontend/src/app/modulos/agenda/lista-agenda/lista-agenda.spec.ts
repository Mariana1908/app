import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgenda } from './lista-agenda';

describe('ListaAgenda', () => {
  let component: ListaAgenda;
  let fixture: ComponentFixture<ListaAgenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAgenda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAgenda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
