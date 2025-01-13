import initApp from "./app";

const PORT = process.env.PORT || 3000;

async function connectServer() {
  initApp().then((app) => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

connectServer();
