import React, { useState } from 'react';

import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';

import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 14 },
};


export const Ingresar = () => {

    const history = useHistory();
    const [user] = useState(getUsuarioStorage());

    useHideMenu(false);

    const onFinish = ({ attended, desktop }) => {

        localStorage.setItem('attended', attended);
        localStorage.setItem('desktop', desktop);

        history.push('/desktop');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (user.attended && user.desktop) {
        return <Redirect to="/desktop" />
    }

    return (
        <>
            <Title level={2}>Ingresar</Title>
            <Text>Ingrese su nombre y número de desktop</Text>
            <Divider />

            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre del attended"
                    name="attended"
                    rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Escritorio"
                    name="desktop"
                    rules={[{ required: true, message: 'Ingrese el número de desktop' }]}
                >
                    <InputNumber min={1} max={99} />
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                    >
                        <SaveOutlined />
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
