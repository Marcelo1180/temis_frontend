import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Divider,
  message,
  Statistic,
  Table,
  Input,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { apiPrivate } from "../../../core/apiCall";
import {
  FRONT_REDIRECT_UNAUTHORIZED,
  URL_CASH_CONTROL_TODAY,
  URL_SUMMARY_SALES_TODAY,
} from "../../../constants";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const ClosingControl = () => {
  const [isModalClosingControlVisible, setIsModalClosingControlVisible] =
    useState(false);
  const [observation, setObservation] = useState("");
  const navigate = useNavigate();

  const openModalClosingControl = () => {
    setIsModalClosingControlVisible(true);
    apiPrivate
      .get(URL_SUMMARY_SALES_TODAY)
      .then((res) => {
        setSalesSummary(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const okModalClosingControl = () => {
    apiPrivate
      .post(URL_CASH_CONTROL_TODAY, { observation })
      .then((res) => {
        setObservation("");
        setIsModalClosingControlVisible(false);
        message.success("Registro de cierre exitoso");
        navigate(FRONT_REDIRECT_UNAUTHORIZED)
      })
      .catch((err) => {
        message.error("Ocurrio un error al tratar de registrar el cierre");
      });
    setIsModalClosingControlVisible(false);
  };
  const cancelModalClosingControl = () => {
    setIsModalClosingControlVisible(false);
  };
  const [salesSummary, setSalesSummary] = useState({});

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

  return (
    <div>
      <Button shape="round" onClick={openModalClosingControl}>
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
            Cerrar Turno
          </Button>,
        ]}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Statistic
              title="Total vendido"
              value={salesSummary.total}
              prefix={<DollarOutlined />}
              suffix=" Bs."
            />
          </Col>
          <Col span={12}>
            <Statistic title="Fecha" value={salesSummary.date_format} />
          </Col>
          <Col span={12}>
            <Statistic title="Ventas del dia" value={salesSummary.sales} />
          </Col>
        </Row>
        <Divider />
        <Table
          pagination={false}
          columns={columns}
          dataSource={salesSummary.detail}
        />
        <Divider />
        <TextArea
          rows={4}
          placeholder="Observaciones"
          onChange={(e) => setObservation(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ClosingControl;
