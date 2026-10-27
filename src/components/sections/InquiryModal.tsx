"use client";

import { InquiryWizard } from "./InquiryWizard";

export interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  return <InquiryWizard isOpen={isOpen} onClose={onClose} isInline={false} />;
}

export default InquiryModal;
