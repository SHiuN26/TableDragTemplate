import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import ReactDragListView from "react-drag-listview";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => e.stopPropagation()}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const Demo = () => {
  const [columns, setColumns] = useState([
    {
      title: <span className="dragHandler">Key</span>,
      dataIndex: "key",
      render: (text) => <span>{text}</span>,
      width: 50
    },
    {
      title: <span className="dragHandler">Name</span>,
      dataIndex: "name",
      width: 200
    },
    {
      title: <span className="dragHandler">Gender</span>,
      dataIndex: "gender",
      width: 100
    },
    {
      title: <span className="dragHandler">Age</span>,
      dataIndex: "age",
      width: 100
    },
    {
      title: <span className="dragHandler">Address</span>,
      dataIndex: "address"
    }
  ]);

  const data = [
    {
      key: "1",
      name: "Boran",
      gender: "male",
      age: "12",
      address: "New York"
    },
    {
      key: "2",
      name: "JayChou",
      gender: "male",
      age: "38",
      address: "TaiWan"
    },
    {
      key: "3",
      name: "Lee",
      gender: "female",
      age: "22",
      address: "BeiJing"
    },
    {
      key: "4",
      name: "ChouTan",
      gender: "male",
      age: "31",
      address: "HangZhou"
    },
    {
      key: "5",
      name: "AiTing",
      gender: "female",
      age: "22",
      address: "Xi’An"
    }
  ];

  const dragProps = {
    onDragEnd: (fromIndex, toIndex) => {
      const newColumns = [...columns];
      const item = newColumns.splice(fromIndex, 1)[0];
      newColumns.splice(toIndex, 0, item);
      setColumns(newColumns);
    },
    nodeSelector: "th",
    handleSelector: ".dragHandler",
    ignoreSelector: "react-resizable-handle"
  };

  const handleResize = (index) => (e, { size }) => {
    setColumns((prevColumns) => {
      const nextColumns = [...prevColumns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return nextColumns;
    });
  };

  const adjustedColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index)
    })
  }));

  return (
    <ReactDragListView.DragColumn {...dragProps}>
      <Table
        bordered
        components={{ header: { cell: ResizableTitle } }}
        columns={adjustedColumns}
        dataSource={data}
      />
    </ReactDragListView.DragColumn>
  );
};

ReactDOM.render(<Demo />, document.getElementById("container"));
