const NAME = 'network-info';
const $ = new Env(NAME);

let arg;
if (typeof $argument != 'undefined') {
  arg = Object.fromEntries($argument.split('&').map(item => item.split('=')));
} else {
  arg = {};
}
$.log(`Input $argument: ${$.toStr(arg)}`);

// Merge arguments with stored settings
arg = { ...arg, ...$.getjson(NAME, {}) };

$.log(`Parameters after reading from persistent storage: ${$.toStr(arg)}`);

if (typeof $environment !== 'undefined' && $.lodash_get($environment, 'executor') === 'event-network') {
  $.log(`QX event script cannot carry parameters, fixing runtime environment`);
  $.lodash_set(arg, 'TYPE', 'EVENT');
}

if (!isInteraction() && !isRequest() && !isTile() && !isPanel()) {
  $.log(`No parameters, fixing runtime environment for non-interactive, non-request, non-tile, and non-panel cases`);
  $.lodash_set(arg, 'TYPE', 'EVENT');
}

if (isRequest()) {
  arg = { ...arg, ...parseQueryString($request.url) };
  $.log(`Parameters after reading from request: ${$.toStr(arg)}`);
}

const keya = 'spe';
const keyb = 'ge';
const keyc = 'pin';
const keyd = 'gan';
const keye = 'pi';
const keyf = 'ob';
const keyg = 'qi';
const keyh = 'xin';
const bay = 'edtest';

let result = {};
let proxy_policy = '';
let title = '';
let content = '';

