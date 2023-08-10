type FormField = {
	type: string;
	required: boolean;
	options: string[];
	readonly: boolean;
	value: string;
	disabled: boolean;
};
type FormFields = {
	'Personal Information': {
		Name: FormField;
		Nationality: FormField;
		'Date of bath': FormField;
		Email: FormField;
		'Phone Number': FormField;
		Address: FormField;
		Gender: FormField;
	};

	'Professional Experience': {
		'Education Level': FormField;
		Qualification: FormField;
		'Present position': FormField;
		'Date Filled': FormField;
	};
};

export type TETIApplicationForm = {
	title: string;
	price: number;
	fields: FormFields;
};
