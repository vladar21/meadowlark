const fortune = require('./fortune');

exports.home = (req, res) => res.render('home');
exports.sectionTest = (req, res) => res.render('section-test');
exports.about = (req, res) => res.render('about', { fortune: fortune.getFortune() });
exports.notFound = (req, res) => res.render('404');

// Express распознает обработчик ошибок по его четырем аргументам,
// поэтому нам нужно отключить правило no-unused-vars в ESLint.
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500');
/* eslint-enable no-unused-vars */

// **** these handlers are for browser-submitted forms
exports.newsletterSignup = (req, res) => {
	// we will learn about CSRF later...for now, we just
	// provide a dummy value
	res.render('newsletter-signup', { csrf: 'CSRF token goes here' });
};
exports.newsletterSignupProcess = (req, res) => {
	console.log('CSRF token (from hidden form field): ' + req.body._csrf);
	console.log('Name (from visible form field): ' + req.body.name);
	console.log('Email (from visible form field): ' + req.body.email);
	res.redirect(303, '/newsletter-signup/thank-you');
};
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you');
// **** end browser-submitted form handlers

exports.newsletter = (req, res) => {
	// Мы изучим CSRF позже... сейчас мы лишь
	// вводим фиктивное значение.
	res.render('newsletter', { csrf: 'Здесь находится токен CSRF' });
};
exports.api = {
	newsletterSignup: (req, res) => {
		console.log('Токен CSRF (из скрытого поля формы): ' + req.body._csrf);
		console.log('Имя (из видимого поля формы): ' + req.body.name);
		console.log('Email (из видимого поля формы): ' + req.body.email);
		res.send({ result: 'success' });
	}
};

exports.vacationPhotoContest = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() })
}
exports.vacationPhotoContestAjax = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() })
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log('field data: ', fields)
  console.log('files: ', files)
  res.redirect(303, '/contest/vacation-photo-thank-you')
}
exports.vacationPhotoContestProcessError = (req, res, fields, files) => {
  res.redirect(303, '/contest/vacation-photo-error')
}
exports.vacationPhotoContestProcessThankYou = (req, res) => {
  res.render('contest/vacation-photo-thank-you')
}
exports.api.vacationPhotoContest = (req, res, fields, files) => {
  console.log('field data: ', fields)
  console.log('files: ', files)
  res.send({ result: 'success' })
}
exports.api.vacationPhotoContestError = (req, res, message) => {
  res.send({ result: 'error', error: message })
}
