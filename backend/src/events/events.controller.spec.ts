import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { BadRequestException } from '@nestjs/common';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getAllEvents', () => {
    it('should return an empty array when no events exist', () => {
      const result = controller.getAllEvents();
      expect(result).toEqual([]);
    });

    it('should return all events', () => {
      // Create an event first
      const createEventDto: CreateEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        startDate: '2025-05-01T10:00:00Z',
        endDate: '2025-05-01T12:00:00Z',
        timezone: 'UTC',
      };

      controller.createEvent(createEventDto);

      // Then test getAllEvents
      const events = controller.getAllEvents();
      expect(events).toHaveLength(1);
      expect(events[0].name).toBe('Test Event');
      expect(events[0].description).toBe('Test Description');
      expect(events[0].startDate).toEqual(new Date('2025-05-01T10:00:00Z'));
      expect(events[0].endDate).toEqual(new Date('2025-05-01T12:00:00Z'));
      expect(events[0].timezone).toBe('UTC');
    });

    it('should return multiple events when multiple events exist', () => {
      // Create first event
      const firstEventDto: CreateEventDto = {
        name: 'First Event',
        description: 'First Description',
        startDate: '2025-05-01T10:00:00Z',
        endDate: '2025-05-01T12:00:00Z',
        timezone: 'UTC',
      };

      // Create second event
      const secondEventDto: CreateEventDto = {
        name: 'Second Event',
        description: 'Second Description',
        startDate: '2025-06-01T14:00:00Z',
        endDate: '2025-06-01T16:00:00Z',
        timezone: 'America/New_York',
      };

      controller.createEvent(firstEventDto);
      controller.createEvent(secondEventDto);

      const events = controller.getAllEvents();
      expect(events).toHaveLength(2);
      expect(events[0].name).toBe('First Event');
      expect(events[1].name).toBe('Second Event');
    });
  });

  describe('createEvent', () => {
    it('should create a new event successfully', () => {
      const createEventDto: CreateEventDto = {
        name: 'New Event',
        description: 'Event Description',
        startDate: '2025-05-15T09:00:00Z',
        endDate: '2025-05-15T17:00:00Z',
        timezone: 'America/New_York',
      };

      const createdEvent = controller.createEvent(createEventDto);

      expect(createdEvent).toBeDefined();
      expect(createdEvent.id).toBeDefined();
      expect(createdEvent.name).toBe('New Event');
      expect(createdEvent.description).toBe('Event Description');
      expect(createdEvent.startDate).toEqual(new Date('2025-05-15T09:00:00Z'));
      expect(createdEvent.endDate).toEqual(new Date('2025-05-15T17:00:00Z'));
      expect(createdEvent.timezone).toBe('America/New_York');

      // Verify it was added to the list
      const events = controller.getAllEvents();
      expect(events).toContainEqual(createdEvent);
    });

    it('should throw BadRequestException when end date is before start date', () => {
      const invalidEventDto: CreateEventDto = {
        name: 'Invalid Event',
        description: 'Invalid Dates',
        startDate: '2025-05-15T09:00:00Z',
        endDate: '2025-05-14T17:00:00Z', // End date before start date
        timezone: 'UTC',
      };

      expect(() => controller.createEvent(invalidEventDto)).toThrow(
        BadRequestException,
      );
      expect(() => controller.createEvent(invalidEventDto)).toThrow(
        'End date must be after start date',
      );
    });

    it('should throw BadRequestException when start date is invalid', () => {
      const invalidEventDto = {
        name: 'Invalid Event',
        description: 'Invalid start date',
        startDate: 'not-a-date',
        endDate: '2025-05-15T17:00:00Z',
        timezone: 'UTC',
      } as CreateEventDto;

      expect(() => controller.createEvent(invalidEventDto)).toThrow(
        BadRequestException,
      );
      expect(() => controller.createEvent(invalidEventDto)).toThrow(
        'Invalid start date format',
      );
    });

    it('should throw BadRequestException when end date is invalid', () => {
      const invalidEventDto = {
        name: 'Invalid Event',
        description: 'Invalid end date',
        startDate: '2025-05-15T09:00:00Z',
        endDate: 'not-a-date',
        timezone: 'UTC',
      } as CreateEventDto;

      expect(() => controller.createEvent(invalidEventDto)).toThrow(
        BadRequestException,
      );
      expect(() => controller.createEvent(invalidEventDto)).toThrow(
        'Invalid end date format',
      );
    });

    it('should create an event with maximum name length (32 chars)', () => {
      const maxLengthName = 'A'.repeat(32);
      const validEventDto: CreateEventDto = {
        name: maxLengthName,
        description: 'Valid max length name',
        startDate: '2025-05-15T09:00:00Z',
        endDate: '2025-05-15T17:00:00Z',
        timezone: 'UTC',
      };

      const createdEvent = controller.createEvent(validEventDto);
      expect(createdEvent.name).toBe(maxLengthName);
      expect(createdEvent.name.length).toBe(32);
    });
  });
});
