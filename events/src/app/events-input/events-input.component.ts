import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events-list/events.service';
import { EventItem } from '../models/event-item.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-events-input',
  templateUrl: './events-input.component.html',
  styleUrls: ['./events-input.component.scss']
})
export class EventsInputComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({})

  title: string = ""
  date: Date = new Date

  constructor(
    private readonly eventsService: EventsService,
    private readonly formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
      this.eventForm = this.formBuilder.group({
        title: ['', Validators.required],
        date: ['', Validators.required]
      })
    }

  onCreateEvent(): void {

    const newEvent: EventItem = {
      title: this.eventForm.value.title,
      date: new Date(this.eventForm.value.date)
    }

    this.eventsService.addNewEvent(newEvent).subscribe((event) => {
      console.log("event added", event)
      this.eventForm.reset()
    })
  }
}
