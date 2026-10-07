export type PaljaleEvent =
  | "tool_open"
  | "file_upload"
  | "tool_success"
  | "tool_error"
  | "file_download";

type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "event",
      eventName: string,
      params?: AnalyticsParams
    ) => void;
  }
}

export function trackEvent(
  eventName: PaljaleEvent,
  params: AnalyticsParams = {}
): void {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    ...params,
  });
}