/********************************
Meitu Xiuxiu VIP Unlock - Complete Embedded Version
- Fixed for International Version
- Optimized error handling
- Block analytics domains

Original Source: https://github.com/zirawell/R-Store
Enhanced by: AI Assistant
********************************/

if (!$response.body) {
  console.log('[Meitu] Empty response body');
  $done({});
}

try {
  var chxm1023 = JSON.parse($response.body);
  const url = $request.url;

  // VIP Expiry Date: 2099-09-09
  const vipExpiry = 4092599349;
  const vipExpiryMs = 4092599349000;

  // User Display - Show Current User
  if (url.includes('/users/show_current.json')) {
    chxm1023.response = chxm1023.response || {};
    chxm1023.response.user = chxm1023.response.user || {};
    chxm1023.response.user.vip = {
      "xiuxiu_vip": 1,
      "list": [{
        "app_id": 18,
        "icon": "https://account.meitu.com/static/image/svip.png",
        "status": 1
      }]
    };
  }

  // VIP Prompt Query
  if (url.includes('/vip/prompt/query.json')) {
    chxm1023.data = {
      "home_btn_prompt": "立即查看",
      "if_transfer": 0,
      "pay_interval": 3000,
      "beautify_prompt": "",
      "home_prompt": "会员有效期至2099/09/09",
      "svip_bubble_text": "粉钻SVIP：有效期至2099/09/09\n粉钻VIP：有效期至2099/09/09",
      "beautify_btn_prompt": "",
      "request_time": Date.now()
    };
  }

  // VIP Show Info
  if (url.includes('/vip/vip_show.json')) {
    chxm1023.data = {
      "id": "999999999999999999",
      "id_str": "999999999999999999",
      "valid_time": vipExpiry,
      "uid": 999999999,
      "sub_type": 3,
      "expire_days": -99999,
      "screen_name": "",
      "avatar_url": "",
      "in_valid_time": vipExpiry,
      "gid": 1234567890,
      "s": 1,
      "vip_type": 101,
      "platform": 2,
      "sub_name": "包年",
      "renew": 2,
      "is_valid_user": 1,
      "create_time": Math.floor(Date.now() / 1000),
      "sub_biz_type": 1,
      "is_expire": 0
    };
  }

  // User Show
  if (url.includes('/user/show.json')) {
    chxm1023.data = chxm1023.data || {};
    chxm1023.data.vip_type = 101;
    chxm1023.data.vip_icon = "https://xximg1.meitudata.com/6948531747980333892.png";
    chxm1023.data.follower_count = 999000;
    chxm1023.data.fan_count = 999000;
    chxm1023.data.be_like_count = 999000;
  }

  // VIP Detail Info
  if (url.includes('/vip/new_sub_detail.json')) {
    chxm1023.data = chxm1023.data || {};
    
    // Remove purchase prompts
    delete chxm1023.data.materials;
    delete chxm1023.data.prices;
    delete chxm1023.data.new_version_rotograms;
    
    // VIP Sign Info
    chxm1023.data.vip_sign_info = {
      "sub_type": 3,
      "renew_status": 1,
      "show_auto_renew": 1,
      "next_withhold_amount": 16800,
      "withhold_currency_symbol": "¥",
      "next_withhold_date": "2099-09-09",
      "pay_channel": "苹果支付",
      "do_pop_up": false
    };
    
    // VIP Powers & Benefits
    chxm1023.data.vip_power_num = 999999;
    chxm1023.data.new_power_num = 999999;
    chxm1023.data.welfare_center_num = 999999;
    chxm1023.data.exchange_vip = 0;
    chxm1023.data.platform = 2;
    chxm1023.data.renew = 1;
    chxm1023.data.is_new_vipsub = 0;
    chxm1023.data.s = 1;
    chxm1023.data.expire_days = -99999;
    chxm1023.data.sub_type = 3;
    chxm1023.data.old_vip_type = 4;
    chxm1023.data.valid_time = vipExpiry;
    chxm1023.data.invalid_time = vipExpiry;
    chxm1023.data.in_valid_time = vipExpiry;
    chxm1023.data.is_expire = 0;
    chxm1023.data.rights_page_vip_btn_title = "立即解锁";
    chxm1023.data.rights_page_svip_btn_title = "立即解锁";
    chxm1023.data.sub_biz_type = 1;
    chxm1023.data.vip_type = 101;
    
    // Sub VIP Info
    chxm1023.data.hbp_vip = {
      "sub_type": 3,
      "valid_time": vipExpiry,
      "renew": 1,
      "expire_days": -99999,
      "is_expire": 0,
      "in_valid_time": vipExpiry,
      "s": 1
    };
    
    chxm1023.data.xx_vip = {
      "sub_type": 3,
      "valid_time": vipExpiry,
      "renew": 1,
      "expire_days": -99999,
      "is_expire": 0,
      "in_valid_time": vipExpiry,
      "s": 1
    };
  }

  // VIP Navigation
  if (url.includes('/vip/vip_navigation.json')) {
    chxm1023.data = chxm1023.data || {};
    delete chxm1023.data.rights;
    delete chxm1023.data.navigation_card_list;
    delete chxm1023.data.config_list;
    delete chxm1023.data.pendant;
    chxm1023.data.vip_type = 101;
    chxm1023.data.is_vip = 1;
    chxm1023.data.valid_time = vipExpiry;
  }

  // Group VIP Info
  if (url.includes('/user/vip_info_by_group.json')) {
    chxm1023.data = chxm1023.data || {};
    chxm1023.data.vip_type = 101;
    chxm1023.data.is_vip = 1;
    chxm1023.data.valid_time = vipExpiry;
    chxm1023.data.expire_days = -99999;
  }

  // Center User Info
  if (url.includes('/center/user_info.json')) {
    chxm1023.data = chxm1023.data || {};
    chxm1023.data.vip_type = 101;
    chxm1023.data.is_vip = 1;
    chxm1023.data.valid_time = vipExpiry;
  }

  // User Info by Entrance
  if (url.includes('/user/info_by_entrance.json')) {
    chxm1023.data = chxm1023.data || {};
    chxm1023.data.vip_type = 101;
    chxm1023.data.is_vip = 1;
  }

  // Home Page
  if (url.includes('/home/home.json')) {
    chxm1023.data = chxm1023.data || {};
    chxm1023.data.vip_type = 101;
    chxm1023.data.is_vip = 1;
  }

  // Posters API - User Rights
  if (url.includes('api.posters.meitu.com')) {
    chxm1023.data = chxm1023.data || {};
    chxm1023.data.vip_type = 101;
    chxm1023.data.is_vip = 1;
    chxm1023.data.valid_time = vipExpiry;
  }

  console.log('[Meitu] VIP Unlock Success: ' + url);
  $done({ body: JSON.stringify(chxm1023) });

} catch (error) {
  console.log('[Meitu] Error: ' + error);
  $done({});
}
