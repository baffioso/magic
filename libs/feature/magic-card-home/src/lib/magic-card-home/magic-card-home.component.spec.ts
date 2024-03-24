import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagicCardHomeComponent } from './magic-card-home.component';

describe('MagicCardHomeComponent', () => {
  let component: MagicCardHomeComponent;
  let fixture: ComponentFixture<MagicCardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicCardHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MagicCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
