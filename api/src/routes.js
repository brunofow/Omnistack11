const routes = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.get('/ongs', OngController.index);
routes.get('/incidents', celebrate({
	[Segments.QUERY]: Joi.object().keys({
		page: Joi.number()
	})
}), IncidentController.index);

routes.get('/profile', celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required()
	}).unknown()
}), ProfileController.index);

routes.post('/sessions', celebrate({
	[Segments.BODY]: Joi.object({
		id: Joi.string().required()
	})
}), SessionController.store);

routes.post('/ongs', celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		whatsapp: Joi.string().required().min(10).max(11),
		city: Joi.string().required(),
		uf: Joi.string().required().length(2)
	})
}), OngController.store);

routes.post('/incidents', celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required()
	}).unknown(),
	[Segments.BODY]: Joi.object().keys({
		title: Joi.string().required().min(3),
		description: Joi.string().required().min(10),
		value: Joi.number().required()
	})
}),IncidentController.store);


routes.delete('/incidents/:id', celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required()
	})
}), IncidentController.delete);

module.exports = routes;  