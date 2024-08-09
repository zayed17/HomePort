import { ReportPropertyInterface } from '../interface';
import { ReportData } from '../../entities/reportPropertyEntity';
import ReportModel from '../../infrastructure/mongodb/ReportPropertyModel';

export class ReportPropertyRepository implements ReportPropertyInterface {
  async addReport(report: ReportData): Promise<any> {
    const newReport= new ReportModel(report);
    return  newReport.save();
  }

  async find(filter: Partial<ReportData> = {}): Promise<ReportData[]> {
    return ReportModel.find(filter).lean().sort({ createdAt: -1 }) as Promise<ReportData[]>;
  }

}