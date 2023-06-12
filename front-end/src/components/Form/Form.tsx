import {
    DatePicker,
    Form,
    Input,
    Radio,
} from 'antd';
import React from 'react';


const FormPage: React.FC = () => {

    return (
        <>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >

                <Form.Item label="First Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Last Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Email">
                    <Input />
                </Form.Item>
                <Form.Item label="Date of birth">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Gender">
                    <Radio.Group>
                        <Radio value="male"> Male </Radio>
                        <Radio value="female"> Female </Radio>
                    </Radio.Group>
                </Form.Item>

            </Form>
        </>
    );
};

export default FormPage;
