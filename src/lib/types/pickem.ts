export type Pickem = {
	user_name: string;
	user_group: string;
	a_winner: string;
	a_runner: string;
	b_winner: string;
	b_runner: string;
	first_finals: string;
	second_finals: string;
	total_winner: string;
};

export type WithID<T> = T & { id: string };

export type WithCreated<T> = T & { created: string };

export function formatDate(created: string): string {
	const d = new Date(created);
	return d.toLocaleString("de-ch").replaceAll(", ", " ");
}
