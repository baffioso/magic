import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagicCardListComponent } from './magic-card-list.component';

describe('MagicCardListComponent', () => {
  let component: MagicCardListComponent;
  let fixture: ComponentFixture<MagicCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicCardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MagicCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
