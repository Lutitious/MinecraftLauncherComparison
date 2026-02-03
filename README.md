# Minecraft Launcher Comparison

This is a react web app to compare the features of various Minecraft launchers.

## Getting Started
To run the app locally, use the following commands:

```bash
cd mclaunchercomp2
npm install
npm run dev
```

This will start a development server at `http://localhost:5173`. Open this URL in your web browser to view the app.

To build the app for production, use:

```bash
npm run build
```

This will generate the production files in the `dist` directory.
To preview the production build locally, use:

```bash
npm run preview
```

To add a launcher to the comparison, add its JSON file to the `data` directory. The app will automatically include it in the comparison on the next run. The simplest way to get started is to copy an existing launcher's JSON file and modify it accordingly.