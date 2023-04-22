const Ticket = require('./ticket');

class TicketList {
    constructor() {
        this.lastNumber = 0;
        this.pendingTickets = [];
        this.attendedTickets = [];
    }

    get nextNumber() {
        this.lastNumber++;
        return this.lastNumber;
    }

    // se veran 3 tickets en las tarjetas y 10 en el historial
    get last13() {
        console.log(this.attendedTickets.slice(0, 13));
        return this.attendedTickets.slice(0, 13);
    }

    createTicket() {
        const newTicket = new Ticket(this.nextNumber);
        this.pendingTickets.push(newTicket);
        return newTicket;
    }

    attendTicket(attended, desktop) {
        if (this.pendingTickets.length === 0) {
            return null;
        }

        const nextTicket = this.pendingTickets.shift();
        nextTicket.attended = attended;
        nextTicket.desktop = desktop;

        this.attendedTickets.unshift(nextTicket);

        // if (this.attendedTickets.length > 13) {
        //     this.attendedTickets.splice(-1, 1);
        // }

        return nextTicket;
    }

}

module.exports = TicketList;
