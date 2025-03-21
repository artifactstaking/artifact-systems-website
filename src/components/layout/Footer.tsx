import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <p className="text-center">&copy; {new Date().getFullYear()} Artifact Systems LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}