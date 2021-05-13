import { Button, Card, Pagination, Popconfirm, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AddNew } from './AddNew';
import { EditTeam } from './EditTeam';

const index = () => {
  const [state, setState] = useState([]);
  const [pagination, setPagination] = useState({ offset: 0, max: 10 });
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState(10);
  useEffect(() => {
    getListData(pagination);
  }, [pagination]);
  const getListData = async (params: any) => {
    // console.log('params==>', params);
    setLoading(true);
    axios
      .get('http://114.119.182.183:8080/ClaimRest/team/list', {
        params,
      })
      .then((res) => {
        setLength(res?.data?.length);
        setState(res?.data?.results);
        console.log(res, 'rest===>');
      });

    setLoading(false);
  };
  //   console.log('state==>', state);
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: 5,
    },
    {
      title: 'Team Name English',
      dataIndex: 'teamNameEn',
      key: 'teamNameEn',
      width: 100,
    },
    {
      title: 'Team Name Khmer',
      dataIndex: 'teamNameKh',
      key: 'teamNameKh',
      width: 100,
    },
    {
      title: 'Company',
      dataIndex: ['company', 'companyNameEn'],
      key: 'companyNameEn',
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
            <EditTeam
              id={id}
              record={record}
              getList={() => getListData(pagination)}
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
  console.log('data=======>', setState);
  const handleDelete = (id: any) => {
    axios
      .put('http://114.119.182.183:8080/ClaimRest/team/' + id, {
        status: false,
      })
      .then(() => {
        getListData(pagination);
      })
      .catch(() => setLoading(false));
  };
  return (
    <div className="w-auto px-16 mx-auto mt-16 space-y-5 shadow-sm ">
      <div>
        <AddNew getList={() => getListData(pagination)} />
      </div>

      <Table
        columns={columns}
        loading={loading}
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
