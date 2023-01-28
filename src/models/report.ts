export interface ReportModel {
    categories: Map<string, CategoryReportModel>;
}

export interface CategoryReportModel {
    name: string;
    total: number;
    values: Map<string, number>;
}