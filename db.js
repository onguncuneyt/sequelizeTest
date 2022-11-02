const models = require('./models');
models.sequelize
	.sync({ alter: true }) //degisiklik icin true yap
	.then((result) => {
		console.log('DB Connected');
	})
	.catch((err) => {
		console.log(err);
	});
