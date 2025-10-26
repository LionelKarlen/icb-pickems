export type Pickem = {
  user_name: string,
  user_group: string,
  a_winner: string,
  a_runner: string,
  a_finals: string,
  b_winner: string,
  b_runner: string,
  b_finals: string,
  total_winner: string
}

export type WithID<T> = T & { id: string };
