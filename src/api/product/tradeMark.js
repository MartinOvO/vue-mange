/*
 *  获取品牌管理的服务器数据
 */

// 引入axios(axios二次封装)
import request from "@/utils/request";

// 获取品牌列表接口
// admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  request({
    // url: `admin/product/baseTrademark/${page}/${limit}`,
    url: `admin/acl/user/${page}/${limit}`,
    method: "get",
  });
