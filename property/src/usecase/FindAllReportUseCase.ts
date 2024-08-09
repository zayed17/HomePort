import {  ReportPropertyInterface } from '../repositories';
import { ReportData } from '../entities/reportPropertyEntity';

export class FindAllReportsUseCase {
  constructor(private reportRepository: ReportPropertyInterface) { }
  async findAllReports(): Promise<ReportData[]> {
    const results = this.reportRepository.find({});
    return results
  }
}