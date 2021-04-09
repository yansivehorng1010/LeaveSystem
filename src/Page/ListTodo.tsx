import React from 'react';

export const ListTodo = () => {
  return (
    <div className="m-8 ">
      <table className="m-8 text-center border-2 shadow-2xl table-auto mr-400">
        <thead>
          <tr className="bg-blue-300">
            <th className="px-10 py-4 border border-black border-gray-400">
              ID
            </th>
            <th className="px-10 py-4 border border-black border-gray-400">
              Text
            </th>
            <th className="px-10 py-4 border border-black border-gray-400">
              Done
            </th>
            <th className="px-10 py-4 border border-black border-gray-400">
              Action
            </th>
          </tr>
        </thead>
        {/* {data.todosRes.data.map((d, i) => ( */}
        <tbody>
          <tr>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="flex px-4 py-2 space-x-8 border">
              <button
                //   onClick={(e) => handleDone(d)}
                className="px-4 py-2 font-bold text-white bg-green-400 rounded"
              >
                Done
              </button>
              <button
                //   onClick={() =>
                //     // deleteTodo({ variables: { ...obj, id: d.id } })
                //   }
                className="px-4 py-2 font-bold text-white bg-red-500 rounded"
              >
                Delete
              </button>
              <button
                //   onClick={(e) => handleEdit(d)}
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
        {/* ))} */}

        <div className="px-4 py-2 space-x-64 ">
          <div className="float-left">
            {/* <p>Total:{data.todosRes.metadata.total}</p> */}
          </div>
          <div className="float-right">{/* <p>page:{currentPage}</p> */}</div>
        </div>
      </table>
      <br />
      <br />
    </div>
  );
};
