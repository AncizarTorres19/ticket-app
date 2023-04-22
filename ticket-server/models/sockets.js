const TicketList = require("./ticket-list");


class Sockets {

    constructor(io) {

        this.io = io;

        // Crear la instancia de nuestro ticketList
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            console.log('Cliente conectado', socket.id);

            socket.on('solicitar-ticket', (_, callBack) => {
                const newTicket = this.ticketList.createTicket();
                callBack(newTicket);
            });

            socket.on('siguiente-ticket-trabajar', ({ attended, desktop }, callBack) => {
                const yourTicket = this.ticketList.attendTicket(attended, desktop);
                callBack(yourTicket);

                this.io.emit('ticket-asignado', this.ticketList.last13);
            });


        });
    }


}


module.exports = Sockets;