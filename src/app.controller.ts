import { Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('report/:type')
  getAllReports(
    @Param('type') type: string){
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      return data.report.filter((report)=> report.type == reportType)
  }
  
  @Get(':id')
  getReportById(
    @Param('type') type: string,
    @Param('id') id: string){

    }
}
