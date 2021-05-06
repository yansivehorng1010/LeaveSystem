import React, { useState } from 'react';
import { Button, Input, Modal, Form } from 'antd';
import axios from 'axios';
const { Search } = Input;
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
      .catch(() => setLoading(false));
  };
  return (
    <div className="flex justify-between">
      <div className="flex justify-start">
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
              rules={[
                { required: true, message: 'Please Company Name Khmer!' },
              ]}
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
      <div>
        <h1 className="text-2xl font-bold hover:text-yellow-400">
          Company List Data
        </h1>
      </div>
      <div className="flex justify-end">
        <Search
          placeholder="input search text"
          //   onSearch={onSearch}
          enterButton
        />
      </div>
    </div>
  );
};
