const express = require('express');

const router = express.Router();

const { auth, db } = require('./firebase-admin');

router.post('/reset-password', async (req, res) => {
	try {
		const { email, dob, newPassword } = req.body;

		if (!email || !dob || !newPassword) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required.'
			});
		}

		const snapshot = await db
			.collection('students')
			.where('email', '==', email)
			.where('dob', '==', dob)
			.get();

		if (snapshot.empty) {
			return res.status(404).json({
				success: false,
				message: 'College Email ID and Date of Birth do not match.'
			});
		}

		const student = snapshot.docs[0].data();

		await auth.updateUser(student.uid, {
			password: newPassword
		});

		return res.json({
			success: true,
			message: 'Password updated successfully.'
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			success: false,
			message: 'Internal server error.'
		});
	}
});

module.exports = router;