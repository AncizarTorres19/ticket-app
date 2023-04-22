import React, { useContext, useState } from 'react';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Redirect, useHistory } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

export const Escritorio = () => {

    useHideMenu(false);
    const [user] = useState(getUsuarioStorage());
    const { socket } = useContext(SocketContext);
    const [ticket, setTicket] = useState(null)
    const history = useHistory();

    const salir = () => {
        localStorage.clear();
        history.replace('/ingresar');
    }

    const siguienteTicket = () => {
        socket.emit('siguiente-ticket-trabajar', user, (ticket) => {
            setTicket(ticket);
        });
    }

    if (!user.attended || !user.desktop) {
        return <Redirect to="/ingresar" />
    }


    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={2}>{user.attended}</Title>
                    <Text>Usted está trabajando en el desktop: </Text>
                    <Text type="success"> {user.desktop} </Text>
                </Col>

                <Col span={4} align="right">
                    <Button
                        shape="round"
                        type="danger"
                        onClick={salir}
                    >
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>

            </Row>

            <Divider />

            {
                ticket && (
                    <Row>
                        <Col>
                            <Text>Está atendiendo el ticket número: </Text>
                            <Text
                                style={{ fontSize: 30 }}
                                type="danger"
                            >
                                {ticket.number}
                            </Text>
                        </Col>
                    </Row>
                )

            }
            {
                !ticket && (
                    <Row>
                        <Col offset={18} span={6} align="right">
                            <Text

                                style={{ fontSize: 30 }}
                            >
                                No hay tickets pendientes
                            </Text>
                        </Col>
                    </Row>
                )
            }



            <Row>
                <Col offset={18} span={6} align="right">
                    <Button
                        onClick={siguienteTicket}
                        shape="round"
                        type="primary"
                    >
                        <RightOutlined />
                        Siguiente
                    </Button>
                </Col>


            </Row>

        </>
    )
}
