import axios from "axios";
import { resolve } from "path";
import { CategoryReportModel, ReportModel } from "../models/report";
import { TransactionModel, TransactionPageModel } from "../models/transaction";
import { monthCodes } from "../utils/utils";
import { CategoryApi } from "./category";

const URL = "https://un197wgjrb.execute-api.us-east-1.amazonaws.com/dev/report";

async function getReport(periods:string[]): Promise<ReportModel> {
    let categories = await CategoryApi.getCategories();
    let report: ReportModel = {categories: new Map<string, CategoryReportModel>()}

    fetch(`${URL}?periods=${periods.join(",")}`)
        .then(response => response.json())
        .then(response => {return response as ReportModel})
        .then(rep => categories.forEach(cat => {
            let categoryReport = rep.categories.get(cat.name)
            report.categories.set(cat.name, categoryReport ? categoryReport : {} as CategoryReportModel)
        }))
    
    return report
}

export const ReportApi = {
    getReport,
}