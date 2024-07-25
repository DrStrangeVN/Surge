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


allow-hotspot-access = true


udp-priority = true


ipv6-vif = auto



include-all-networks = true



include-local-networks = false


include-apns = true


include-cellular-services = false


http-api-tls = true


http-api-web-dashboard = true


dns-server = system


loglevel = warning






[Proxy]



[Proxy Group]


🅵🅸🅽🅰🅻 = subnet, default = 🆅🅿🅽, "TYPE:CELLULAR" = 🆅🅿🅽, "TYPE:WIFI" = DIRECT, hidden = true


🆅🅿🅽 = select, 🅢🅜🅐🅡🅣, 🅑🅐🅛🅐🅝🅒🅔, 🅢🅘🅝🅖🅐🅟🅞🅡🅔, no-alert=0, hidden=0, include-all-proxies=1, update-interval=3600, policy-path=xxxc, icon-url=https://raw.githubusercontent.com/DrStrangeVN/3D-ICON/main/Icon46.png


🅟🅘🅝🅖 = smart, no-alert=0, hidden=1, include-all-proxies=0, evaluate-before-use=0, update-interval=3600, policy-regex-filter=𝗩𝗜𝗘𝗧 𝗡𝗔𝗠, include-other-group=🆅🅿🅽, tolerance=50, icon-url=https://raw.githubusercontent.com/DrStrangeVN/3D-ICON/main/Icon10.png


🅢🅜🅐🅡🅣 = smart, no-alert=1, hidden=1, include-all-proxies=1, policy-path=xxxc, update-interval=0, policy-regex-filter=𝗩𝗜𝗘𝗧 𝗡𝗔𝗠, tolerance=50, icon-url=https://raw.githubusercontent.com/DrStrangeVN/3D-ICON/main/Icon99.png


🅑🅐🅛🅐🅝🅒🅔 = load-balance, persistent=0, no-alert=1, hidden=1, include-all-proxies=0, policy-path=xxxc, update-interval=0, policy-regex-filter=𝗩𝗜𝗘𝗧 𝗡𝗔𝗠|𝗦𝗜𝗡𝗚𝗔𝗣𝗢𝗥𝗘, tolerance=50, icon-url=https://raw.githubusercontent.com/DrStrangeVN/3D-ICON/main/Icon89.png


🅢🅘🅝🅖🅐🅟🅞🅡🅔 = load-balance, update-interval=0, policy-regex-filter=𝗦𝗜𝗡𝗚𝗔𝗣𝗢𝗥𝗘, no-alert=0, hidden=1, include-all-proxies=0, persistent=0, policy-path=xxxc, icon-url=https://raw.githubusercontent.com/DrStrangeVN/3D-ICON/main/Icon97.png


🅗🅞🅝🅖 🅚🅞🅝🅖 = smart, policy-regex-filter=𝗛𝗢𝗡𝗚, no-alert=0, hidden=1, include-all-proxies=1, include-other-group=🆅🅿🅽, persistent=0, icon-url=https://raw.githubusercontent.com/DrStrangeVN/3D-ICON/main/Icon58.png





[Rule]







DOMAIN-SET,https://raw.githubusercontent.com/DrStrangeVN/Rule/main/Allserver.js,REJECT-TINYGIF,extended-matching


# Prevent application loop requests


IP-CIDR,0.0.0.0/32,REJECT,no-resolve


FINAL,🅵🅸🅽🅰🅻





[URL Rewrite]


# (^https?:\/\/.+\.googlevideo\.com\/.+)(&ctier=[A-Z])(&.+) $1$3 302





[SSID Setting]


# TYPE:WIFI suspend=true





[MITM]









