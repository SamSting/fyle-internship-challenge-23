import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username = '';
  userBio = '';
  profileUrl = '';
  githubUrl = '';
  error: string | null = null;
  repositories: any[] = [];
  currentPage = 1;
  reposPerPage = 4;
  paginatedRepositories: any[] = [];
  pages: number[] = [];
  loading = false;

  constructor(private apiService: ApiService) {}

  search(username: string) {
    this.loading = true;
    console.log('Searching for:', username);
    this.apiService.getUser(username).subscribe(
      (user: User) => {
        this.username = user.name || user.login;
        this.userBio = user.bio || '';
        this.profileUrl = user.avatar_url;
        this.githubUrl = user.html_url;
        this.error = null;
        this.loadRepositories(this.githubUrl);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
        this.clearUserData();
        this.error = 'User not found';
        this.loading = false;
      }
    );
  }

  loadRepositories(githubUrl: string) {
    const username = this.extractUsernameFromUrl(githubUrl);
    if (!username) {
      console.error('Error: Unable to extract username from GitHub profile URL');
      return;
    }

    this.apiService.getRepositories(username).subscribe(
      (repositories: any[]) => {
        this.repositories = repositories;
        this.paginateRepositories();
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching repositories:', error);
        this.loading = false;
      }
    );
  }

  extractUsernameFromUrl(url: string): string | null {
    const parts = url.split('/');
    const usernameIndex = parts.indexOf('github.com') + 1;
    return (usernameIndex !== 0 && usernameIndex < parts.length) ? parts[usernameIndex] : null;
  }

  paginateRepositories() {
    const startIndex = (this.currentPage - 1) * this.reposPerPage;
    const endIndex = this.currentPage * this.reposPerPage;
    this.paginatedRepositories = this.repositories.slice(startIndex, endIndex);
    this.calculatePages();
  }

  calculatePages() {
    const pageCount = Math.ceil(this.repositories.length / this.reposPerPage);
    this.pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.paginateRepositories();
  }

  clearUserData() {
    this.username = '';
    this.userBio = '';
    this.profileUrl = '';
    this.githubUrl = '';
    this.repositories = [];
  }
}
