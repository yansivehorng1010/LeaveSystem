import React, { useState } from 'react';
import { Button, Input, Modal, Form } from 'antd';
import axios from 'axios';
const { Search } = Input;
const { TextArea } = Input;
export const AddLevel: React.FC<{ getList: () => void }> = ({ getList }) => {
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
      .post('http://114.119.182.183:8080/ClaimRest/permissionType', { ...e })
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
          title="Add New Team"
          visible={isModalVisible}
          onOk={() => form.submit()}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <Form onFinish={addNewCompany} form={form} method="post">
            <Form.Item
              label="Permission Type"
              name="name"
              rules={[{ required: true, message: 'Please Permission Type!' }]}
            >
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Team Name English"
              />
            </Form.Item>

            <Form.Item
              label="Numbers of days"
              name="numberLeaveDay"
              rules={[{ required: true, message: 'Please Numbers of days!' }]}
            >
              <Input
                id="numberLeaveDay"
                name="numberLeaveDay"
                type="text"
                placeholder="Number of days"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please write down your description!',
                },
              ]}
            >
              <TextArea
                rows={4}
                id="description"
                name="description"
                placeholder="Input Description"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <h1 className="text-2xl font-bold hover:text-yellow-400">
          Level Type List Data
        </h1>
      </div>
      <div className="flex justify-end ">
        <Search
          placeholder="input search text"
          //   onSearch={onSearch}
          enterButton
        />
      </div>
    </div>
  );
};
