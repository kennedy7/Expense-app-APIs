import { Injectable, Param } from '@nestjs/common';
import { data, ReportType } from '../data';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from '../dtos/report.dto';

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }
  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!report) return;
    return new ReportResponseDto(report);
  }
  createReport(
    type: ReportType,
    { amount, source }: CreateReportDto,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      amount,
      source,
      createdAt: new Date(),
      updatedAt: new Date(),
      type,
    };

    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }
  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReportDto,
  ): ReportResponseDto {
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
