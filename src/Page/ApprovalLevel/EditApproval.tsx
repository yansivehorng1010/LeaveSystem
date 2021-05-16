import React, { useState } from 'react';
import { Input, Modal, Form, Button, InputNumber } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
export const EditApproval: React.FC<{
  id: any;
  record: any;
  getList: () => void;
}> = ({ id, record, getList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  console.log('record====>', record);
  //modal
  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      levelName: record.levelName,
      levelNumber: record.levelNumber,
      description: record.description,
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const EditApproval = (e: any) => {
    setLoading(true);
    axios
      .put('http://114.119.182.183:8080/ClaimRest/approvalLevel/' + id, {
        ...e,
      })
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
        title="Add New Approval Level"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form onFinish={EditApproval} form={form} method="put">
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
              placeholder="Input Number only"
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
  );
};
