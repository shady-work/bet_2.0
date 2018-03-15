import Vue from 'vue';



/**
 * 封装的全局方法
 */


//请求未结算的订单
Vue.prototype.getOrder = function()
{
  let urls = ['ssc','pk10','egg','cake'];
  this.orderData = [];
  for(let j = 0;j<urls.length;j++)
  {
    //获取cqssc,pk10,egg,cake未结算的数据
    this.$http.get(`${this.global.config.API}${urls[j]}/history/clear/0`).then(function(res)
    {
      if(res.data.status == 403) return false;
      let data = res.data.data;
      let list  = data.list;
      for(let i = 0; i<list.length;i++)
      {
          let html = `${list[i].lty_name} <p>${list[i].expect} ${list[i].mark_a}  ${list[i].mark_b} ${list[i].money}</p>`;
          this.orderData.push(html);
      }
    });
  }
  return this.orderData;
};




//获取cqssc,pk10,egg,cake未结算的数据
Vue.prototype.getOrderClear = function(type='ssc',page=1,per_page=15,lucky=1)
{
  this.orderData_3 = [];
  this.$http.get(`${this.global.config.API}${type}/history/lucky/${lucky}/page/${page}/per_page/${per_page}`).then(function(res)
  {
    if(res.data.status == 403) return false;
    let data = res.data.data;
    let list  = data.list;
    for(let i = 0; i<list.length;i++)
    {
      if(list[i].status == 1 && list[i].open_code != "")
      {
        let data =
          {
            'order' : `${list[i].order_no}`,
            'time' : `${list[i].create_time}`,
            'content' : list[i].mark_a + list[i].mark_b,
            'money' : list[i].money,
            'rate' : list[i].rate,
            'win' : list[i].win,
          };
        this.orderData_3.push(data);
      }
    }
  });
  return this.orderData_3;
};























