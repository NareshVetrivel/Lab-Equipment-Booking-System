/**
 * Upload Equipment Image to Firebase Storage
 * @param {string} imageBase64
 * @param {string} equipmentName
 * @returns {Promise<
 * | { success: true; imageURL: string }
 * | { success: false; message: string }
 * >}
 */

import { storage } from '$lib/firebase/firebase';

import {
	ref,
	uploadString,
	getDownloadURL
} from 'firebase/storage';

/**
 * Upload Equipment Image to Firebase Storage
 * @param {string} imageBase64
 * @param {string} equipmentName
 */
export async function uploadEquipmentImage(
	imageBase64,
	equipmentName
) {
	try {

		const fileName =
			`${Date.now()}-${equipmentName.replace(/\s+/g, '-')}`;

		const storageRef = ref(
			storage,
			`equipments/${fileName}`
		);

		await uploadString(
			storageRef,
			imageBase64,
			'data_url'
		);

		const imageURL =
			await getDownloadURL(storageRef);

		return {
			success: true,
			imageURL
		};

	}
catch (error) {

	return {
		success: false,
		message:
			error instanceof Error
				? error.message
				: 'Something went wrong.'
	};

}
}