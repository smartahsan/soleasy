"use client";

import React from 'react';
import { Button } from './ui/button';
import { Copy } from "lucide-react";

interface ClipboardButtonProps {
    text: string;
  }

export default function ClipboardButton({ text }: ClipboardButtonProps) {
  const handleCopy = async () => {
      await navigator.clipboard.writeText(text);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy}>
        <Copy className="h-4 w-4"/>
    </Button>
  );
  
};