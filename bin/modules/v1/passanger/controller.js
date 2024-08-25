const prisma = require("../../../../prisma/prismaClient");

const createPassenger = async (data) => {
  try {
    const passenger = await prisma.passenger.create({
      data,
    });
    return { err: null, data: passenger };
  } catch (error) {
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

const getAllPassengers = async () => {
  try {
    const passengers = await prisma.passenger.findMany();
    return { err: null, data: passengers };
  } catch (error) {
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

const getPassengerById = async (id) => {
  try {
    const passenger = await prisma.passenger.findUnique({
      where: { id },
    });
    if (!passenger) {
      return { err: { message: "Passenger not found", code: 404 }, data: null };
    }
    return { err: null, data: passenger };
  } catch (error) {
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

const updatePassenger = async (id, data) => {
  try {
    const passenger = await prisma.passenger.update({
      where: { id },
      data,
    });
    return { err: null, data: passenger };
  } catch (error) {
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

const deletePassenger = async (id) => {
  try {
    await prisma.passenger.delete({
      where: { id },
    });
    return { err: null, data: null };
  } catch (error) {
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

module.exports = {
  createPassenger,
  getAllPassengers,
  getPassengerById,
  updatePassenger,
  deletePassenger,
};
