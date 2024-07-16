import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetcardComponent } from './assetcard.component';

describe('AssetcardComponent', () => {
  let component: AssetcardComponent;
  let fixture: ComponentFixture<AssetcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
