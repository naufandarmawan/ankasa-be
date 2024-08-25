const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new ticket
const createTicket = async (payload) => {
  const parseDateTime = (date, time) => {
    const [day, month, year] = date.split("/");
    const [hours, minutes] = time.split(":");
    return new Date(year, month - 1, day, hours, minutes).toISOString();
  };

  const calculateFlightDuration = (departureDateTime, arrivalDateTime) => {
    const departure = new Date(departureDateTime);
    const arrival = new Date(arrivalDateTime);
    const durationMs = arrival - departure;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours, ${minutes} minutes`;
  };

  const departureDateTime = parseDateTime(
    payload.departure_date,
    payload.departure_time
  );
  const arrivalDateTime = parseDateTime(
    payload.departure_date,
    payload.arrival_time
  );

  const ticketData = {
    ...payload,
    departure_date: departureDateTime,
    departure_time: departureDateTime,
    arrival_time: arrivalDateTime,
    flight_duration: calculateFlightDuration(
      departureDateTime,
      arrivalDateTime
    ),
  };

  const result = await prisma.ticket.create({
    data: ticketData,
    select: { id: true },
  });

  if (result.err) {
    return result;
  }

  return {
    err: null,
    data: {
      id: result.id,
      airlines: ticketData.airlines,
      departure_city: ticketData.departure_city,
      arrival_city: ticketData.arrival_city,
      departure_code: ticketData.departure_code,
      arrival_code: ticketData.arrival_code,
      departure_date: ticketData.departure_date,
      departure_time: ticketData.departure_time,
      arrival_time: ticketData.arrival_time,
      flight_duration: ticketData.flight_duration,
      class: ticketData.class,
      transit: ticketData.transit,
      luggage: ticketData.luggage,
      meal: ticketData.meal,
      wifi: ticketData.wifi,
      price: ticketData.price,
    },
  };
};

// Get all tickets
const getTickets = async (payload) => {
  const totalCount = await prisma.ticket.count();

  const result = await prisma.ticket.findMany({
    skip: (payload.page - 1) * payload.limit,
    take: payload.limit,
    orderBy: {
      [payload.sortBy]: payload.order,
    },
  });

  if (result.err) {
    return result;
  }

  const totalPages = Math.ceil(totalCount / payload.limit);

  return {
    err: null,
    data: {
      current_page: payload.page,
      page_size: payload.limit,
      total_pages: totalPages,
      total_count: totalCount,
      tickets: result,
    },
  };
};

// Get ticket by ID
const getTicketById = async (payload) => {
  const result = await prisma.ticket.findUnique({
    where: { id: payload.id },
  });

  if (result.err) {
    return result;
  }

  return {
    err: null,
    data: result,
  };
};

// Update a ticket
const updateTicket = async (payload) => {
  const checkTicket = await prisma.ticket.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!checkTicket) {
    return {
      err: {
        message: "Ticket not found",
      },
    };
  }

  const parseDateTime = (date, time) => {
    const [day, month, year] = date.split("/");
    const [hours, minutes] = time.split(":");
    return new Date(year, month - 1, day, hours, minutes).toISOString();
  };

  const calculateFlightDuration = (departureDateTime, arrivalDateTime) => {
    const departure = new Date(departureDateTime);
    const arrival = new Date(arrivalDateTime);
    const durationMs = arrival - departure;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours, ${minutes} minutes`;
  };

  const departureDateTime = parseDateTime(
    payload.departure_date,
    payload.departure_time
  );
  const arrivalDateTime = parseDateTime(
    payload.departure_date,
    payload.arrival_time
  );

  const ticketData = {
    ...payload,
    departure_date: departureDateTime,
    departure_time: departureDateTime,
    arrival_time: arrivalDateTime,
    flight_duration: calculateFlightDuration(
      departureDateTime,
      arrivalDateTime
    ),
  };

  const result = await prisma.ticket.update({
    where: { id: payload.id },
    data: ticketData,
  });

  if (result.err) {
    return result;
  }

  return {
    err: null,
    data: {
      id: ticketData.id,
      airlines: ticketData.airlines,
      departure_city: ticketData.departure_city,
      arrival_city: ticketData.arrival_city,
      departure_code: ticketData.departure_code,
      arrival_code: ticketData.arrival_code,
      departure_date: ticketData.departure_date,
      departure_time: ticketData.departure_time,
      arrival_time: ticketData.arrival_time,
      flight_duration: ticketData.flight_duration,
      class: ticketData.class,
      transit: ticketData.transit,
      luggage: ticketData.luggage,
      meal: ticketData.meal,
      wifi: ticketData.wifi,
      price: ticketData.price,
    },
  };
};

// Delete a ticket
const deleteTicket = async (payload) => {
  const checkTicket = await prisma.ticket.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!checkTicket) {
    return {
      err: {
        message: "Ticket not found",
      },
    };
  }

  const result = await prisma.ticket.delete({
    where: { id: payload.id },
  });

  if (result.err) {
    return result;
  }

  return {
    err: null,
    data: result,
  };


  try {
    const ticket = await prisma.ticket.delete({
      where: { id },
    });
    return { err: null, data: ticket };
  } catch (err) {
    return { err, data: null };
  }
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
