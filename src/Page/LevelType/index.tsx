import React, { useEffect, useState } from 'react';
import { Button, Pagination, Popconfirm, Table } from 'antd';
import axios from 'axios';
import { AddLevel } from './AddLevel';
import { EditLevel } from './EditLevel';

const index = () => {
  const [state, setState] = useState([]);
  const [pagination, setPagination] = useState({ offset: 0, max: 10 });
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState(10);
  useEffect(() => {
    getListLevel(pagination);
  }, [pagination]);
  const getListLevel = async (params: any) => {
    console.log('params==>', params);
    setLoading(true);
    await axios
      .get('http://114.119.182.183:8080/ClaimRest/permissionType/list', {
        params,
      })
      .then((res) => {
        setLength(res?.data?.length);
        setState(res?.data?.results);
        console.log(res, 'rest===>');
      });

    setLoading(false);
  };
  console.log('state==>', state);
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: 5,
    },
    {
      title: 'Permission Type',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Numbers of days',
      dataIndex: 'numberLeaveDay',
      key: 'numberLeaveDay',
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 100,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      width: 100,
      render: (id: any, record: any) => (
        <div className="flex flex-row w-6 space-x-3 shadow-sm">
          <div>
            <EditLevel
              id={id}
              record={record}
              getList={() => getListLevel(pagination)}
            />
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
      .put('http://114.119.182.183:8080/ClaimRest/permissionType/' + id, {
        status: false,
      })
      .then(() => {
        getListLevel(pagination);
      })
      .catch(() => setLoading(false));
  };
  return (
    <div className="w-auto px-16 mx-auto mt-16 space-y-5 shadow-sm ">
      <div>
        <AddLevel getList={() => getListLevel(pagination)} />
      </div>

      <Table
        columns={columns}
        // loading={loading}
        bordered
        dataSource={state}
        pagination={false}
      />
      <div className="flex justify-end pb-10">
        <Pagination
          defaultCurrent={1}
          total={length}
          onChange={(offset: any, max: any) =>
            setPagination({ offset: offset - 1, max })
          }
        />
      </div>
    </div>
  );
};

export default index;
