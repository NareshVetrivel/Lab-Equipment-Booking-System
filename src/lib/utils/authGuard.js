import { auth } from '$lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

/**
 * Protect student pages
 */
export function protectRoute() {

	onAuthStateChanged(auth, (user) => {

		if (!user) {
			goto(resolve('/student-login'));
		}

	});

}