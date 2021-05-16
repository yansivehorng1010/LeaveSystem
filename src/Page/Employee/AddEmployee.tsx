import React, { useEffect, useState } from 'react';
import {
  Input,
  Modal,
  Form,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Radio,
  Checkbox,
} from 'antd';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
const { Search } = Input;
const { Option } = Select;
export const AddEmployee: React.FC<{ getList: () => void }> = ({ getList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState() as any;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [timeStamp, setTimeStamp] = useState(0);
  const [timeStampJoin, setTimeStampJoin] = useState(0);
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [checkboxInsurance, setCheckboxInsurance] = useState(false);
  const [checkboxHealth, setCheckboxHealth] = useState(false);
  //modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  //AddNew
  const addNewEmployee = (data: any) => {
    data.dob = timeStamp;
    data.joinDate = timeStampJoin;
    data.emlntStatus = checkboxStatus;
    data.lifeInsurance = checkboxInsurance;
    data.healthInsurance = checkboxHealth;
    data.password = '123';
    console.log('data----->', data);
    setLoading(true);
    axios
      .post('http://114.119.182.183:8080/ClaimRest/employee', {
        ...data,

        company: state?.company.find((v: any) => v.id == data.companyId),
        team: state?.team.find((v: any) => v.id == data.teamId),
      })
      .then(() => {
        getList();
        setLoading(false);
        handleCancel();
      })

      .catch(() => setLoading(false));
  };

  //Datepicker
  const handleDate = (_: any, dateString: any) => {
    const dob = new Date(dateString).getTime();
    console.log('...>', dob);
    setTimeStamp(dob);
  };

  const handleDateJoin = (_: any, dateString: any) => {
    const dob = new Date(dateString).getTime();
    console.log('...>', dob);
    setTimeStampJoin(dob);
  };

  //checkboxStatus
  const handleStatus = (e: any) => {
    setCheckboxStatus(e.target.checked);
  };

  //CheckboxInsurance
  const handleInsurance = (e: any) => {
    setCheckboxInsurance(e.target.checked);
  };
  //CheckboxHealth
  const handleHealth = (e: any) => {
    setCheckboxHealth(e.target.checked);
  };

  //getDropDown

  useEffect(() => {
    getDropDownList();
  }, []);

  const getDropDownList = () => {
    axios
      .get('http://114.119.182.183:8080/ClaimRest/employee/dropdown')
      .then((res) => {
        // console.log('res=========>data', res);
        setState(res?.data?.results);
      });
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
          width={1000}
        >
          <Form
            onFinish={addNewEmployee}
            form={form}
            method="post"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
          >
            <Row>
              <Col span={12}>
                <Form.Item label="Name" name="nameEn">
                  <Input type="text" placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Employee Number" name="employeeNumber">
                  <Input type="number" placeholder="Employee Number " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Name Kh" name="nameKh">
                  <Input type="text" placeholder="Name Kh " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Gender" name="gender">
                  <Radio.Group>
                    <Radio value="M">Male</Radio>
                    <Radio value="F">Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date Of Birth" name="dob">
                  <DatePicker
                    placeholder="--Date Of Birth--"
                    style={{ width: 330 }}
                    onChange={handleDate}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="National Card" name="nationalCard">
                  <Input type="text" placeholder="National Card " />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Place Of Birth" name="pob">
                  <TextArea placeholder="Place Of Birth " />
                </Form.Item>
              </Col>
              <Col span={12} />
              <Col span={12}>
                <Form.Item label="Phone Number(1)" name="contact1">
                  <Input type="number" placeholder="Phone Number(1) " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number(2)" name="contact2">
                  <Input type="number" placeholder="Phone Number(2) " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Personal Email" name="personalEmail">
                  <Input type="text" placeholder="Personal Email " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Contact Emergency" name="contactEmergency">
                  <Input type="number" placeholder="Contact Emergency " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Marital Status" name="maritalStatus">
                  <Radio.Group>
                    <Radio value="single">Single</Radio>
                    <Radio value="Married">Married</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="No Of Children" name="noOfChildren">
                  <Input type="number" placeholder="No Of Children " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Address" name="addressEn">
                  <TextArea placeholder="Address " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Address Kh" name="addressKh">
                  <TextArea placeholder="Address Kh " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Company" name="companyId">
                  <Select
                    showSearch
                    placeholder="----select company----"
                    optionFilterProp="children"
                  >
                    {state?.company.map((x: any, index: any) => (
                      <Option value={x.id} key={index}>
                        {x.companyNameEn}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Team" name="teamId">
                  <Select
                    showSearch
                    placeholder="----select Team----"
                    optionFilterProp="children"
                  >
                    {state?.team.map((x: any, index: any) => (
                      <Option value={x.id} key={index}>
                        {x.teamNameEn}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Position" name="position">
                  <Input type="text" placeholder="Position " />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Join Date" name="joinDate">
                  <DatePicker
                    placeholder="--Join Date--"
                    style={{ width: 330 }}
                    onChange={handleDateJoin}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Emlt Status">
                  <Checkbox onChange={handleStatus}>Active</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12} />
              <Col span={12}>
                <Form.Item label="T-Shirt" name="tshirt">
                  <Input type="text" placeholder="Size(S,M,L,XL)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="NSSF" name="nssf">
                  <Input type="text" placeholder="NSSF " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Education" name="hiEd">
                  <Input type="text" placeholder="Education" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Campus" name="campus">
                  <Input type="text" placeholder="Campus" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Graduation" name="graduation">
                  <Input type="text" placeholder="Graduation" />
                </Form.Item>
              </Col>
              <Col span={12} />
              <Col span={12}>
                <Form.Item label="Work Email (1)" name="workEmail1">
                  <Input type="text" placeholder="Work Email (1)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Work Email (2)" name="workEmail2">
                  <Input type="text" placeholder="Work Email (2)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Duration (1)" name="duration1">
                  <Input type="text" placeholder="Duration (1)" />
                </Form.Item>
              </Col>
              <Col span={12} />
              <Col span={12}>
                <Form.Item label="Company (2)" name="company2">
                  <Input type="text" placeholder="Company (2)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Position (2)" name="position2">
                  <Input type="text" placeholder="Position (2)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Duration (2)" name="duration2">
                  <Input type="number" placeholder="Duration (2)" />
                </Form.Item>
              </Col>
              <Col span={12} />
              <Col span={12}>
                <Form.Item label="Company (3)" name="company3">
                  <Input type="text" placeholder="Company (3)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Position (3)" name="position3">
                  <Input type="text" placeholder="Position (3)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Duration (3)" name="duration3">
                  <Input type="number" placeholder="Duration (3)" />
                </Form.Item>
              </Col>
              <Col span={12} />
              <Col span={12}>
                <Form.Item label="Life Insurance">
                  <Checkbox onChange={handleInsurance}>Yes</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Health Insurance">
                  <Checkbox onChange={handleHealth}>Yes</Checkbox>
                </Form.Item>
              </Col>
            </Row>
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
