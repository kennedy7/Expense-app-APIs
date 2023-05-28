import { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ReportType } from 'src/data';

export class ReportTypeValidationPipe implements PipeTransform {
  readonly allowedReportTypes = [ReportType.EXPENSE, ReportType.INCOME];
  transform(value: any) {
    value = value.toLowerCase();
    if (!this.isTypeValid(value)) {
      throw new BadRequestException(`${value} is not a valid Report Type!`);
    }
    return value;
  }
  private isTypeValid(type: any) {
    const index = this.allowedReportTypes.indexOf(type);
    return index != -1;
  }
}
