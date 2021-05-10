import React, { useState } from 'react';
import { Input, Modal, Form, Button } from 'antd';
import axios from 'axios';
const { Search } = Input;
export const AddManagement: React.FC<{ getList: () => void }> = ({
  getList,
}) => {
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
  const addNewTeamManagement = (e: any) => {
    setLoading(true);
    axios
      .post('http://114.119.182.183:8080/ClaimRest/team-management', { ...e })
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
          title="Edit Team Management fields"
          visible={isModalVisible}
          onOk={() => form.submit()}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <Form onFinish={addNewTeamManagement} form={form} method="post">
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
              rules={[
                { required: true, message: 'Please input Company Name!' },
              ]}
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
      <div>
        <h1 className="text-2xl font-bold hover:text-yellow-400">
          Team Management List Data
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
