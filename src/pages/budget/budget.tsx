import { Button, Divider, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import TransactionList from './list-transactions/list-transactions';
import AddTransactionForm from './add-transactions/add-transaction-form';
import { TransactionApi } from '../../api/transaction';
import { useQuery } from 'react-query';
import { CategoryApi } from '../../api/category';
import { TransactionModel } from '../../models/transaction';
import { CategoryModel } from '../../models/category';
import { ReportApi } from '../../api/report';
import { monthCodes } from '../../utils/utils';

const getCurrentSixMonths = ():string[] => {   
    const date = new Date();
    let month = date.getMonth();
    if (month < 6) {
        return monthCodes.slice(0, 6).map(m => m + `-${date.getFullYear}`)
    }
    return monthCodes.slice(7, monthCodes.length).map(m => m + `-${date.getFullYear}`)
}



const Budget: React.FC = () => {
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [categoriesOrdered, setCategoriesOrdered] = useState<string[]>([])
    
    const { data, isError, isLoading, refetch } = useQuery(['report'], () => ReportApi.getReport(getCurrentSixMonths()));
    const { data: categories, isError: categoriesHasError, isLoading: categoriesIsLoading, refetch: refetchCategories } = useQuery(["categories-list"], CategoryApi.getCategories);
    
    // const initalizeTransactionsMap = useCallback((categories: CategoryModel[]) => {
    //     categories.forEach((cat) => {
    //         setTransactionsByCategory(transactionsByCategory.set(cat.name, []))
    //     })
    // }, [transactionsByCategory])

    // useEffect(() => {
    //     let ordered = categories?.sort((a, b) => a.priority >= b.priority ? 1 : -1).map(cat => cat.name)
    // }, [categories])

    // const mapTransactions = useCallback((transactions: TransactionModel[]) => {
    //     transactions.forEach(t => {
    //         let currentTransactions = transactionsByCategory.get(t.category)
    //         let newTransactions = currentTransactions?.concat(t)
    //         transactionsByCategory.set(t.category, newTransactions ? newTransactions : [])
    //         setTransactionsByCategory(transactionsByCategory)
    //     })
    // }, [transactionsByCategory])

    useEffect(() => {
        console.log(data)
    }, [data])

    const showTransactionModal = () => {
        setIsTransactionModalOpen(true);
    };

    const handleOk = () => {
        setIsTransactionModalOpen(false);
    };

    const handleCancel = () => {
        setIsTransactionModalOpen(false);
    }; 


    return (
        <div>
            <div>
                <Space>
                    <Button onClick={showTransactionModal}>
                        <PlusOutlined /> Adicionar Transação
                    </Button>
                </Space>
                <Divider />

                <TransactionList/>

                <Modal title="Nova transação" open={isTransactionModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <AddTransactionForm categories={categories ? categories : []}/>
                </Modal>
            </div>
        </div>
    )
}

export default Budget;