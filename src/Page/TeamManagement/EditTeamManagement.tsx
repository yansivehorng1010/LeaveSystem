import React, { useState } from 'react';
import { Input, Modal, Form, Button } from 'antd';
import axios from 'axios';

export const EditTeamManagement: React.FC<{
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
      teamNameEn: record.team.teamNameEn,
      companyNameEn: record.team.company.companyNameEn,
      nameEn: record.supervisor.nameEn,
      name: record.head.nameEn,
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const editTeamManagement = (e: any) => {
    setLoading(true);
    axios
      .put('http://114.119.182.183:8080/ClaimRest/team-management/' + id, {
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
        title="Edit Team Management fields"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form onFinish={editTeamManagement} form={form} method="put">
          <Form.Item
            label="Team"
            name="teamNameEn"
            rules={[{ required: true, message: 'Please Team Name English!' }]}
          >
            <Input
              id="teamNameEn"
              name="teamNameEn"
              type="text"
              //   placeholder="Team Name English"
            />
          </Form.Item>

          <Form.Item
            label="Company"
            name="companyNameEn"
            rules={[{ required: true, message: 'Please input Company Name!' }]}
          >
            <Input
              id="companyNameEn"
              name="companyNameEn"
              type="text"
              //   placeholder="Team Name Khmer"
            />
          </Form.Item>
          <Form.Item
            label="Supervisor"
            name="nameEn"
            rules={[
              {
                required: true,
                message: 'Please input Supervisor Name!',
              },
            ]}
          >
            <Input
              id="nameEn"
              name="nameEn"
              type="text"
              //   placeholder="Team Name Khmer"
            />
          </Form.Item>
          <Form.Item
            label="Head"
            name="nameEn"
            rules={[
              {
                required: true,
                message: 'Please input Head name!',
              },
            ]}
          >
            <Input
              id="nameEn"
              name="name"
              type="text"
              //   placeholder="Team Name Khmer"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
