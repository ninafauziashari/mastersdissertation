

app.use(createProxyMiddleware
    ("/", { 
        target: "http://localhost:3000",
        "secure": false,
        "changeOrigin": true
     })
);