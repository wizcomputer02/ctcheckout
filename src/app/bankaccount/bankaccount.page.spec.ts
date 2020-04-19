import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BankaccountPage } from './bankaccount.page';

describe('BankaccountPage', () => {
  let component: BankaccountPage;
  let fixture: ComponentFixture<BankaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankaccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
