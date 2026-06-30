import { db } from '$lib/firebase/firebase';
import { FirebaseError } from 'firebase/app';

import {
	addDoc,
	collection,
	getDocs,
	query,
	where,
	serverTimestamp,
	doc,
	getDoc
} from 'firebase/firestore';

/**
 * @param {{
 * studentId: string,
 * studentName: string,
 * studentEmail: string,
 * equipmentId: string,
 * equipmentName: string,
 * department: string,
 * image: string,
 * returnWithinDays: number
 * }} booking
 */

export async function createBooking(booking) {

	try {
const duplicateBookingQuery = query(
	collection(db, 'bookings'),
	where('studentId', '==', booking.studentId),
	where('equipmentId', '==', booking.equipmentId)
);

const snapshot = await getDocs(
	duplicateBookingQuery
);

const studentDocument = await getDoc(
	doc(db, 'students', booking.studentId)
);

if (!studentDocument.exists()) {
	return {
		success: false,
		message: 'Student profile not found.'
	};
}

const student = studentDocument.data();

const alreadyBooked = snapshot.docs.some((document) => {

	const data = document.data();

	return (
		data.status === 'Pending' ||
		data.status === 'Approved'
	);

});

if (alreadyBooked) {

	return {

		success: false,

		message:
			'You have already requested this equipment.'

	};

}
		await addDoc(
			collection(db, 'bookings'),
			{

studentId: booking.studentId,

studentName: student.studentName,

studentEmail: student.email,

studentDepartment: student.department,

studentPhone: student.phoneNumber,

admissionNumber: student.admissionNumber,

equipmentId: booking.equipmentId,

equipmentName: booking.equipmentName,

department: booking.department,

equipmentDepartment: booking.department,

image: booking.image,

returnWithinDays: Number(
	booking.returnWithinDays
),

				status: 'Pending',

				bookedAt: serverTimestamp(),

				approvedAt: null,

				returnedAt: null,

				approvedBy: null,

				createdAt: serverTimestamp(),

				updatedAt: serverTimestamp()

			}
		);

		return {

			success: true

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