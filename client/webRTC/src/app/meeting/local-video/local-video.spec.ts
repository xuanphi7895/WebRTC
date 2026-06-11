import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalVideo } from './local-video';

describe('LocalVideo', () => {
  let component: LocalVideo;
  let fixture: ComponentFixture<LocalVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
