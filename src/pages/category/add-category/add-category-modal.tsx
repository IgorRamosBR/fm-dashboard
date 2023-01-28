import { Button, Form, Input, InputNumber, Modal, Radio } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CategoryApi } from '../../../api/category';
import { CategoryModel } from '../../../models/category';

interface Props {
    show: boolean;
    onSuccess: () => void;
    onClose: () => void;
  }

export default function AddCategoryModal( { show, onSuccess, onClose }: Props) {
    const [form] = Form.useForm();
    const category = useRef<CategoryModel>({} as CategoryModel);

    const handleOk = () => {
        form.submit()
        onClose();
    };


    const onFinish = (values: any) => {
        let newCategory: CategoryModel = {
            name: values.name,
            type: values.type,
            priority: 1000,
        }
        category.current = newCategory
        mutate()
      };

    const queryClient = useQueryClient();

    const { mutate } = useMutation(
        () => CategoryApi.createCategory(category.current),
        {
            onSuccess: () => {
                console.log('ok')
                onSuccess();
            },
            onError:(error) => {
                console.log('error')
                console.log(error);
            }
        }
    )
    
    return (
        <Modal title="Nova categoria" open={show} onOk={handleOk} onCancel={onClose}>
            
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <>
                <Form.Item label="Name" name="name">
                    <Input placeholder='Nome da categoria' />
                </Form.Item>
                <Form.Item label="Tipo" name="type">
                    <Radio.Group>
                        <Radio value="EXPENSE"> Gasto </Radio>
                        <Radio value="INCOME"> Renda </Radio>
                    </Radio.Group>
                </Form.Item>
            </>
            <Form.Item label="Prioridade">
                <InputNumber disabled={true}/>
            </Form.Item>
            {/* <Form.Item>
                <Button type="primary">Submit</Button>
            </Form.Item> */}
        </Form>
        </Modal>
    )
}