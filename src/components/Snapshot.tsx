"use client";
import React from 'react';
import { Button } from './ui/button';
import { Download } from "lucide-react";
import * as htmlToImage from 'html-to-image';

export default function Snapshot() {
    const handleSnapshot = async () => {
        const element = document.getElementById('snapshot'); 
        if (!element) return;
    
        htmlToImage.toPng(element)
        .then(function (dataUrl) {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'SolEasy.io-Transaction.png';
            link.click();
        });
      };
    
      return (
          <Button onClick={handleSnapshot} variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
      );
}