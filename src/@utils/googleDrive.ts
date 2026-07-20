export const SCOPES = "https://www.googleapis.com/auth/drive.appdata";

declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient(config: {
            client_id: string;
            scope: string;
            callback: (response: TokenResponse) => void;
          }): {
            requestAccessToken(options?: { prompt?: "" | "consent" }): void;
          };
        };
      };
    };
  }
}

interface TokenResponse {
  access_token: string;
  error?: string;
}

interface DriveFile {
  id: string;
  name: string;
}

interface FindFileResponse {
  files?: DriveFile[];
}

interface CreateFileResponse {
  id: string;
  name: string;
}

let accessToken: string | null = null;

export async function signIn(): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      scope: SCOPES,
      callback: (response: TokenResponse) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }

        accessToken = response.access_token;
        resolve(response.access_token);
      },
    });

    client.requestAccessToken({
      prompt: accessToken ? "" : "consent",
    });
  });
}

function authHeaders(): HeadersInit {
  if (!accessToken) {
    throw new Error("Not authorized");
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

async function findFile(): Promise<DriveFile | null> {
  const res = await fetch(
    "https://www.googleapis.com/drive/v3/files?" +
      new URLSearchParams({
        spaces: "appDataFolder",
        q: "name='popBudget.json'",
        fields: "files(id,name)",
      }),
    {
      headers: authHeaders(),
    },
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const json: FindFileResponse = await res.json();

  return json.files?.[0] ?? null;
}

async function createFile(): Promise<CreateFileResponse> {
  const metadata = {
    name: "popBudget.json",
    parents: ["appDataFolder"],
  };

  const form = new FormData();

  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    }),
  );

  form.append(
    "file",
    new Blob(
      [
        JSON.stringify({
          records: [],
        }),
      ],
      {
        type: "application/json",
      },
    ),
  );

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: authHeaders(),
      body: form,
    },
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as CreateFileResponse;
}

export async function getFileId(): Promise<string> {
  let file = await findFile();

  if (!file) {
    file = await createFile();
  }

  return file.id;
}

export async function loadData<T>(): Promise<T> {
  const id = await getFileId();

  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
    {
      headers: authHeaders(),
    },
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as T;
}

export async function saveData<T>(data: T): Promise<void> {
  const id = await getFileId();

  const res = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media`,
    {
      method: "PATCH",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }
}
