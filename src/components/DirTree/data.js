export const data = [
  {
    isFolder: true,
    name: "public",
    children: [
      {
        isFolder: false,
        name: "index.html",
      },
    ],
  },
  {
    isFolder: true,
    name: "src",
    children: [
      {
        isFolder: true,
        name: "components",
        children: [
          {
            isFolder: true,
            name: "home",
            children: [
              {
                isFolder: false,
                name: "Home.js",
              },
              {
                isFolder: false,
                name: "Page1.js",
              },
            ],
          },
          {
            isFolder: false,
            name: 'test.js'
          }
        ],
      },
      {
        isFolder: false,
        name: "App.js",
      },
      {
        isFolder: false,
        name: "index.js",
      },
    ],
  },
];
