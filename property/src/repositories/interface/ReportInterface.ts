import { ReportData } from '../../entities/reportPropertyEntity';

export interface ReportPropertyInterface {
  addReport(report: ReportData): Promise<ReportData>;
  find(filter?: Partial<ReportData>): Promise<ReportData[]>;
}