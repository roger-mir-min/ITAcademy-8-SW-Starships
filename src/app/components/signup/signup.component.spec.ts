import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { LoginService } from 'src/app/services/login.service';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LoginService', ['getLocal', 'register']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: LoginService, useValue: spy }]
    })
      .compileComponents();

    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('signup component should be created', () => {
    expect(component).toBeTruthy();
  });
    
  it('email input should be created', () => {
        const emailInput = fixture.debugElement.query(By.css('[data-testid="inputEmail"]'));
        expect(emailInput).toBeTruthy();
  });
    
    it('key input should be created', () => {
        const inputKey = fixture.debugElement.query(By.css('[data-testid="inputKey"]'));
        expect(inputKey).toBeTruthy();
    });

  it("if introduced data is correct, the service is called", () => {
    const submitButton = fixture.debugElement.query(By.css('[data-testid="submitButton"]')).nativeElement;
    const inputEmail = fixture.debugElement.query(By.css('[data-testid="inputEmail"]')).nativeElement;
    const inputKey = fixture.debugElement.query(By.css('[data-testid="inputKey"]')).nativeElement;
    const inputRepKey = fixture.debugElement.query(By.css('[data-testid="inputRepKey"]')).nativeElement;

    
    inputEmail.value = 'test@test.com';
    inputEmail.dispatchEvent(new Event('input'));
    inputKey.value = '1234aaaa';
    inputKey.dispatchEvent(new Event('input'));
    inputRepKey.value = '1234aaaa';
    inputRepKey.dispatchEvent(new Event('input'));
    
    expect(component.signupForm.valid).toBeTruthy();
    
    fixture.detectChanges();

    submitButton.click();
    
    expect(loginServiceSpy.register).toHaveBeenCalledWith({ email: 'test@test.com', key: '1234aaaa' });
  });

    it("if keys don't match, service isn't called", () => {
    spyOn(console, 'log');
    const submitButton = fixture.debugElement.query(By.css('[data-testid="submitButton"]')).nativeElement;
    const inputEmail = fixture.debugElement.query(By.css('[data-testid="inputEmail"]')).nativeElement;
    const inputKey = fixture.debugElement.query(By.css('[data-testid="inputKey"]')).nativeElement;
    const inputRepKey = fixture.debugElement.query(By.css('[data-testid="inputRepKey"]')).nativeElement;

    inputEmail.value = 'test@test.com';
    inputEmail.dispatchEvent(new Event('input'));
    inputKey.value = '1234aaaa';
    inputKey.dispatchEvent(new Event('input'));
    inputRepKey.value = '1234aaab';
    inputRepKey.dispatchEvent(new Event('input'));

    submitButton.click();

    expect(loginServiceSpy.register).not.toHaveBeenCalled();
  });
    
    
    
});