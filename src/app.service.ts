import { Injectable, Param } from '@nestjs/common';
import { data, ReportType } from './data';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => (report.type = type));
  }
}
