import { formatDate, Pickem, WithCreated } from "./pickem";

export class CSVFile {
  headers: string[];
  lines: string[];

  private constructor(headers: string[], lines: string[]) {
    this.headers = headers;
    this.lines = lines;
  }

  static fromPickems(pickems: WithCreated<Pickem>[]): CSVFile {
    const headers: string[] = ["group", "name", "created", "a_winner", "a_runner", "a_finals", "b_winner", "b_runner", "b_finals", "total_winner"];
    const lines: string[] = pickems.map((v) => `${v.user_group},${v.user_name},${formatDate(v.created)},${v.a_winner},${v.a_runner},${v.a_finals},${v.b_winner},${v.b_runner},${v.b_finals},${v.total_winner}`);

    return new CSVFile(headers, lines);
  }

  toFileString(): string {
    return this.headers.join(",").concat("\n", this.lines.join("\n"));
  }

  toBlob(): Blob {
    return new Blob([this.toFileString()]);
  }
}
