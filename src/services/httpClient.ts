interface Props {
  path: string;
  method?: string;
  body?: any;
  headers?: any;
}

export async function httpClient({ path, method, body, headers }: Props) {
  const res = await fetch("http://localhost:8888" + path, {
    method: "GET",
    body,
    headers,
  });
  if (!(res.status >= 200 && res.status < 400)) return null;
  return res.json();
}
