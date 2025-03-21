import React from 'react';
import { X } from 'lucide-react';
import { ContactFormContent } from './ContactFormContent';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const containerStyle = "backdrop-blur-sm bg-black/90 rounded-xl shadow-lg border border-white/10 dark:border-white/5";
  const headingStyle = "text-white dark:text-white";

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 flex items-start md:items-center justify-center z-50 overflow-y-auto p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-2xl"
          >
            <div className={containerStyle}>
              <div className="sticky top-0 bg-black/90 z-10 px-6 py-4 border-b border-white/10 dark:border-white/5 rounded-t-xl flex justify-between items-center">
                <h2 className={`text-2xl font-bold ${headingStyle}`}>
                  Send us a message
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 dark:hover:bg-white/5 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="px-6 py-4">
                <ContactFormContent onSuccess={onClose} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}