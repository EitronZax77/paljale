"use client";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";

// SSR snapshot is false; client snapshot is true. No synchronous updates in effects.
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function FloatingFeedbackPortal() {
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  if (!mounted) return null;
  return createPortal(<FloatingFeedbackButton />, document.body);
}
