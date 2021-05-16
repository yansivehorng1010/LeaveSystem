import React, { useState } from 'react';
import { Button, Input, Modal, Form, InputNumber } from 'antd';
import axios from 'axios';
const { Search } = Input;
const { TextArea } = Input;
export const AddApproval: React.FC<{ getList: () => void }> = ({ getList }) => {
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
  const addNewApproval = (e: any) => {
    setLoading(true);
    axios
      .post('http://114.119.182.183:8080/ClaimRest/approvalLevel', { ...e })
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
          title="Add New Approval Level"
          visible={isModalVisible}
          onOk={() => form.submit()}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <Form onFinish={addNewApproval} form={form} method="post">
            <Form.Item
              label="Level Name"
              name="levelName"
              rules={[{ required: true, message: 'Please Input Level Name!' }]}
            >
              <Input
                id="levelName"
                name="levelName"
                type="text"
                placeholder="Level Name"
              />
            </Form.Item>

            <Form.Item
              label="Level Number"
              name="levelNumber"
              rules={[
                {
                  required: true,
                  message: 'Please Input Level Number (Number only)!',
                },
              ]}
            >
              <InputNumber
                style={{ width: 360 }}
                min={1}
                max={100}
                id="levelNumber"
                name="levelNumber"
                // placeholder="Input Number only"
                defaultValue={0}
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
          Approval Level List Data
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
