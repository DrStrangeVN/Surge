function operator(proxies) {
    const host = "media3.xgaming.vn"; // Sửa lại giá trị của host
    proxies.forEach(p => {
        if (p.server.includes('xgaming')) { // Kiểm tra xem tên server có chứa 'xgaming' hay không
            if ((p.type === 'vmess' || p.type === 'trojan') && p.network === 'ws') { // Thêm điều kiện cho type trojan
                p["ws-opts"] = p["ws-opts"] || {};
                p["ws-opts"]["headers"] = p["ws-opts"]["headers"] || {};
                p["ws-opts"]["headers"]["Host"] = host;
            }
            p.sni = host; // Gán giá trị mới cho p.sni
        }
    });
    return proxies;
}
