import React, { useContext, useEffect, useState } from 'react';

import { Col, Row, Typography, List, Card, Tag, Divider } from 'antd';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';


const { Title, Text } = Typography;


// const tickets = [
//     {
//         ticketNo: 33,
//         desktop: 3,
//         attended: 'Fernando Herrera'
//     },
//     {
//         ticketNo: 34,
//         desktop: 4,
//         attended: 'Melissa Flores'
//     },
//     {
//         ticketNo: 35,
//         desktop: 5,
//         attended: 'Carlos Castro'
//     },
//     {
//         ticketNo: 36,
//         desktop: 3,
//         attended: 'Fernando Herrera'
//     },
//     {
//         ticketNo: 37,
//         desktop: 3,
//         attended: 'Fernando Herrera'
//     },
//     {
//         ticketNo: 38,
//         desktop: 2,
//         attended: 'Melissa Flores'
//     },
//     {
//         ticketNo: 39,
//         desktop: 5,
//         attended: 'Carlos Castro'
//     },
// ];

export const Cola = () => {

    useHideMenu(true);

    const { socket } = useContext(SocketContext);
    const [tickets, setTickets] = useState([])


    useEffect(() => {
        socket.on('ticket-asignado', (asignados) => {
            setTickets(asignados);
        })

        return () => {
            socket.off('ticket-asignado');
        }
    }, [socket])

    useEffect(() => {
        getUltimos().then(setTickets);
    }, [])

    return (
        <>
            <Title level={1}>Atendiendo al cliente</Title>
            <Row>
                <Col span={12}>
                    <List
                        dataSource={tickets.slice(0, 3)}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    style={{ width: 300, marginTop: 16 }}
                                    actions={[
                                        <Tag color="volcano"> {item.attended} </Tag>,
                                        <Tag color="magenta"> Escritorio: {item.desktop} </Tag>,
                                    ]}
                                >
                                    <Title> No. {item.number}</Title>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>


                <Col span={12}>

                    <Divider> Historial </Divider>
                    <List
                        dataSource={tickets.slice(3)}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`Ticket No. ${item.number}`}
                                    description={
                                        <>
                                            <Text type="secondary">En el Escritorio: </Text>
                                            <Tag color="magenta"> {item.desktop} </Tag>
                                            <Text type="secondary"> Agente: </Text>
                                            <Tag color="volcano"> {item.attended} </Tag>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}

                    />

                </Col>
            </Row>

        </>
    )
}
