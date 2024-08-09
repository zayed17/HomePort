export interface ReportData {
    reportId: string;
    propertyId: string;
    reason: string;
    description: string;
    status: 'pending' | 'reviewed' | 'resolved'; 
}

export class Report {
    reportId: string;
    propertyId: string;
    reason: string;
    description: string;
    status: 'pending' | 'reviewed' | 'resolved';


    constructor({
        reportId,
        propertyId,
        reason,
        description,
        status,
    }: ReportData) {
        this.reportId = reportId;
        this.propertyId = propertyId;
        this.reason = reason;
        this.description = description;
        this.status = status;
    }
}