import React, { useEffect, useState } from 'react';
import { Input, Modal, Form, Button, Select } from 'antd';
import axios from 'axios';
import { FaTeamspeak } from 'react-icons/Fa';
const { Search } = Input;
const { Option } = Select;

export const AddManagement: React.FC<{ getList: () => void }> = ({
  getList,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState() as any;
  //modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  //addNew
  const addNewTeamManagement = (data: any) => {
    console.log('data----->', data);
    setLoading(true);
    axios
      .post('http://114.119.182.183:8080/ClaimRest/team-management', {
        ...data,

        team: state?.team.find((v: any) => v.id == data.teamId),
        supervisor: state?.supervisor.find(
          (v: any) => v.id == data.supervisorId
        ),
        head: state?.head.find((v: any) => v.id == data.headId),
      })
      .then(() => {
        getList();
        setLoading(false);
        handleCancel();
      })
      .catch(() => setLoading(false));
  };
  useEffect(() => {
    getDropDownList();
  }, []);

  const getDropDownList = () => {
    axios
      .get('http://114.119.182.183:8080/ClaimRest/team-management/getDropDown')
      .then((res) => {
        console.log('res=========>', res);
        setState(res?.data?.results);
      });
  };
  const handleChange = (value: any) => {
    const companyName = state.team.find((item: any) => item.id === value);
    form.setFieldsValue({
      companyNameEn:
        companyName.company === null || ''
          ? ''
          : companyName.company.companyNameEn,
      team: companyName.id,
    });
  };

  console.log('state----->', state);
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
          <Form
            onFinish={addNewTeamManagement}
            form={form}
            method="post"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item
              label="Team"
              name="teamId"
              rules={[{ required: true, message: 'Please Team Name English!' }]}
            >
              <Select
                showSearch
                placeholder="----select team english----"
                optionFilterProp="children"
                onChange={handleChange}
              >
                {state?.team.map((x: any, index: any) => (
                  <Option value={x.id} key={index}>
                    {x.teamNameEn}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Company"
              name="companyNameEn"
              rules={[
                { required: true, message: 'Please input Company Name!' },
              ]}
            >
              <Input
                type="text"
                disabled
                //   placeholder="Team Name Khmer"
              />
            </Form.Item>
            <Form.Item
              label="Supervisor"
              name="supervisorId"
              rules={[
                {
                  required: true,
                  message: 'Please input Supervisor Name!',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="----select supervisor----"
                optionFilterProp="children"
              >
                {state?.supervisor.map((x: any, index: any) => (
                  <Option value={x.id} key={index}>
                    {x.nameEn}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Head"
              name="headId"
              rules={[
                {
                  required: true,
                  message: 'Please input Head name!',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="----select head----"
                optionFilterProp="children"
              >
                {state?.head.map((x: any, index: any) => (
                  <Option value={x.id} key={index}>
                    {x.nameEn}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
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
