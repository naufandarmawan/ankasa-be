const joi = require("joi");

const createTicket = joi.object({
  airlines: joi.string().required().min(3).max(30),
  departure_city: joi.string().required().min(3).max(30),
  arrival_city: joi.string().required().min(3).max(30),
  departure_code: joi.string().required().length(3).uppercase(),
  arrival_code: joi.string().required().length(3).uppercase(),
  departure_date: joi.string().required().regex(/^\d{2}\/\d{2}\/\d{4}$/),
  departure_time: joi.string().required().regex(/^\d{2}:\d{2}$/),
  arrival_time: joi.string().required().regex(/^\d{2}:\d{2}$/),
  class: joi.string().required().valid('ECONOMY', 'BUSINESS', 'FIRST_CLASS'),
  transit: joi.string().required(),
  luggage: joi.boolean().required(),
  meal: joi.boolean().required(),
  wifi: joi.boolean().required(),
  price: joi.number().required()
});

const getTickets = joi.object({
  // Pagination and sorting
  limit: joi.number().optional().default(10),
  page: joi.number().optional().default(1),
  sortBy: joi.string().optional().valid('price', 'departure_time', 'created_at', 'updated_at').default('created_at'),
  order: joi.string().optional().valid('asc', 'desc').default('desc'),
  
  // Filters
  transit: joi.string().optional().valid('direct', 'transit', 'transit2+'),
  facilities: joi.object({
    luggage: joi.boolean().optional(),
    meal: joi.boolean().optional(),
    wifi: joi.boolean().optional()
  }).optional(),
  departure_time_range: joi.string().optional().valid(
    '00:00-06:00',
    '06:00-12:00',
    '12:00-18:00',
    '18:00-24:00'
  ),
  arrival_time_range: joi.string().optional().valid(
    '00:00-06:00',
    '06:00-12:00',
    '12:00-18:00',
    '18:00-24:00'
  ),
  airlines: joi.array().items(joi.string()).optional(),
  price_range: joi.object({
    min: joi.number().optional(),
    max: joi.number().optional()
  }).optional(),
  
  // Flight route
  departure_city: joi.string().optional(),
  arrival_city: joi.string().optional(),
  departure_date: joi.date().optional()
});

const getTicketById = joi.object({
  id: joi.required()
});

const updateTicket = joi.object({
  id: joi.required(),
  airlines: joi.string().optional().min(3).max(30),
  departure_city: joi.string().optional().min(3).max(30),
  arrival_city: joi.string().optional().min(3).max(30),
  departure_code: joi.string().optional().length(3).uppercase(),
  arrival_code: joi.string().optional().length(3).uppercase(),
  departure_date: joi.string().optional().regex(/^\d{2}\/\d{2}\/\d{4}$/),
  departure_time: joi.string().optional().regex(/^\d{2}:\d{2}$/),
  arrival_time: joi.string().optional().regex(/^\d{2}:\d{2}$/),
  class: joi.string().optional().valid('ECONOMY', 'BUSINESS', 'FIRST_CLASS'),
  transit: joi.string().optional(),
  luggage: joi.boolean().optional(),
  meal: joi.boolean().optional(),
  wifi: joi.boolean().optional(),
  price: joi.number().optional()
});

const deleteTicket = joi.object({
  id: joi.required()
});

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
