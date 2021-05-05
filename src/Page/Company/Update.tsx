import React, { useState } from 'react';
import { Input, Modal, Form, Button } from 'antd';
import axios from 'axios';
export const Update: React.FC<{
  id: any;
  record: any;
  getList: () => void;
}> = ({ id, record, getList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  //modal
  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      companyNameEn: record.companyNameEn,
      companyNameKh: record.companyNameKh,
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const updateCompany = (e: any) => {
    setLoading(true);
    axios
      .put('http://114.119.182.183:8080/ClaimRest/company/' + id, { ...e })
      .then(() => {
        getList();
        handleCancel();
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Editor
      </Button>
      <Modal
        title="Update Company fields"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form onFinish={updateCompany} form={form} method="put">
          <Form.Item
            label="Company Name English"
            name="companyNameEn"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              id="companyNameEn"
              name="companyNameEn"
              type="text"
              placeholder="Company Name English"
            />
          </Form.Item>

          <Form.Item
            label="Company Name Khmer"
            name="companyNameKh"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              id="companyNameKh"
              name="companyNameKh"
              type="text"
              placeholder="Company Name Khmer"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
