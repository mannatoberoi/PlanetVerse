
/**
 * Shared API client for PlanetVerse.
 * Points at Express (proxied via Vite in development).
 * Automatically retries temporary API failures.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const MAX_RETRIES = 2;
const RETRY_DELAY = 500;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(path, options = {}) {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      let payload = null;

      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok) {
        const message =
          payload?.message ||
          `Request failed with status ${response.status}`;

        // Retry temporary server errors only.
        if (response.status >= 500 && attempt < MAX_RETRIES) {
          lastError = new Error(message);
          await wait(RETRY_DELAY * (attempt + 1));
          continue;
        }

        throw new Error(message);
      }

      return payload;
    } catch (error) {
      lastError = error;

      // HTTP errors below 500 are not retried.
      if (
        error.message.startsWith("Request failed with status") &&
        !error.message.match(/status 5\d\d/)
      ) {
        throw error;
      }

      // Retry network errors, or continue retrying server errors.
      if (attempt < MAX_RETRIES) {
        await wait(RETRY_DELAY * (attempt + 1));
        continue;
      }

      throw lastError;
    }
  }

  throw lastError || new Error("API request failed");
}

export function apiGet(path) {
  return request(path);
}

export function apiPost(path, body) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function apiPut(path, body) {
  return request(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function apiDelete(path) {
  return request(path, { method: "DELETE" });
}
