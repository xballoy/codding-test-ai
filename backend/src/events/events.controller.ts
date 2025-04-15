import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.model';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getAllEvents(): Event[] {
    return this.eventsService.getAllEvents();
  }

  @Post()
  createEvent(@Body(ValidationPipe) createEventDto: CreateEventDto): Event {
    return this.eventsService.createEvent(createEventDto);
  }
}
