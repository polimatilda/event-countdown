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

  constructor(private readonly eventsService: EventsService) { }

  ngOnInit(): void {
    this.subscription.add(this.eventsService.getAllEvents().subscribe((value) => {
      this.eventsList = value

      this.eventsList.forEach((event) => {
        event.countdown = this.getEventCountdown(event)
      })

      this.eventsList = this.eventsList.filter((event) => {
        return event.countdown !== "0 days 0 hours 0 minutes"
      })
    }))

    this.subscription.add(
      this.eventsService.getNewEventSubject().subscribe((event) => {
        this.eventsList.push({
          title: event.title,
          date: new Date(event.date),
          countdown: this.getEventCountdown(event)
        })
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private getEventCountdown(event: EventItem): string {
    const now = new Date()
    const eventDate = new Date(event.date)
    const diff = Math.max(eventDate.getTime() - now.getTime(), 0)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${days} days ${hours} hours ${minutes} minutes`
  }
}
