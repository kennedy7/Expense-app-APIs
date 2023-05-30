import { Injectable, Param } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';

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
      type,
    };

    data.report.push(newReport);
    return newReport;
  }
  updateReport(type: ReportType, id: string, body: ReportDto) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!reportToUpdate)
      throw new NotFoundException(
        'No report with the Id or report type, check credentials and try again',
      );

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updatedAt: new Date(),
    };
    return data.report[reportIndex];
  }
  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) throw new NotFoundException();
    data.report.splice(reportIndex, 1);
    return;
  }
}
