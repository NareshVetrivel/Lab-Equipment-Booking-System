import { auth, db } from '$lib/firebase/firebase';

import { onAuthStateChanged, signOut } from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';

import { goto } from '$app/navigation';

import { resolve } from '$app/paths';

/**
 * Protect Student Pages
 */
export function protectRoute() {

	onAuthStateChanged(auth, async (user) => {

		if (!user) {

			goto(resolve('/student-login'));

			return;

		}

		const studentDoc = await getDoc(

			doc(db, 'students', user.uid)

		);

		if (!studentDoc.exists()) {

			await signOut(auth);

			goto(resolve('/student-login'));

			return;

		}

	});

}