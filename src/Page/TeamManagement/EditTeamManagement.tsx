import React, { useEffect, useState } from 'react';
import { Input, Modal, Form, Button, Select } from 'antd';
import axios from 'axios';
const { Option } = Select;
export const EditTeamManagement: React.FC<{
  id: any;
  record: any;
  getList: () => void;
}> = ({ id, record, getList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState() as any;
  const [supervisorId, setSupervisorId] = useState(0);
  const [teamId, setTeamId] = useState(0);
  const [headId, setHeadId] = useState(0);
  console.log('record====>', record);
  //modal
  const showModal = () => {
    setIsModalVisible(true);
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
        supervisor: state.find((v: any) => v.id == supervisorId),
        head: state.find((v: any) => v.id == headId),
      })
      .then(() => {
        getList();
        handleCancel();
        setLoading(false);
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
  const handleChangeTeam = (value: any) => {
    setTeamId(value);
    const team = state.team.find((item: any) => item.id === value);
    form.setFieldsValue({
      companyNameEn: team.company.companyNameEn,
    });
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
        <Form
          onFinish={editTeamManagement}
          form={form}
          method="put"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Team"
            rules={[{ required: true, message: 'Please Team Name English!' }]}
          >
            <Select
              showSearch
              value={teamId || record.team.id}
              placeholder="----select team english----"
              optionFilterProp="children"
              //   onChange={(v: any) => setTeamId(v)}
              onChange={handleChangeTeam}
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
            initialValue={record?.team?.company?.companyNameEn}
            rules={[{ required: true, message: 'Please input Company Name!' }]}
          >
            <Input disabled type="text" />
          </Form.Item>
          <Form.Item
            label="Supervisor"
            rules={[
              {
                required: true,
                message: 'Please input Supervisor Name!',
              },
            ]}
          >
            <Select
              showSearch
              value={supervisorId || record?.supervisor.id}
              placeholder="----select supervisor----"
              optionFilterProp="children"
              onChange={(value: any) => setSupervisorId(value)}
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
              value={headId || record?.head.id}
              onChange={(value: any) => setHeadId(value)}
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
  );
};
