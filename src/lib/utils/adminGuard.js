import { auth, db } from '$lib/firebase/firebase';

import { onAuthStateChanged, signOut } from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';

import { goto } from '$app/navigation';

import { resolve } from '$app/paths';

/**
 * Protect Admin Pages
 */
export function protectAdminRoute() {

	onAuthStateChanged(auth, async (user) => {

		console.log('Current User :', user);

		if (!user) {

			console.log('No User');

			goto(resolve('/admin-login'));

			return;

		}

		console.log('UID :', user.uid);

		const adminDoc = await getDoc(
			doc(db, 'admins', user.uid)
		);

		console.log('Document Exists :', adminDoc.exists());

		console.log('Document Data :', adminDoc.data());

		if (!adminDoc.exists()) {

			await signOut(auth);

			goto(resolve('/admin-login'));

			return;

		}

	});

}