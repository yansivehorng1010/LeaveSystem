import React, { useEffect, useState } from 'react';
import { Input, Modal, Form, Button, Select } from 'antd';
import axios from 'axios';
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
        // team: { id: e.teamNameEn },
        // company: { id: e.company },
        // supervisor: { id: e.nameEn },
        // head: { id: e.head.nameEn },

        team: { id: data.team },
        company: { id: data.company },
        supervisor: { id: data.supervisor },
        // head: { id: e.head },
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
        // console.log('res=========>', res);
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
              name="teamNameEn"
              rules={[{ required: true, message: 'Please Team Name English!' }]}
            >
              <Select
                showSearch
                id="teamNameEn"
                value="teamNameEn"
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
                //   placeholder="Team Name Khmer"
              />
            </Form.Item>
            <Form.Item
              label="Supervisor"
              name="supervisor"
              rules={[
                {
                  required: true,
                  message: 'Please input Supervisor Name!',
                },
              ]}
            >
              <Select
                showSearch
                id="nameEn"
                value="nameEn"
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
              name="head"
              rules={[
                {
                  required: true,
                  message: 'Please input Head name!',
                },
              ]}
            >
              <Select
                showSearch
                // id="nameEn"
                // value="nameEn"
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
