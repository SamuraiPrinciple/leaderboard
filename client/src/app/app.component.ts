import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <h1>Welcome!</h1>
    <h2>
      Your outbound IP address (just to make sure everything is wired correctly)
    </h2>
    {{ ip$ | async }}
    <h2>Leaderboard</h2>
    TODO - Your stuff should go in here...`,
})
export class AppComponent {
  ip$ = this.http.get('/ipify', { responseType: 'text' });

  constructor(private http: HttpClient) {}
}
