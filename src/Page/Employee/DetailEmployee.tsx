import React, { useState } from 'react';
import { Modal, Form, Col, Row } from 'antd';
import { IconDetail } from '../../Components/Icon';
import moment from 'moment';
import dateformat from 'dateformat';
import dateFormat from 'dateformat';

export const DetailEmployee: React.FC<{
  id: any;
  record: any;
}> = ({ id, record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  //modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div onClick={showModal}>
        <IconDetail />
      </div>
      <Modal
        title="Employee Information"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        confirmLoading={loading}
        width={1000}
      >
        <Form form={form}>
          <Row>
            <Col span={12}>
              <Form.Item label="Employee # ">{record.employeeNumber}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Company ">{record.companyNameEn}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Employee Name ">{record.nameEn}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Team ">{record.teamNameEn}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gender ">{record.gender}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Date of birth ">
                {dateFormat(new Date(record.dob), 'yyyy-mm-dd')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone number ">{record.contact1}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="email">{record.personalEmail}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Joining Date ">
                {dateFormat(new Date(record.joinDate), 'yyyy-mm-dd')}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Position ">{record.position}</Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
