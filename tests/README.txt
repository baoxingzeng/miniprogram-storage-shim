Step 1:
    npm install

Step 2:
    npm run build

mini-program (uniapp-test)
    Step 3: (optional)
        edit node_modules/uvu/dist/index.mjs
        some mini programs do not have globalThis, so add the following two lines to the beginning of the line:
            const globalThis = this || {};
            const UVU_QUEUE = globalThis.UVU_QUEUE || [];

    Step 4:
        cd tests/uniapp-test
        Follow the link below to launch the mini program to the target platform first.
        https://en.uniapp.dcloud.io/quickstart-cli.html#run-and-release-uni-app
