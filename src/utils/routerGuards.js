import router from '@/router';
import Cookie from 'js-cookie';

router.beforeEach(function(to,from,next){
    if(to.name != 'Login' && !Cookie.get('user')){
        next({
            name: 'Login'
        });
    }else{
        next();
    }
});