function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
    for(i=1; i<=3; i++){
        console.log(i);
        await sleep(1000);
        if(i==3) {
            i = 0;
        }
    }
}