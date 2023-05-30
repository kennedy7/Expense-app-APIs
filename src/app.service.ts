import { Injectable, Param } from '@nestjs/common';
import { data, ReportType } from './data';

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
  createReport(type: ReportType, data: ReportDto) {}
}
