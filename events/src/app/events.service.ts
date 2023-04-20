import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Subject, tap } from 'rxjs';
import { EventItem } from './models/event-item.interface';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = environment.backendUrl;
  private newEventSubject = new Subject<EventItem>();

  getAllEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.url}/events`).pipe(
      map((data) => {
        console.log(data);
        return data.map((item) => ({
          title: item.title,
          date: new Date(item.date),
        }));
      })
    );
  }

  addNewEvent(event: EventItem): Observable<EventItem> {
    return this.http.post<EventItem>(`${this.url}/events`, event).pipe(
      tap((event) => {
        console.log('Event added: ', event);
        this.newEventSubject.next(event);
      })
    );
  }

  getNewEventSubject(): Subject<EventItem> {
    return this.newEventSubject;
  }
}
