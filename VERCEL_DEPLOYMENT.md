# Vercel Deployment Guide for Secure Vesta

This guide provides step-by-step instructions for deploying Secure Vesta to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment

### 1. Prepare the Repository

Ensure all changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up using your GitHub account
3. Authorize Vercel to access your GitHub repositories

### 3. Import Project to Vercel

1. Log into your Vercel dashboard
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose `VictorLee6/secure-vesta` from the list
5. Click "Import"

### 4. Configure Build Settings

Vercel should automatically detect this as a Vite project. Verify the following settings:

- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 5. Configure Environment Variables

In the Vercel dashboard, go to your project settings and add the following environment variables:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**Important**: Make sure to add these as environment variables in Vercel, not in your local `.env` file.

### 6. Deploy the Project

1. Click "Deploy" to start the deployment process
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll receive a URL like `https://secure-vesta-xxx.vercel.app`

### 7. Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Add your custom domain (e.g., `secure-vesta.com`)
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (can take up to 24 hours)

### 8. Verify Deployment

1. Visit your deployed URL
2. Test wallet connection functionality
3. Verify all pages load correctly
4. Check that environment variables are properly loaded

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Ethereum Sepolia testnet chain ID |
| `NEXT_PUBLIC_RPC_URL` | `https://sepolia.infura.io/v3/...` | RPC endpoint for blockchain interactions |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `2ec9743d0d0cd7fb94dee1a7e6d33475` | WalletConnect project ID for wallet connections |
| `NEXT_PUBLIC_INFURA_API_KEY` | `b18fb7e6ca7045ac83c41157ab93f990` | Infura API key for blockchain access |

## Build Configuration

The project uses the following build configuration:

- **Framework**: Vite + React + TypeScript
- **Build Tool**: Vite
- **Package Manager**: npm
- **Node Version**: 18.x (automatically detected by Vercel)

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are properly installed
2. **Environment Variables Not Loading**: Ensure variables are prefixed with `NEXT_PUBLIC_`
3. **Wallet Connection Issues**: Verify WalletConnect project ID is correct
4. **RPC Errors**: Check that the RPC URL is accessible and has sufficient rate limits

### Debug Steps

1. Check Vercel build logs for specific error messages
2. Verify all environment variables are set correctly
3. Test the application locally with the same environment variables
4. Check browser console for client-side errors

## Performance Optimization

### Vercel-Specific Optimizations

1. **Edge Functions**: Consider using Vercel Edge Functions for API routes
2. **Image Optimization**: Use Vercel's built-in image optimization
3. **Caching**: Configure appropriate cache headers
4. **CDN**: Vercel automatically provides global CDN

### Build Optimization

1. **Bundle Analysis**: Use `npm run build` to analyze bundle size
2. **Code Splitting**: Implement dynamic imports for better performance
3. **Tree Shaking**: Ensure unused code is eliminated

## Monitoring and Analytics

1. **Vercel Analytics**: Enable Vercel Analytics for performance monitoring
2. **Error Tracking**: Consider integrating error tracking services
3. **Uptime Monitoring**: Set up uptime monitoring for the deployed application

## Security Considerations

1. **Environment Variables**: Never commit sensitive environment variables to git
2. **API Keys**: Rotate API keys regularly
3. **HTTPS**: Vercel automatically provides HTTPS
4. **CORS**: Configure CORS settings if needed

## Maintenance

### Regular Updates

1. **Dependencies**: Keep dependencies updated
2. **Security Patches**: Apply security patches promptly
3. **Performance Monitoring**: Monitor application performance
4. **Backup**: Regular backups of important data

### Scaling

1. **Traffic Spikes**: Vercel automatically handles traffic spikes
2. **Global Distribution**: Vercel provides global CDN
3. **Serverless Functions**: Use Vercel Functions for backend logic

## Support

For issues related to:

- **Vercel Platform**: Check [Vercel Documentation](https://vercel.com/docs)
- **Project-Specific Issues**: Create an issue in the GitHub repository
- **Wallet Integration**: Check RainbowKit documentation

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [Wagmi Documentation](https://wagmi.sh/)
