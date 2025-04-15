import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDateString,
  Matches,
  Validate,
} from 'class-validator';
import { DateRangeValidator } from './date-range.validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32, { message: 'Name must not exceed 32 characters' })
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString(
    {},
    { message: 'Start date must be a valid ISO 8601 date string' },
  )
  startDate: string;

  @IsNotEmpty()
  @IsDateString(
    {},
    { message: 'End date must be a valid ISO 8601 date string' },
  )
  @Validate(DateRangeValidator, ['startDate'], {
    message: 'End date must be after start date',
  })
  endDate: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z_/+-]+$/, {
    message: 'Timezone must be a valid IANA timezone identifier',
  })
  timezone: string;
}
