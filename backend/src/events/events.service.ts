import { Injectable, BadRequestException } from '@nestjs/common';
import { Event } from './event.model';
import { CreateEventDto } from './dto/create-event.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EventsService {
  private readonly events: Event[] = [];

  getAllEvents(): Event[] {
    return this.events;
  }

  createEvent(createEventDto: CreateEventDto): Event {
    const { name, description, startDate, endDate, timezone } = createEventDto;

    // Additional validation at service level
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime())) {
      throw new BadRequestException('Invalid start date format');
    }

    if (isNaN(endDateObj.getTime())) {
      throw new BadRequestException('Invalid end date format');
    }

    if (startDateObj >= endDateObj) {
      throw new BadRequestException('End date must be after start date');
    }

    const event: Event = {
      id: uuidv4(),
      name,
      description,
      startDate: startDateObj,
      endDate: endDateObj,
      timezone,
    };

    this.events.push(event);
    return event;
  }
}
