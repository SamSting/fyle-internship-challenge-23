import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`https://api.github.com/users/${username}`);
  }

  getRepositories(username: string): Observable<any[]> {
    return this.http.get<any[]>(`https://api.github.com/users/${username}/repos`).pipe(
      map(repos => repos.map(repo => ({
        ...repo,
        language: repo.language || 'Not specified'
      })))
    );
  }
}
