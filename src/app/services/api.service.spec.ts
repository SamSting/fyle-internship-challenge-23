import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get with correct URL for getUser method', () => {
    const username = 'test';
    service.getUser(username).subscribe();
    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('should call http.get with correct URL for getRepositories method', () => {
    const username = 'test';
    service.getRepositories(username).subscribe();
    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}/repos`);
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  });

  // Add more test cases as needed
});
