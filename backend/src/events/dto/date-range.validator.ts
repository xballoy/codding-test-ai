import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'dateRange', async: false })
export class DateRangeValidator implements ValidatorConstraintInterface {
  validate(endDateStr: string, args: ValidationArguments) {
    const [startDateField] = args.constraints;
    const startDateStr = (args.object as any)[startDateField];

    // Skip validation if the start date is missing
    if (!startDateStr) return true;

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Skip if either date is invalid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return true;

    // Validate that the end date is after the start date
    return endDate > startDate;
  }

  defaultMessage(args: ValidationArguments) {
    return 'End date must be after start date';
  }
}
