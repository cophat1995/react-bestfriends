import React from 'react';
import { StackNavigator } from 'react-navigation';

import Wellcome from './components/wellcome/wellcome.js';
import Login from './components/login/login.js';
import Signup from './components/signup/signup.js';

export const WellcomeStack = StackNavigator({
    ManHinh_Wellcome:{
        screen: Wellcome,
        navigationOptions:{
            title: 'Wellcome',
        }
    },
    ManHinh_Login:{
        screen: Login,
        navigationOptions:{
            title: 'Login'
        }
    },
    ManHinh_Signup:{
        screen: Signup,
        navigationOptions:{
            title: 'Signup'
        }
    },
})