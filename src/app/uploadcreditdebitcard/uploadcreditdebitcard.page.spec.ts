import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadcreditdebitcardPage } from './uploadcreditdebitcard.page';

describe('UploadcreditdebitcardPage', () => {
  let component: UploadcreditdebitcardPage;
  let fixture: ComponentFixture<UploadcreditdebitcardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadcreditdebitcardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadcreditdebitcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
