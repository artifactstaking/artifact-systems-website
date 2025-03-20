# Artifact Systems Website

This is the official website for Artifact Systems, built with React, TypeScript, and Vite.

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/artifact-systems/artifact-systems-website.git
cd artifact-systems-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables with your actual values

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Security Considerations

- Never commit the `.env` file containing actual API keys and secrets
- Keep your environment variables secure and rotate them regularly
- The reCAPTCHA site key is public and safe to expose in the frontend
- EmailJS public key is safe to expose in the frontend as it's meant for client-side usage

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

[Add your license information here] 