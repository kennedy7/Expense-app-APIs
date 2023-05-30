import { Injectable, Param } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

interface ReportDto {
  amount: number;
  source: string;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => (report.type = type));
  }
  getReportById(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }
  createReport(type: ReportType, { amount, source }: ReportDto) {
    const newReport = {
      id: uuid(),
      amount,
      source,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);
    return newReport;
  }
}
