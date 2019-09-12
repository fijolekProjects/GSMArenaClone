import React, {} from 'react';
import {
  ActivityIndicator
} from 'react-native';

const ActivityIndicatorAnimation = (props) => {
  const animating = props.animating
  return (
    <ActivityIndicator 
        key={animating ? 'loading' : 'not-loading'} 
        animating={animating} 
        size="small" 
        color="#0000ff" 
        {...props}
        />
  )
}

export default ActivityIndicatorAnimation;