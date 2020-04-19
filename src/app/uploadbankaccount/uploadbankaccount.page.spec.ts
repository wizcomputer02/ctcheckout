import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadbankaccountPage } from './uploadbankaccount.page';

describe('UploadbankaccountPage', () => {
  let component: UploadbankaccountPage;
  let fixture: ComponentFixture<UploadbankaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadbankaccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadbankaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
