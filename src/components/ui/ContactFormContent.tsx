import React, { useState, useRef } from 'react';
import { Button } from './Button';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormContentProps {
  onSuccess?: () => void;
}

export function ContactFormContent({ onSuccess }: ContactFormContentProps) {
  const [formData, setFormData] = useState({
    name: '',
    interestedIn: '',
    email: '',
    companyName: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const interests = [
    'Validation',
    'Staking',
    'RPC',
    'Sequencing',
    'Indexing',
    'Advice'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get reCAPTCHA token
    const token = await recaptchaRef.current?.executeAsync();
    if (!token) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const emailContent = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.companyName}
Interested In: ${formData.interestedIn}

Message:
${formData.message}
    `.trim();

    try {
      // Send notification email to Artifact Systems
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        'template_notification',
        {
          to_email: 'hello@artifact-systems.io',
          from_name: formData.name,
          from_email: formData.email,
          company: formData.companyName,
          interested_in: formData.interestedIn,
          message: emailContent,
          'g-recaptcha-response': token,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Send auto-reply to the user
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        'hello-artifact-email',
        {
          to_email: formData.email,
          from_name: formData.name,
          from_email: formData.email,
          company: formData.companyName,
          interested_in: formData.interestedIn,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        interestedIn: '',
        email: '',
        companyName: '',
        message: ''
      });
      
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
      
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {submitStatus === 'success' ? (
        <div className="text-center py-8">
          <p className="text-green-600 dark:text-green-400 text-lg font-medium">
            Thank you for your message! We'll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="interestedIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Interested in...
              </label>
              <select
                id="interestedIn"
                name="interestedIn"
                value={formData.interestedIn}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                required
              >
                <option value="">Select an option</option>
                {interests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all resize-vertical"
              style={{ tabSize: 4 }}
              maxLength={1000}
              required
            />
            <div className="absolute bottom-2 right-2 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{formData.message.length}/1000</span>
            </div>
          </div>

          {/* reCAPTCHA component */}
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          />

          {submitStatus === 'error' && (
            <div className="text-red-600 dark:text-red-400 text-sm">
              Failed to send message. Please try again later.
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              type="submit" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}