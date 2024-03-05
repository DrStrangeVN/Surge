function operator(proxies) {
    const host = "media3.xgaming.vn"; // Sửa lại giá trị của host
    proxies.forEach(p => {
        p.sni = host; // Gán giá trị mới cho p.sni
    });
    return proxies;
}
