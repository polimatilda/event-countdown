import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EventItem } from '../models/event-item.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private readonly http: HttpClient) { }

  getAllEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>("http://localhost:3000/events").pipe(map(data => {
      console.log(data)
      return data.map((item) => ({
        title: item.title,
        date: new Date(item.date)
      }))
    }))
  }
}
