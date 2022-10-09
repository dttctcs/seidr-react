export function createFetchParams({
  path,
  method,
  body = undefined,
  queryParams = undefined,
}: {
  path: string;
  method: string;
  body?: any;
  queryParams?: Record<string, string>;
}) {
  let searchParams = {};
  if (typeof queryParams === 'object') {
    searchParams = new URLSearchParams(queryParams);
    path = path + '?' + searchParams;
  }

  const options: RequestInit = {
    method: method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: body ? JSON.stringify(body) : null,
  };

  return { fetchPath: path, options };
}

// export function createFetchParams({
//   base = undefined,
//   path = undefined,
//   method = undefined,
//   body = undefined,
//   queryParams = undefined,
// }) {
//   const url = new URL(path, base);

//   if (typeof queryParams === 'object') {
//     for (const [key, value] of Object.entries(queryParams)) {
//       url.searchParams.append(key, encodeURIComponent(value));
//     }
//   }

//   const options = {
//     method: method,
//     mode: 'cors',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: body ? JSON.stringify(body) : null,
//   };
//   return { url, options };
// }
