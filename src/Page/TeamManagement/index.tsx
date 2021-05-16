import React, { useEffect, useState } from 'react';
import { Button, Card, Pagination, Popconfirm, Table } from 'antd';
import axios from 'axios';
import { EditTeamManagement } from './EditTeamManagement';
import { AddManagement } from './AddManagement';
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
      .get('http://114.119.182.183:8080/ClaimRest/team-management/list', {
        params,
      })
      .then((res) => {
        console.log(res, 'rest===>');
        setLength(res?.data?.length);
        setState(res?.data?.results);
        // console.log('data====>', );
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
      title: 'Team',
      dataIndex: ['team', 'teamNameEn'],
      key: 'teamNameEn',
      width: 100,
    },
    {
      title: 'Company',
      dataIndex: ['team', 'company', 'companyNameEn'],
      key: 'companyNameEn',
      width: 100,
    },
    {
      title: 'Supervisor',
      dataIndex: ['supervisor', 'nameEn'],
      key: 'nameEn',
      width: 100,
    },
    {
      title: 'Head',
      dataIndex: ['head', 'nameEn'],
      key: 'nameEn',
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
            <EditTeamManagement
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
      .put('http://114.119.182.183:8080/ClaimRest/team-management/' + id, {
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
              Team Management List Data
            </h1>
          </div>
        }
        style={{ backgroundColor: 'white' }}
      >
        <div className="pb-10">
          <AddManagement getList={() => getData(pagination)} />
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
