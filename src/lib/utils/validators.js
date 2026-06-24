export const registerNumberRegex =
	/^[0-9]{2}[A-Z]{3}[0-9]{3}$/;

export const emailRegex =
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const phoneRegex =
	/^[6-9]\d{9}$/;

export const passwordRegex =
	/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;