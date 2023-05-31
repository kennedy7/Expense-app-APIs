import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';
import { ReportTypeValidationPipe } from './pipes/report-type-validation.pipe';
import { Delete, HttpCode } from '@nestjs/common/decorators';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', ReportTypeValidationPipe) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type', ReportTypeValidationPipe) type: ReportType,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, { amount, source });
  }
  @Patch(':id')
  updateReport(
    @Param('type', ReportTypeValidationPipe) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReport(reportType, id, body);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
