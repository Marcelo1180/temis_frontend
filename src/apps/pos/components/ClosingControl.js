import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Divider,
  message,
  Statistic,
  Descriptions,
  Table,
  Text,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";

const ClosingControl = () => {
  const [isModalClosingControlVisible, setIsModalClosingControlVisible] =
    useState(false);
  const okModalClosingControl = () => {
    setIsModalClosingControlVisible(false);
  };
  const cancelModalClosingControl = () => {
    setIsModalClosingControlVisible(false);
  };
  const columns = [
    {
      title: "Metodo de Pago",
      dataIndex: "payment_method",
    },
    {
      title: "Cant. de ventas",
      dataIndex: "sales",
      key: "address",
    },
    {
      title: "Total (Bs.)",
      dataIndex: "total",
      key: "age",
    },
  ];
  const data = [
    {
      key: "1",
      payment_method: "Efectivo",
      sales: 32,
      total: 2100,
    },
    {
      key: "2",
      payment_method: "Tarjeta",
      sales: 42,
      total: 3100,
    },
    {
      key: "3",
      payment_method: "Pagos QR",
      sales: 13,
      total: 1300,
    },
  ];

  return (
    <div>
      <Button
        shape="round"
        onClick={() => setIsModalClosingControlVisible(true)}
      >
        Cierre de Turno
      </Button>
      <Modal
        visible={isModalClosingControlVisible}
        title="Cierre de Turno"
        onOk={okModalClosingControl}
        onCancel={cancelModalClosingControl}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            onClick={okModalClosingControl}
          >
            Agregar
          </Button>,
        ]}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Statistic
              title="Total vendido"
              value={93}
              prefix={<DollarOutlined />}
              suffix=" Bs."
            />
          </Col>
          <Col span={12}>
            <Statistic title="Fecha" value="Marzo 3, 2021" />
          </Col>
          <Col span={12}>
            <Statistic title="Ventas del dia" value="21" />
          </Col>
        </Row>
        <Divider />
        <Table pagination={false} columns={columns} dataSource={data} />
      </Modal>
    </div>
  );
};

export default ClosingControl;
