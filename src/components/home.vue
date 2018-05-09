<template>
   <div class="center">
       <div class="cqssc" v-show="isShow('cqssc')">
            <cqssc></cqssc>
        </div>

        <div class="pk10" v-show="isShow('bjpk10')">
            <pk10></pk10>
        </div>

        <div class="egg" v-show="isShow('pcegg')">
            <egg></egg>
        </div>

        <div class="cake" v-show="isShow('cakeno')">
            <cake></cake>
        </div>
   </div>
</template>

<script>
    import cqssc from './ssc_header';
    import pk10 from './pk10_header';
    import egg from './egg_header'; 
    import cake from './cake_header';    
    export default {
        name: "home",
        data()
        {
            return{
                vaild_lotteries:[],//  用户拥有哪些彩种
            };
        },
        methods:
        {
            //是否显示彩种
            isShow:function(str)
            {
                let numb = this.vaild_lotteries.indexOf(str);
                if(numb == -1)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            },
        },
        created()
        {


            //获取用户有哪些彩种
            this.$http.get(this.global.config.API + "user/" + window.sessionStorage.user_id ).then(function (response)
            {
                let  data = response.data.data.user;
                this.vaild_lotteries = data.valid_types;//用户拥有哪些彩种
            });

        },
        components:
        {
            cqssc,
            pk10,
            egg,
            cake
        },
    }
</script>

<style scoped>

</style>