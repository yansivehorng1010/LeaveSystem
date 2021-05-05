import React, { useState } from 'react';
import { Button, Input, Modal, Form } from 'antd';
import axios from 'axios';
export const AddNew: React.FC<{ getList: () => void }> = ({ getList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  //addNew
  const addNewCompany = (e: any) => {
    setLoading(true);
    axios
      .post('http://114.119.182.183:8080/ClaimRest/company', { ...e })
      .then(() => {
        getList();
        setLoading(false);
        handleCancel();
      })
      .catch((error) => setLoading(false));
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        + Add New
      </Button>
      <Modal
        title="Add New Company"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form onFinish={addNewCompany} form={form} method="post">
          <Form.Item
            label="Company Name English"
            name="companyNameEn"
            rules={[
              { required: true, message: 'Please Company Name English!' },
            ]}
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
            rules={[{ required: true, message: 'Please Company Name Khmer!' }]}
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
