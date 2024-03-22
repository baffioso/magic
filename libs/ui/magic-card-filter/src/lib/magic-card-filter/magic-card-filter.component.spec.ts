import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagicCardFilterComponent } from './magic-card-filter.component';

describe('MagicCardFilterComponent', () => {
  let component: MagicCardFilterComponent;
  let fixture: ComponentFixture<MagicCardFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicCardFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MagicCardFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
