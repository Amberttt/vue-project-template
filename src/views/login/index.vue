<template>
    <div class="login">
        login
    </div>
</template>

<script type="text/javascript">
import * as API from '@/api';
export default {
    data (){
        return {

        }
    },
    created(){
        this.login();
    },
    methods: {
        login(){
            API.login().then((data) => {
                console.log(data,'---data---');
            }).catch((res) => {
                console.log(res,'---res---');
            });
        }
    }
}
</script>

<style scoped>

</style>
