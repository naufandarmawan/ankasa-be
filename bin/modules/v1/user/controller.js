const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const createCustomer = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: data.email,
        password: hashedPassword,
        role: "Customer",
      },
    });

    const newCustomer = await prisma.customer.create({
      data: {
        id: uuidv4(),
        user_id: newUser.id,
        email: data.email,
        full_name: data.full_name,
        city: data.city || "",
        address: data.address || "",
        postal_code: data.postal_code || "",
        phone: data.phone || "",
        photo: data.photo || "",
      },
    });

    return { err: null, data: { user: newUser, customer: newCustomer } };
  } catch (error) {
    console.error("Error creating customer:", error);
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

const deleteCustomer = async (customerId) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { user: true },
    });

    if (!customer) {
      return { err: { message: "Customer not found", code: 404 }, data: null };
    }

    await prisma.$transaction([
      prisma.customer.delete({ where: { id: customerId } }),
      prisma.user.delete({ where: { id: customer.user.id } }),
    ]);

    return { err: null, data: { message: "Customer deleted successfully" } };
  } catch (error) {
    console.error("Error deleting customer:", error);
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

const readCustomer = async (customerId) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { user: { select: { email: true, role: true } } },
    });

    if (!customer) {
      return { err: { message: "Customer not found", code: 404 }, data: null };
    }

    return { err: null, data: customer };
  } catch (error) {
    console.error("Error reading customer:", error);
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

const updateCustomer = async (customerId, data) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { user: true },
    });

    if (!customer) {
      return { err: { message: "Customer not found", code: 404 }, data: null };
    }

    const updatedCustomer = await prisma.$transaction(async (prisma) => {
      const updatedCustomer = await prisma.customer.update({
        where: { id: customerId },
        data: {
          full_name: data.full_name,
          city: data.city,
          address: data.address,
          postal_code: data.postal_code,
          phone: data.phone,
          photo: data.photo,
        },
      });

      if (data.email) {
        await prisma.user.update({
          where: { id: customer.user.id },
          data: { email: data.email },
        });
      }

      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await prisma.user.update({
          where: { id: customer.user.id },
          data: { password: hashedPassword },
        });
      }

      return updatedCustomer;
    });

    return { err: null, data: updatedCustomer };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

const getCustomerProfileByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Customer: true },
    });

    if (!user || !user.customer) {
      return { err: { message: "Customer not found", code: 404 }, data: null };
    }

    const { password, ...userWithoutPassword } = user;
    const profile = {
      ...userWithoutPassword,
      ...user.customer,
    };

    return { err: null, data: profile };
  } catch (error) {
    console.error("Error getting customer profile:", error);
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

const getAllCustomers = async () => {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        user_id: true,
        email: true,
        full_name: true,
        address: true,
        city: true,
        postal_code: true,
        phone: true,
        photo: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    const formattedCustomers = customers.map((customer) => ({
      ...customer,
      email: customer.user.email,
      user: undefined,
    }));

    return { err: null, data: formattedCustomers };
  } catch (error) {
    console.error("Error getting all customers:", error);
    return { err: { message: error.message, code: 500 }, data: null };
  }
};

module.exports = {
  createCustomer,
  readCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomerProfileByEmail,
  getAllCustomers,
};