(async () => {
  if ($.lodash_get(arg, 'TYPE') === 'EVENT') {
	const eventDelay = parseFloat($.lodash_get(arg, 'EVENT_DELAY') || 3);
	$.log(`Network change, waiting ${eventDelay} seconds before querying`);
	if (eventDelay) {
	  await $.wait(1000 * eventDelay);
	}
  }
  if (isTile()) {
	await notify('Network Info', 'Tile', 'Starting query');
  }

  let SSID = '';
  let LAN = '';
  let LAN_IPv4 = '';
  let LAN_IPv6 = '';
  if (typeof $network !== 'undefined') {
	$.log($.toStr($network));
	const v4 = $.lodash_get($network, 'v4.primaryAddress');
	const v6 = $.lodash_get($network, 'v6.primaryAddress');
	if ($.lodash_get(arg, 'SSID') == 1) {
	  SSID = $.lodash_get($network, 'wifi.ssid');
	}
	if (v4 && $.lodash_get(arg, 'LAN') == 1) {
	  LAN_IPv4 = v4;
	}
	if (v6 && $.lodash_get(arg, 'LAN') == 1 && $.lodash_get(arg, 'IPv6') == 1) {
	  LAN_IPv6 = v6;
	}
  } else if (typeof $config !== 'undefined') {
	try {
	  let conf = $config.getConfig();
	  $.log(conf);
	  conf = JSON.parse(conf);
	  if ($.lodash_get(arg, 'SSID') == 1) {
		SSID = $.lodash_get(conf, 'ssid');
	  }
	} catch (e) {}
  } else if (typeof $environment !== 'undefined') {
	try {
	  $.log($.toStr($environment));
	  const version = $.lodash_get($environment, 'version');
	  const os = version?.split(' ')?.[0];
	  if (os !== 'macOS' && $.lodash_get(arg, 'SSID') == 1) {
		SSID = $.lodash_get($environment, 'ssid');
	  } else if (os === 'macOS' && $.lodash_get(arg, 'LAN') == 1) {
		LAN_IPv4 = $.lodash_get($environment, 'ssid');
	  }
	} catch (e) {}
  }
  if (LAN_IPv4 || LAN_IPv6) {
	LAN = ['LAN:', LAN_IPv4, maskIP(LAN_IPv6)].filter(i => i).join(' ');
  }
  if (LAN) {
	LAN = `${LAN}\n\n`;
  }
  if (SSID) {
	SSID = `SSID: ${SSID}\n\n`;
  } else {
	SSID = '';
  }

  let { PROXIES = [] } = await getProxies();
  let [
	{ CN_IP = '', CN_INFO = '', CN_POLICY = '' } = {},
	{ PROXY_IP = '', PROXY_INFO = '', PROXY_PRIVACY = '', PROXY_POLICY = '', ENTRANCE_IP = '' } = {},
	{ CN_IPv6 = '' } = {},
	{ PROXY_IPv6 = '' } = {},
  ] = await Promise.all(
	$.lodash_get(arg, 'IPv6') == 1
	  ? [getDirectRequestInfo({ PROXIES }), getProxyRequestInfo({ PROXIES }), getDirectInfoIPv6(), getProxyInfoIPv6()]
	  : [getDirectRequestInfo({ PROXIES }), getProxyRequestInfo({ PROXIES })]
  );

  let continueFlag = true;
  if ($.lodash_get(arg, 'TYPE') === 'EVENT') {
	const lastNetworkInfoEvent = $.getjson('lastNetworkInfoEvent');
	if (
	  CN_IP !== $.lodash_get(lastNetworkInfoEvent, 'CN_IP') ||
	  CN_IPv6 !== $.lodash_get(lastNetworkInfoEvent, 'CN_IPv6') ||
	  PROXY_IP !== $.lodash_get(lastNetworkInfoEvent, 'PROXY_IP') ||
	  PROXY_IPv6 !== $.lodash_get(lastNetworkInfoEvent, 'PROXY_IPv6')
	) {
	  $.setjson({ CN_IP, PROXY_IP, CN_IPv6, PROXY_IPv6 }, 'lastNetworkInfoEvent');
	} else {
	  $.log('No change in network information, stopping');
	  continueFlag = false;
	}
  }

  if (continueFlag) {
	if ($.lodash_get(arg, 'PRIVACY') == '1' && PROXY_PRIVACY) {
	  PROXY_PRIVACY = `\n${PROXY_PRIVACY}`;
	}
	let ENTRANCE = '';
	if (ENTRANCE_IP) {
	  const { IP: resolvedIP } = await resolveDomain(ENTRANCE_IP);
	  if (resolvedIP) {
		$.log(`Entrance domain resolved: ${ENTRANCE_IP} ➟ ${resolvedIP}`);
		ENTRANCE_IP = resolvedIP;
	  }
	}
	if (ENTRANCE_IP && ENTRANCE_IP !== PROXY_IP) {
	  const entranceDelay = parseFloat($.lodash_get(arg, 'ENTRANCE_DELAY') || 0);
	  $.log(`Entrance: ${ENTRANCE_IP} differs from landing IP: ${PROXY_IP}, waiting ${entranceDelay} seconds before querying entrance`);
	  if (entranceDelay) {
		await $.wait(1000 * entranceDelay);
	  }
	  let [{ CN_INFO: ENTRANCE_INFO1 = '', isCN = false } = {}, { PROXY_INFO: ENTRANCE_INFO2 = '' } = {}] = await Promise.all([
		getDirectInfo(ENTRANCE_IP, $.lodash_get(arg, 'DOMESTIC_IPv4')),
		getProxyInfo(ENTRANCE_IP, $.lodash_get(arg, 'LANDING_IPv4')),
	  ]);
	  if (ENTRANCE_INFO1 && isCN) {
		ENTRANCE = `Entrance: ${maskIP(ENTRANCE_IP) || '-'}\n${maskAddr(ENTRANCE_INFO1)}`;
	  }
	  if (ENTRANCE_INFO2) {
		if (ENTRANCE) {
		  ENTRANCE = `${ENTRANCE.replace(/^(.*?):/gim, '$1¹:')}\n${maskAddr(
			ENTRANCE_INFO2.replace(/^(.*?):/gim, '$1²:')
		  )}`;
		} else {
		  ENTRANCE = `Entrance: ${maskIP(ENTRANCE_IP) || '-'}\n${maskAddr(ENTRANCE_INFO2)}`;
		}
	  }
	}
	if (ENTRANCE) {
	  ENTRANCE = `${ENTRANCE}\n\n`;
	}

	if (CN_IPv6 && isIPv6(CN_IPv6) && $.lodash_get(arg, 'IPv6') == 1) {
	  CN_IPv6 = `\n${maskIP(CN_IPv6)}`;
	} else {
	  CN_IPv6 = '';
	}
	if (PROXY_IPv6 && isIPv6(PROXY_IPv6) && $.lodash_get(arg, 'IPv6') == 1) {
	  PROXY_IPv6 = `\n${maskIP(PROXY_IPv6)}`;
	} else {
	  PROXY_IPv6 = '';
	}

	if ($.isSurge() || $.isStash()) {
	  if (CN_POLICY === 'DIRECT') {
		CN_POLICY = ``;
	  } else {
		CN_POLICY = `Policy: ${maskAddr(CN_POLICY) || '-'}\n`;
	  }
	}

	if (CN_INFO) {
	  CN_INFO = `\n${CN_INFO}`;
	}
	const policy_prefix = $.isQuanX() || $.isLoon() ? 'Node: ' : 'Proxy Policy: ';
	if (PROXY_POLICY === 'DIRECT') {	PROXY_POLICY = `Policy: Direct`;
		  } else {
			PROXY_POLICY = `${policy_prefix}${maskAddr(PROXY_POLICY) || '-'}`;
		  }
		
		  if (PROXY_INFO) {
			PROXY_INFO = `\n${PROXY_INFO}`;
		  }
		
		  title = 'Network Info';
		  content = `${LAN}${SSID}${CN_POLICY}${CN_IP || '-'}${CN_IPv6}${CN_INFO}\n${PROXY_POLICY}${maskIP(PROXY_IP) || '-'}${PROXY_IPv6}${PROXY_INFO}${PROXY_PRIVACY}\n${ENTRANCE}`;
		
		  $.log(`Final output:\n${content}`);
		
		  if (isInteraction()) {
			await notify(title, '', content);
		  } else if (isRequest()) {
			$.done({
			  title: title,
			  content: content,
			  'icon': 'wifi',
			  'icon-color': 'blue'
			});
		  } else if (isTile()) {
			$.done({ title, content });
		  } else if (isPanel()) {
			$.done({ title, content });
		  }
		}
		
		})().catch((e) => $.logErr(e)).finally(() => $.done());
		
		// Function definitions
		function isInteraction() {
		  return typeof $interaction !== 'undefined';
		}
		
		function isRequest() {
		  return typeof $request !== 'undefined';
		}
		
		function isTile() {
		  return typeof $tile !== 'undefined';
		}
		
		function isPanel() {
		  return typeof $panel !== 'undefined';
		}
		
		async function notify(title, subtitle, content) {
		  if ($.isQuanX()) {
			$notify(title, subtitle, content);
		  } else if ($.isSurge() || $.isLoon()) {
			$notification.post(title, subtitle, content);
		  } else if ($.isStash()) {
			$stash.notify(title, subtitle, content);
		  }
		}
		
		async function getProxies() {
		  return new Promise((resolve) => {
			if ($.isQuanX()) {
			  $httpAPI('get', '/v1/policy_groups', {}, (data) => resolve(data));
			} else if ($.isSurge()) {
			  $httpAPI('GET', 'v1/policy_groups/select', null, (data) => resolve(data));
			} else if ($.isLoon() || $.isStash()) {
			  resolve({});
			}
		  });
		}
		
		function parseQueryString(url) {
		  const queryString = url.split('?')[1] || '';
		  return Object.fromEntries(new URLSearchParams(queryString));
		}
		
		function maskIP(ip) {
		  if (!ip) return '-';
		  const parts = ip.split('.');
		  return parts.map((part, index) => (index === parts.length - 1 ? '*' : part)).join('.');
		}
		
		function maskAddr(addr) {
		  return addr.replace(/(\d{1,3}\.){3}\d{1,3}/g, (match) => maskIP(match));
		}
		
		async function resolveDomain(domain) {
		  return new Promise((resolve) => {
			if ($.isQuanX()) {
			  $dns.lookup(domain, (error, address) => {
				resolve({ IP: address });
			  });
			} else if ($.isSurge() || $.isLoon()) {
			  $dns.lookup(domain, (error, address) => {
				resolve({ IP: address });
			  });
			} else {
			  resolve({ IP: null });
			}
		  });
		}
		
		async function getDirectRequestInfo({ PROXIES }) {
		  // Replace with actual function implementation
		  return {};
		}
		
		async function getProxyRequestInfo({ PROXIES }) {
		  // Replace with actual function implementation
		  return {};
		}
		
		async function getDirectInfoIPv6() {
		  // Replace with actual function implementation
		  return {};
		}
		
		async function getProxyInfoIPv6() {
		  // Replace with actual function implementation
		  return {};
		}
		
		async function getDirectInfo(ip, options) {
		  // Replace with actual function implementation
		  return {};
		}
		
		async function getProxyInfo(ip, options) {
		  // Replace with actual function implementation
		  return {};
		}
		
		function isIPv6(ip) {
		  return ip.includes(':');
		}
		
		$.done();
