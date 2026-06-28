import { auth, db } from '$lib/firebase/firebase';
import { FirebaseError } from 'firebase/app';

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	updatePassword
} from 'firebase/auth';

import {
	doc,
	setDoc,
	updateDoc,
	getDoc,
	serverTimestamp,
	collection,
	query,
	where,
	getDocs
} from 'firebase/firestore';

/**
 * Student Signup
 * @param {string} email
 * @param {string} password
 */
export async function registerStudent(email, password) {
	try {
		const credential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		const user = credential.user;

await setDoc(doc(db, 'students', user.uid), {
	uid: user.uid,
	email: user.email,
	role: 'student',

	profileCompleted: false,

	createdAt: serverTimestamp()
});

		return {
			success: true,
			user
		};
	} catch (error) {
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

/**
 * Student Login
 * @param {string} email
 * @param {string} password
 */
export async function loginStudent(email, password) {
	try {
		const credential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);

		const studentDoc = await getDoc(
			doc(db, 'students', credential.user.uid)
		);

return {
	success: true,
	user: credential.user,
	profile: studentDoc.exists() ? studentDoc.data() : null
};
	} catch (error) {
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

/**
 * Forgot Password
 * @param {string} email
 */
export async function forgotPassword(email) {
	try {
		await sendPasswordResetEmail(auth, email);

		return {
			success: true
		};
	} catch (error) {
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

/**
 * Logout
 */
export async function logout() {
	await signOut(auth);
}

/**
 * Verify Student using Email & DOB
 * @param {string} email
 * @param {string} dob
 */
export async function verifyStudent(email, dob) {
	try {
		const studentQuery = query(
			collection(db, 'students'),
			where('email', '==', email),
			where('dob', '==', dob)
		);

		const snapshot = await getDocs(studentQuery);

		if (snapshot.empty) {
			return {
				success: false,
				message: 'Invalid email or date of birth.'
			};
		}

		return {
			success: true
		};

	} catch (error) {

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

/**
 * Update Student Profile
 * @param {string} uid
 * @param {{
 * studentName: string,
 * admissionNumber: string,
 * department: string,
 * year: string,
 * academicYear: string,
 * dob: string,
 * gender: string,
 * phoneNumber: string,
 * photoURL: string
 * }} profile
 */
export async function updateStudentProfile(uid, profile) {
	try {
const studentQuery = query(
	collection(db, 'students'),
	where('admissionNumber', '==', profile.admissionNumber)
);
const studentSnapshot = await getDocs(studentQuery);

if (!studentSnapshot.empty) {
	const existingStudent = studentSnapshot.docs[0];

	if (existingStudent.id !== uid) {
		return {
			success: false,
			message: 'Admission number already exists.'
		};
	}
}
await updateDoc(doc(db, 'students', uid), {
	studentName: profile.studentName,

	admissionNumber: profile.admissionNumber,

	department: profile.department,

	year: profile.year,

	academicYear: profile.academicYear,

	dob: profile.dob,

	gender: profile.gender,

	phoneNumber: profile.phoneNumber,

	photoURL: profile.photoURL,

	profileCompleted: true,

	updatedAt: serverTimestamp()
});

		return {
			success: true
		};
	} catch (error) {
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

/**
 * Change Password
 * @param {string} password
 */
export async function resetStudentPassword(password) {
	try {

		if (!auth.currentUser) {
			return {
				success: false,
				message: 'User not logged in.'
			};
		}

		await updatePassword(auth.currentUser, password);

		return {
			success: true
		};

	} catch (error) {

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