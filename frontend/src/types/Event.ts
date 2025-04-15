export interface Event {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    timezone: string;
}

export interface CreateEventDto {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    timezone: string;
}
