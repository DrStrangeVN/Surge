#🆅🆄 🅳🅸🅽🅷 🆃🆁🅸
#Date: 01.01.2024
#Author: Tri + Ae Viefast

[General]
use-local-host-item-for-proxy = false
skip-proxy = localhost, *.local, injections.adguard.org, local.adguard.org, captive.apple.com, guzzoni.apple.com, 0.0.0.0/8, 10.0.0.0/8, 17.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.0.2.0/24, 192.168.0.0/16, 192.88.99.0/24, 198.18.0.0/15, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4, 240.0.0.0/4, 255.255.255.255/32
wifi-assist = false
allow-wifi-access = false
wifi-access-http-port = 1050
wifi-access-socks5-port = 6153
exclude-simple-hostnames = true
ipv6 = false
test-timeout = 4
proxy-test-url = http://www.gstatic.com/generate_204
allow-hotspot-access = false
udp-priority = true
ipv6-vif = auto
include-all-networks = true
include-local-networks = false
include-apns = true
include-cellular-services = false
http-api-tls = false
http-api-web-dashboard = true
dns-server = system
loglevel = warning
# hide-vpn-icon = true

[Proxy Group]
🆅🅸🅴 🅵🅰🆂🆃 = subnet, default = 🅵🆄🅻🅻 🆂🅴🆁🆅🅴🆁, "TYPE:CELLULAR" = 🅵🆄🅻🅻 🆂🅴🆁🆅🅴🆁, "TYPE:WIFI" = DIRECT, hidden = true
🅵🆄🅻🅻 🆂🅴🆁🆅🅴🆁 = select, ⓅⒾⓃⒼ 🅐🅛🅛, ⓅⒾⓃⒼ 🅥🅝, ⒷⒶⓁⒶⓃⒸⒺ 🅥🅝, ⓅⒾⓃⒼ 🅛🅞🅒🅐🅛, ⓁⓄⒶⒹ 🅢🅘🅝🅖, ⓁⓄⒶⒹ 🅐🅓🅢, no-alert=0, hidden=0, include-all-proxies=0, update-interval=3600, policy-path=xxxx
ⓅⒾⓃⒼ 🅐🅛🅛 = url-test, no-alert=0, hidden=1, include-all-proxies=0, evaluate-before-use=0, update-interval=3600, tolerance=50, policy-path=xxxx
ⒷⒶⓁⒶⓃⒸⒺ 🅥🅝 = load-balance, persistent=0, no-alert=0, hidden=1, include-all-proxies=0, update-interval=0, policy-regex-filter=🇻🇳, tolerance=50, include-other-group=🅵🆄🅻🅻 🆂🅴🆁🆅🅴🆁
ⓅⒾⓃⒼ 🅥🅝 = url-test, policy-regex-filter=🇻🇳, no-alert=0, hidden=1, include-all-proxies=0, update-interval=3600, persistent=0, include-other-group=🅵🆄🅻🅻 🆂🅴🆁🆅🅴🆁
ⓅⒾⓃⒼ 🅛🅞🅒🅐🅛 = url-test, policy-regex-filter=Local, no-alert=0, hidden=1, include-all-proxies=0, update-interval=3600, persistent=0, include-other-group=🅵🆄🅻🅻 🆂🅴🆁🆅🅴🆁
ⓁⓄⒶⒹ 🅢🅘🅝🅖 = load-balance, update-interval=0, policy-regex-filter=🇸🇬, no-alert=0, hidden=1, include-all-proxies=0, persistent=0, include-other-group=🅵🆄🅻🅻 🆂🅴🆁🆅🅴🆁
ⓁⓄⒶⒹ 🅐🅓🅢 = load-balance, persistent=0, policy-regex-filter=AdBlock, no-alert=0, hidden=1, include-all-proxies=0, include-other-group=🅵🆄🅻🅻 🆂🅴🆁🆅🅴🆁

[Rule]
#Bảng 1: 200k rule
#DOMAIN-SET,https://raw.githubusercontent.com/lonely0811/olsd/main/surge/AllSERVERADS.conf,REJECT-TINYGIF
#Bảng 2: 20k rule VN
DOMAIN-SET,https://raw.githubusercontent.com/DrStrangeVN/Rule/main/Allserver.js,REJECT-TINYGIF
# Prevent application loop requests
IP-CIDR,0.0.0.0/32,REJECT,no-resolve
FINAL,🆅🅸🅴 🅵🅰🆂🆃

[URL Rewrite]
(^https?:\/\/.+\.googlevideo\.com\/.+)(&amp;ctier=[A-Z])(&amp;.+) $1$3 302

[MITM]
skip-server-cert-verify = true
