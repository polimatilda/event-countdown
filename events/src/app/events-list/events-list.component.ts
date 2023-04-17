import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { EventItem } from '../models/event-item.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {
  eventsList: EventItem[] = []
  subscription: Subscription = new Subscription()

  constructor(private readonly eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.getAllEvents().subscribe((value) => this.eventsList = value)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
