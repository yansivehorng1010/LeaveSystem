import React, { useEffect, useState } from 'react';
import { Input, Modal, Form, Button, Select } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
export const EditTeam: React.FC<{
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
      teamNameEn: record.teamNameEn,
      teamNameKh: record.teamNameKh,
      companyNameEn: record.company.companyNameEn,
      description: record.description,
      //   ,
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const editCompany = (e: any) => {
    setLoading(true);
    axios
      .put('http://114.119.182.183:8080/ClaimRest/team/' + id, {
        ...e,
        id: e.companyNameEn,
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
        title="Edit Team fields"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form onFinish={editCompany} form={form} method="put">
          <Form.Item
            label="Team Name English"
            name="teamNameEn"
            rules={[{ required: true, message: 'Please Team Name English!' }]}
          >
            <Input
              id="teamNameEn"
              name="teamNameEn"
              type="text"
              placeholder="Team Name English"
            />
          </Form.Item>

          <Form.Item
            label="Team Name Khmer"
            name="teamNameKh"
            rules={[{ required: true, message: 'Please Team Name Khmer!' }]}
          >
            <Input
              id="teamNameKh"
              name="teamNameKh"
              type="text"
              placeholder="Team Name Khmer"
            />
          </Form.Item>
          {/* <Form.Item
            label="Company"
            name="companyNameEn"
            rules={[{ required: true, message: 'Please Team Name Khmer!' }]}
          >
            <Select
              showSearch
              id="companyNameEn"
              style={{ width: 380 }}
              placeholder="----select company----"
              optionFilterProp="children"
            >
              {state?.company.map((x: any, id: any) => (
                <Option value="0">{x.companyNameEn}</Option>
              ))}
            </Select>
          </Form.Item> */}
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
