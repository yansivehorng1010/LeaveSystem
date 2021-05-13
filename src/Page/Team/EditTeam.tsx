import React, { useEffect, useState } from 'react';
import { Input, Modal, Form, Button, Select } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
const { Option } = Select;
export const EditTeam: React.FC<{
  id: any;
  record: any;
  getList: () => void;
}> = ({ id, record, getList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [companyId, setCompanyId] = useState(0);
  const [form] = Form.useForm();
  const [state, setState] = useState({}) as any;
  const [loading, setLoading] = useState(false);
  console.log('record====>', record);
  //modal
  const showModal = () => {
    setState(record);
    setIsModalVisible(true);
    form.resetFields();
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const editCompany = (e: any) => {
    console.log('e=====>', e);
    setLoading(true);
    axios
      .put('http://114.119.182.183:8080/ClaimRest/team/' + id, {
        ...e,
        company: companyData.find((v: any) => v.id == companyId),
      })
      .then(() => {
        getList();
        handleCancel();
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };
  useEffect(() => {
    getCompany();
  }, []);
  const getCompany = () => {
    axios
      .get('http://114.119.182.183:8080/ClaimRest/team/getDropDown')
      .then((res) => {
        setCompanyData(res?.data?.results.company);
      });
  };
  console.log('state======>', state);

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
        <Form
          onFinish={editCompany}
          form={form}
          method="put"
          initialValues={{ ...state, companyNameEn: state?.company?.id }}
        >
          <Form.Item
            label="Team Name English"
            name="teamNameEn"
            rules={[{ required: true, message: 'Please Team Name English!' }]}
          >
            <Input type="text" placeholder="Team Name English" />
          </Form.Item>

          <Form.Item
            label="Team Name Khmer"
            name="teamNameKh"
            rules={[{ required: true, message: 'Please Team Name Khmer!' }]}
          >
            <Input type="text" placeholder="Team Name Khmer" />
          </Form.Item>
          <Form.Item
            label="Company"
            rules={[{ required: true, message: 'Please Team Name Khmer!' }]}
          >
            <Select
              showSearch
              style={{ width: 380 }}
              placeholder="----select company----"
              optionFilterProp="children"
              value={companyId || state?.company?.id}
              onChange={(value: any) => setCompanyId(value)}
            >
              {companyData.map((x: any, index: any) => (
                <Option value={x.id} key={index}>
                  {x.companyNameEn}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            // initialValue={state?.description}
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
              placeholder="input your description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
