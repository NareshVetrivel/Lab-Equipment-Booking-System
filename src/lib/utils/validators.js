export const admissionNumberRegex =
	/^[A-Za-z0-9]{6,20}$/;

export const emailRegex =
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const phoneRegex =
	/^[6-9]\d{9}$/;

export const passwordRegex =
	/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;