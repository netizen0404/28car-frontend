import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import projectReducer from '../reducers';

const configureStoreOld = createStore(  
    projectReducer,        
  applyMiddleware(thunk)
)
export default configureStoreOld;