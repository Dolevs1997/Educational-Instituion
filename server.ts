import initApp from "./app";

const PORT = process.env.PORT || 3000;

initApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
