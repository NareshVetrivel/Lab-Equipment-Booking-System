import { db } from '$lib/firebase/firebase';
import { FirebaseError } from 'firebase/app';

import {
	collection,
	addDoc,
	getDocs,
	query,
	where,
	serverTimestamp
} from 'firebase/firestore';

/**
 * Add Equipment
 * @param {{
 * name: string,
 * department: string,
 * total: string | number,
 * returnWithinDays: string | number,
 * description: string,
 * image: string
 * }} equipment
 */
export async function addEquipment(equipment) {
	try {
		// Duplicate Equipment Check
		const equipmentQuery = query(
			collection(db, 'equipments'),
			where('name', '==', equipment.name),
			where('department', '==', equipment.department)
		);

		const snapshot = await getDocs(equipmentQuery);

		if (!snapshot.empty) {
			return {
				success: false,
				message: 'Equipment already exists.'
			};
		}

		// Save Equipment
		await addDoc(collection(db, 'equipments'), {
			name: equipment.name.trim(),

			department: equipment.department,

total: Number(equipment.total),

available: Number(equipment.total),

returnWithinDays: Number(
	equipment.returnWithinDays
),

description: equipment.description.trim(),

image: equipment.image,

			status:
				Number(equipment.total) > 0
					? 'Available'
					: 'Out of Stock',

			createdAt: serverTimestamp(),

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