interface Props {
  path: string;
  method?: string;
  body?: any;
  headers?: any;
}

export async function httpClient({ path, method, body, headers }: Props) {
  const res = await fetch("http://inpyeon.rookies.kr:8889" + path, {
    method: "GET",
    body,
    headers,
  });
  if (!(res.status >= 200 && res.status < 400)) {
    console.log(res);
    return null;
  }
  return res.json();
}
