# How to Publish to npmjs.com

## Step-by-Step Guide

### 1. Create an npm Account

If you don't have an npm account yet:
- Go to [https://www.npmjs.com/signup](https://www.npmjs.com/signup)
- Create a free account
- Verify your email address

### 2. Update package.json

Before publishing, make sure to update the following fields in `package.json`:

- **`name`**: Check if the package name is available on npm. Package names must be unique.
  - Current name: `react-native-etf-table`
  - You can check availability at: https://www.npmjs.com/package/react-native-etf-table
  - If taken, choose a different name (e.g., `@yourusername/react-native-etf-table`)

- **`author`**: Add your name and email
  ```json
  "author": "Your Name <your.email@example.com>"
  ```

- **`repository`**: Add your GitHub repository URL (if you have one)
  ```json
  "repository": {
    "type": "git",
    "url": "https://github.com/iamamanprajapati/react-native-etf-table.git"
  }
  ```

### 3. Login to npm

Open your terminal in the project directory and run:

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email address
- One-time password (if you have 2FA enabled)

### 4. Verify Package Name Availability

Check if your package name is available:

```bash
npm view react-native-etf-table
```

If you get a 404 error, the name is available. If you get package info, the name is taken and you need to change it.

### 5. Test Your Package Locally (Optional but Recommended)

Before publishing, you can test it locally:

```bash
# In your package directory
npm link

# In a test React Native project
npm link react-native-etf-table
```

### 6. Publish to npm

#### For Public Package (Free):

```bash
npm publish
```

#### For Scoped Package (if name is taken):

If the package name is taken, you can publish as a scoped package:

1. Update `package.json`:
   ```json
   "name": "@yourusername/react-native-etf-table"
   ```

2. Publish with public access:
   ```bash
   npm publish --access public
   ```

### 7. Verify Publication

After publishing, verify your package is live:

```bash
npm view react-native-etf-table
```

Or visit: `https://www.npmjs.com/package/react-native-etf-table`

### 8. Update Version for Future Releases

When you make changes and want to publish a new version:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish
```

## Important Notes

1. **Package Name**: Make sure your package name is unique. If `react-native-etf-table` is taken, you'll need to choose a different name.

2. **Version**: Each publish must have a unique version number. Start with `1.0.0`.

3. **Files Included**: Only files not in `.npmignore` will be published. Check your `.npmignore` file.

4. **Two-Factor Authentication**: If you have 2FA enabled, you'll need to enter a one-time password when publishing.

5. **Unpublishing**: You can unpublish a package within 72 hours, but it's better to just publish a new version.

## Troubleshooting

### "Package name already exists"
- Choose a different name or use a scoped package (`@yourusername/package-name`)

### "You must verify your email"
- Check your email and verify your npm account

### "403 Forbidden"
- Make sure you're logged in: `npm whoami`
- Check if you have permission to publish

### "400 Bad Request"
- Check that all required fields in `package.json` are filled
- Ensure the package name follows npm naming conventions

## After Publishing

1. Your package will be available at: `https://www.npmjs.com/package/your-package-name`
2. Users can install it with: `npm install your-package-name`
3. Update your README with installation instructions
4. Consider adding badges to your README (npm version, downloads, etc.)

