import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call ApiService.getUser when search method is called', () => {
    spyOn(apiService, 'getUser').and.returnValue(of({ name: 'Test User', bio: 'Test Bio', avatar_url: 'https://example.com/avatar', html_url: 'https://example.com/user' }));
    component.search('test');
    expect(apiService.getUser).toHaveBeenCalledWith('test');
    expect(component.username).toEqual('Test User');
    expect(component.userBio).toEqual('Test Bio');
    expect(component.profileUrl).toEqual('https://example.com/avatar');
    expect(component.githubUrl).toEqual('https://example.com/user');
  });

  // Add more test cases as needed
});
