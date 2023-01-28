import { getMouseEventButton } from "@testing-library/user-event/dist/types/system/pointer/buttons";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { TransactionModel } from "../../../models/transaction";

interface DataType {
    key: string;
    category: string;
    month1: number;
    month2: number;
    month3: number;
    month4: number;
    month5: number;
    month6: number;
    total: number;
    isCategory: boolean
}

const columns: ColumnsType<DataType> = [
    {
        title: "",
        key: "category",
        dataIndex: "category",
        render: (_, record) => {
            if (record.isCategory) {
                return (<span style={{fontWeight: "bold", textTransform:"uppercase"}}>{record.category}</span>)
            } 
            return (<span>{record.category}</span>)
        }
    },
    {
        title: getMonth(1),
        key: "month1",
        dataIndex: "month1",
    },
    {
        title: getMonth(2),
        key: "month2",
        dataIndex: "month2",
    },
    {
        title: getMonth(3),
        key: "month3",
        dataIndex: "month3",
    },
    {
        title: getMonth(4),
        key: "month4",
        dataIndex: "month4",
    },
    {
        title: getMonth(5),
        key: "month5",
        dataIndex: "month5",
    },
    {
        title: getMonth(6),
        key: "month6",
        dataIndex: "month6",
    },
    {
        title: "Total",
        key: "total",
        dataIndex: "total"
    }
]

const transactions: DataType[] = [
    {
        key: "3",
        category: "Renda Familiar",
        month1: 0.0,
        month2: 0.0,
        month3: 0.0,
        month4: 0.0,
        month5: 0.0,
        month6: 0.0,
        total: 0.0,
        isCategory: true,
    },   
    {
        key: "1",
        category: "Salário Igor",
        month1: 2000.00,
        month2: 2000.00,
        month3: 2000.00,
        month4: 2000.00,
        month5: 2000.00,
        month6: 2000.00,
        total: 12000.00,
        isCategory: false,
    },
    {
        key: "2",
        category: "Salário Camilla",
        month1: 1000.00,
        month2: 1000.00,
        month3: 1000.00,
        month4: 1000.00,
        month5: 1000.00,
        month6: 1000.00,
        total: 6000.00,
        isCategory: false,
    },
]

function getMonth(index: number) {
    const monthNames = ["Janeiro","fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    const date = new Date();
    let month = date.getMonth();
    if (month <= 6) {
        return monthNames[index]
    }
    return monthNames[index + 5]
}

const TransactionList: React.FC = () => {
    return (
        <Table columns={columns} dataSource={transactions}/>
    )
}

export default TransactionList;