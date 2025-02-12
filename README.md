# Tailwind CSS Installation in Angular

## 📌 Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and [Angular CLI](https://angular.io/cli) installed before proceeding.

## 🚀 Installation Steps

### 1️⃣ Install Tailwind via npm
Run the following command in your Angular project directory:

```sh
npm install -D tailwindcss postcss autoprefixer
```

### 2️⃣ Generate Tailwind Configuration
Run the following command to generate a Tailwind configuration file:

```sh
npx tailwindcss init
```

This creates a **`tailwind.config.js`** file in your project.

### 3️⃣ Configure Tailwind for Angular
Open **`tailwind.config.js`** and update the `content` section to scan your Angular files:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Scan all Angular files
  ],
  theme: {
    extend: {}, // You can extend Tailwind here
  },
  plugins: [],
};
```

### 4️⃣ Add Tailwind to Styles
Open **`src/styles.css`** (or `styles.scss` if using SCSS) and add the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5️⃣ Restart Angular Development Server
If your Angular development server is running, restart it to apply the changes:

```sh
ng serve
```

### 6️⃣ Use Tailwind in Angular
Now, you can use Tailwind CSS utility classes in your Angular components!

#### ✅ Example: Button
```html
<button class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
  Click Me
</button>
```

#### ✅ Example: Responsive Grid
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="p-4 bg-gray-100 rounded">Item 1</div>
  <div class="p-4 bg-gray-200 rounded">Item 2</div>
  <div class="p-4 bg-gray-300 rounded">Item 3</div>
</div>
```

## 🎉 Done!
Tailwind CSS is now successfully integrated with your Angular project! 🚀 Happy coding! 😃

4. Build the Project for Production
sh
Copy
Edit
ng build --configuration production --base-href "/smart-bill/"
Note: Replace /smart-bill/ with your repository name.

5. Deploy to GitHub Pages
sh
Copy
Edit
npx angular-cli-ghpages --dir=docs