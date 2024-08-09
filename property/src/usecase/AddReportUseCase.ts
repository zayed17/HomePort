import {  ReportPropertyInterface } from '../repositories';
import { ReportData } from '../entities/reportPropertyEntity';
import { io } from '../app';

export class AddReportUseCase {
  constructor(private reportRepository: ReportPropertyInterface) { }

  async addReport( report: ReportData): Promise<void> {
    this.reportRepository.addReport(report);
    io.emit('newReport', report);
  }
}