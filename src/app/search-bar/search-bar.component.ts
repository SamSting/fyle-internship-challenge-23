import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  username: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  search(): void {
    if (this.username.trim() !== '') {
      this.searchEvent.emit(this.username.trim());
    }
  }
}
