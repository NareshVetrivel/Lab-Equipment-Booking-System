import { auth, db } from '$lib/firebase/firebase';
import { FirebaseError } from 'firebase/app';

import {
	signInWithEmailAndPassword
} from 'firebase/auth';

import {
	doc,
	getDoc
} from 'firebase/firestore';

/**
 * Admin Login
 * @param {string} email
 * @param {string} password
 */
export async function loginAdmin(email, password) {

	try {

		const credential =
			await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

		const adminDoc = await getDoc(
			doc(db, 'admins', credential.user.uid)
		);

		if (!adminDoc.exists()) {

			return {
				success: false,
				message: 'Admin account not found.'
			};

		}

		const admin = adminDoc.data();

		if (admin.role !== 'admin') {

			return {
				success: false,
				message: 'Access denied.'
			};

		}

		return {

			success: true,

			user: credential.user,

			admin

		};

	}
	catch (error) {

		if (error instanceof FirebaseError) {

			return {

				success: false,

				message: error.message

			};

		}

		return {

			success: false,

			message: 'Something went wrong.'

		};

	}

}