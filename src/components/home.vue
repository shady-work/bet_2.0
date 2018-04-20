<template>
   <div class="center">
       <div class="cqssc">
            <cqssc></cqssc>
        </div>

        <div class="pk10">
            <pk10></pk10>
        </div>

        <div class="egg">
            <egg></egg>
        </div>

        <div class="cake">
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

            };
        },
        methods:
        {

        },
        created()
        {

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