import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';
import { ReportTypeValidationPipe } from './pipes/report-type-validation.pipe';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Delete, HttpCode } from '@nestjs/common/decorators';
import { report } from 'process';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', ReportTypeValidationPipe) type: string,
    @Param('id') id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type', ReportTypeValidationPipe) type: ReportType,
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);
    return newReport;
  }
  @Patch(':id')
  updateReport(
    @Param('type', ReportTypeValidationPipe) type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdate = data.report
      .filter((report) => report.type === reportType)
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
    };
    return data.report[reportIndex];
  }
  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) throw new NotFoundException();
    data.report.splice(reportIndex, 1);
  }
}
