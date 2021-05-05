import React, { useEffect, useState } from 'react';
import { Button, Pagination, Popconfirm, Table } from 'antd';
import axios from 'axios';
import { AddNew } from './AddNew';
import { Update } from './Update';
export const Company = () => {
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
      .get('http://114.119.182.183:8080/ClaimRest/company/list', {
        params,
      })
      .then((res) => {
        console.log(res, 'rest===>');
        setLength(res?.data?.length);
        setState(
          res?.data?.results?.map((row: any) => ({
            key: row.key,
            id: row.id,
            companyNameEn: row.companyNameEn,
            companyNameKh: row.companyNameKh,
          }))
        );
      });

    setLoading(false);
  };
  console.log(length, 'length==>');

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: 5,
    },
    {
      title: 'Name English',
      dataIndex: 'companyNameEn',
      key: 'companyNameEn',
      width: 100,
    },
    {
      title: 'Name Khmer',
      dataIndex: 'companyNameKh',
      key: 'companyNameKh',
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
            <Update
              id={id}
              record={record}
              getList={() => getData(pagination)}
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
      .put('http://114.119.182.183:8080/ClaimRest/company/' + id, {
        status: false,
      })
      .then(() => {
        getData(pagination);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="w-auto px-16 mx-auto mt-16 space-y-5 shadow-sm ">
      <div className="flex justify-between">
        <div>
          <AddNew getList={() => getData(pagination)} />
        </div>
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
