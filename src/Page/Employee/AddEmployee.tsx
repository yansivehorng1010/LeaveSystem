import React, { useState } from 'react';
import { Input, Modal, Form, Button, Select, DatePicker, Space } from 'antd';
import axios from 'axios';
const { Search } = Input;
const { Option } = Select;
export const AddEmployee: React.FC<{ getList: () => void }> = ({ getList }) => {
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
  return (
    <div className="flex justify-between">
      <div className="flex justify-start">
        <Button type="primary" onClick={showModal}>
          + Add New
        </Button>
        <Modal
          title="Add Employee fields"
          visible={isModalVisible}
          onOk={() => form.submit()}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          {/* <Col span={16}> */}
          {/* <div className="w-full"> */}
          <Form
            // onFinish={addNewTeamManagement}
            form={form}
            method="post"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            //   style={{ width: 100 }}
          >
            <Form.Item
              label="Name"
              name="teamNameEn"
              rules={[{ required: true, message: 'Input Name!' }]}
            >
              <Input
                type="text"
                //   placeholder="Team Name Khmer"
              />
            </Form.Item>

            <Form.Item
              label="Name Kh"
              name="companyNameEn"
              rules={[
                { required: true, message: 'Please input Company Name!' },
              ]}
            >
              <Input
                type="text"
                //   placeholder="Team Name Khmer"
              />
            </Form.Item>
            <Form.Item
              label="Date Of Birth"
              name="supervisor"
              rules={[
                {
                  required: true,
                  message: 'Please input Supervisor Name!',
                },
              ]}
            >
              <DatePicker
                placeholder="---Date Of Birth---"
                style={{ width: 300 }}
              />
            </Form.Item>
            <Form.Item
              label="Place Of Birth"
              name="head"
              rules={[
                {
                  required: true,
                  message: 'Please input Head name!',
                },
              ]}
            >
              <Input
                type="text"
                //   placeholder="Team Name Khmer"
              />
            </Form.Item>
            <Form.Item
              label="Phone Number1"
              name="head"
              rules={[
                {
                  required: true,
                  message: 'Please input Head name!',
                },
              ]}
            >
              <Input
                type="text"
                //   placeholder="Team Name Khmer"
              />
            </Form.Item>
            <Form.Item
              label="Personal Email"
              name="head"
              rules={[
                {
                  required: true,
                  message: 'Please input Head name!',
                },
              ]}
            >
              <Input
                type="text"
                //   placeholder="Team Name Khmer"
              />
            </Form.Item>
            <Form.Item
              label="Contact Emergency"
              name="head"
              rules={[
                {
                  required: true,
                  message: 'Please input Head name!',
                },
              ]}
            >
              <Input
                type="text"
                //   placeholder="Team Name Khmer"
              />
            </Form.Item>
          </Form>
          {/* </div> */}
          {/* </Col> */}
        </Modal>
      </div>
      <div>
        <h1 className="text-2xl font-bold hover:text-yellow-400">
          Employee List Data
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
