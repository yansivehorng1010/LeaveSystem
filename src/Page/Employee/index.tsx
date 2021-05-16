import React, { useEffect, useState } from 'react';
import { Button, Card, Pagination, Popconfirm, Table } from 'antd';
import axios from 'axios';
import { AddEmployee } from './AddEmployee';
import { EditEmployee } from './EditEmployee';
import { DetailEmployee } from './DetailEmployee';

const index = () => {
  const [state, setState] = useState([]);
  const [pagination, setPagination] = useState({ offset: 0, max: 10 });
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState(10);
  useEffect(() => {
    getData(pagination);
  }, [pagination]);
  const getData = async (params: any) => {
    setLoading(true);
    await axios
      .get('http://114.119.182.183:8080/ClaimRest/employee/list', {
        params,
      })
      .then((res) => {
        console.log(res, 'rest===>');
        setLength(res?.data?.length);
        setState(res?.data?.results);
        // console.log('data====>',res);
      });

    setLoading(false);
  };
  //   console.log(length, 'length==>');

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: 5,
    },
    {
      title: 'Number ID',
      dataIndex: 'employeeNumber',
      key: 'employeeNumber',
      width: 100,
    },
    {
      title: 'Name English',
      dataIndex: 'nameEn',
      key: 'nameEn',
      width: 100,
    },
    {
      title: 'Name Khmer',
      dataIndex: 'nameKh',
      key: 'nameKh',
      width: 100,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 10,
    },
    {
      title: 'Work Email',
      dataIndex: 'workEmail1',
      key: 'workEmail1',
      width: 50,
    },
    {
      title: 'Address',
      dataIndex: 'addressEn',
      key: 'addressEn',
      width: 200,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      width: 200,
      render: (id: any, record: any) => (
        <div className="flex flex-row w-6 space-x-3 shadow-sm">
          <div>
            <EditEmployee
              id={id}
              record={record}
              getList={() => getData(pagination)}
            />
          </div>
          <div>
            <DetailEmployee id={id} record={record} />
          </div>
          <div>
            <Popconfirm
              title="Do you want to delete this record?"
              onConfirm={() => handleDelete(id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];
  const handleDelete = (id: any) => {
    axios
      .put('http://114.119.182.183:8080/ClaimRest/employee/' + id, {
        status: false,
      })
      .then(() => {
        getData(pagination);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="w-auto px-16 mx-auto mt-16 space-y-5 shadow-sm ">
      <Card
        title={
          <div>
            <h1 className="text-2xl font-bold text-center hover:text-yellow-400">
              Employee List Data
            </h1>
          </div>
        }
        style={{ backgroundColor: 'white' }}
      >
        <div className="pb-10 ">
          <AddEmployee getList={() => getData(pagination)} />
        </div>
        <Table
          columns={columns}
          loading={loading}
          bordered
          dataSource={state}
          pagination={false}
        />
        <div className="flex justify-end pt-8">
          <Pagination
            defaultCurrent={1}
            total={length}
            onChange={(offset: any, max: any) =>
              setPagination({ offset: offset - 1, max })
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default index;
