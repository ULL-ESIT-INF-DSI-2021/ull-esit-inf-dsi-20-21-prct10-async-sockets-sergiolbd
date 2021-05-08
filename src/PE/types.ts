export type RequestType = {
  command: string;
  arguments: string[];
}

export type ResponseType = {
  output?: string;
  error?: string;
}
