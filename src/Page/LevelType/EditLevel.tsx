import React, { useState } from 'react';
import { Input, Modal, Form, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
export const EditLevel: React.FC<{
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
      name: record.name,
      numberLeaveDay: record.numberLeaveDay,
      description: record.description,
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const updateLevel = (e: any) => {
    setLoading(true);
    axios
      .put('http://114.119.182.183:8080/ClaimRest/permissionType/' + id, {
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
        title="Add New Team"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form onFinish={updateLevel} form={form} method="put">
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
            <TextArea rows={4} id="description" name="description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
