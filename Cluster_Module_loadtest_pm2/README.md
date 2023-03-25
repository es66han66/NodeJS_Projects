to run pm2,

npm i -g pm2

```pm2 start index.js -i 0```

OR

```pm2 ecosystem``` then ```mv ecosystem.config.js ecosystem.config.cjs``` then add 

```
name: "cluster_app",
instances: 0,
exec_mode: "cluster"
```

in apps [] block then run ```pm2 start ecosystem.config.cjs``` then start, restart or stop, delete using name

example- ```pm2 delete cluster_app```
